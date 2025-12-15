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

    const validModel = model || MODELS_CONFIG.thinking[0].id

    // Append a system prompt to encourage "thinking" or reasoning steps
    const systemPrompt = {
      role: "system",
      content: "You are a reasoning engine. Break down complex problems into steps. Show your work and thought process clearly."
    }

    const messagesWithSystem = [systemPrompt, ...messages]

    const response = await callNvidiaChat({
      model: validModel,
      messages: messagesWithSystem,
      temperature,
      max_tokens,
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error("Thinking API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
