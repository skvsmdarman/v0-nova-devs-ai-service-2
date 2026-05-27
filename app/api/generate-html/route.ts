import { type NextRequest, NextResponse } from "next/server"
import { callNvidiaChat } from "@/lib/nvidia"
import { MODELS_CONFIG } from "@/config/api-config"
import { storeHTML } from "@/lib/storage"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, model, temperature = 0.3 } = body

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const systemMessage = `You are an expert web developer. Generate a complete, standalone HTML file based on the user's request.
    
Requirements:
- Include all CSS inline in a <style> tag
- Include any JavaScript inline in a <script> tag
- Make it responsive and mobile-friendly
- Use modern, clean design
- Return ONLY the HTML code, no explanations

The HTML should be a complete, valid document starting with <!DOCTYPE html>.`

    const validModel = model || MODELS_CONFIG.coding[0].id

    const response = await callNvidiaChat({
      model: validModel,
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ],
      temperature,
      max_tokens: 6000,
    })

    if (!response.choices || !response.choices[0]) {
      return NextResponse.json({ error: "No response from AI model" }, { status: 500 })
    }

    let htmlContent = response.choices[0].message.content

    // Extract HTML from code blocks if present
    const htmlMatch = htmlContent.match(/```html\n([\s\S]*?)\n```/) || htmlContent.match(/```\n([\s\S]*?)\n```/)
    if (htmlMatch) {
      htmlContent = htmlMatch[1]
    }

    // Store the HTML
    const id = storeHTML(htmlContent)

    // Return the stored ID and preview URL
    const baseUrl = request.nextUrl.origin
    const previewUrl = `${baseUrl}/preview/${id}`

    return NextResponse.json({
      id,
      previewUrl,
      html: htmlContent,
      expiresIn: "24 hours",
    })
  } catch (error) {
    console.error("[v0] HTML generation error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
