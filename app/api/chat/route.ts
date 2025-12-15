import { type NextRequest, NextResponse } from "next/server"
import { callNvidiaChat } from "@/lib/nvidia"
import { MODELS_CONFIG } from "@/config/api-config"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, model, temperature = 0.7, max_tokens = 2000 } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 })
    }

    // Validate model exists in our chat models
    const validModel = model || MODELS_CONFIG.chat[0].id

    const response = await callNvidiaChat({
      model: validModel,
      messages,
      temperature,
      max_tokens,
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
