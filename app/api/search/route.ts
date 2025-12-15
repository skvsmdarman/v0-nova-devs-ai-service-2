import { type NextRequest, NextResponse } from "next/server"
import { callNvidiaChat } from "@/lib/nvidia"
import { MODELS_CONFIG } from "@/config/api-config"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, model } = body

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    const validModel = model || MODELS_CONFIG.search[0].id

    // Simulate search by asking the LLM to act as a search engine or summarize information
    // In a real scenario, this would call a search API (Google/Bing) then feed results to LLM.
    // For now, we rely on the LLM's internal knowledge.
    const messages = [
      {
        role: "system",
        content: "You are a helpful search assistant. Provide comprehensive and accurate information about the user's query."
      },
      {
        role: "user",
        content: query
      }
    ]

    const response = await callNvidiaChat({
      model: validModel,
      messages,
      temperature: 0.5,
      max_tokens: 1000,
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
