import { type NextRequest, NextResponse } from "next/server"
import { callNvidiaChat } from "@/lib/nvidia"
import { MODELS_CONFIG } from "@/config/api-config"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, model, temperature = 0.7, max_tokens = 4000 } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 })
    }

    const validModel = model || MODELS_CONFIG.coding[0].id

    // Append a system prompt to encourage coding behavior if not present
    const systemPrompt = {
      role: "system",
      content: "You are an expert software engineer. Provide clear, concise, and efficient code solutions. Explain your reasoning briefly before providing the code."
    }

    const messagesWithSystem = [systemPrompt, ...messages]

    const response = await callNvidiaChat({
      model: validModel,
      messages: messagesWithSystem, // Use the enhanced message list
      temperature,
      max_tokens,
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error("Coding API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
