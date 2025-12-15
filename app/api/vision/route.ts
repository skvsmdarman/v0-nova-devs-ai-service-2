import { type NextRequest, NextResponse } from "next/server"
import { callNvidiaChat } from "@/lib/nvidia"
import { MODELS_CONFIG } from "@/config/api-config"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, image_url, model, temperature = 0.7, max_tokens = 2000 } = body

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    if (!image_url) {
      return NextResponse.json({ error: "Image URL is required for vision models" }, { status: 400 })
    }

    const validModel = model || MODELS_CONFIG.vision[0].id

    // NVIDIA Vision models expect the image in the content array
    const response = await callNvidiaChat({
      model: validModel,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: image_url } },
          ],
        },
      ],
      temperature,
      max_tokens,
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error("Vision API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
