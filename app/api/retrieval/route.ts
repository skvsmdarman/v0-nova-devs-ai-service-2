import { type NextRequest, NextResponse } from "next/server"
import { API_CONFIG } from "@/config/api-config"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, model, input_type = "query" } = body

    if (!query) {
      return NextResponse.json({ error: "Query/Text is required" }, { status: 400 })
    }

    // Retrieval APIs often use `/v1/embeddings`
    // Some might be rerankers which use `/v1/ranking` (not implemented here yet, assuming embeddings for now)

    // Check if it's a reranker based on model name
    if (model.includes("rerank")) {
        // Implement Rerank if needed, but for now specific endpoint mapping is complex.
        return NextResponse.json({ error: "Reranking endpoints are not yet fully implemented." }, { status: 501 })
    }

    const response = await fetch(`${API_CONFIG.NVIDIA.API_URL}/embeddings`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_CONFIG.NVIDIA.API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        input: query,
        input_type: input_type, // 'query' or 'document'
        encoding_format: "float"
      }),
    })

    if (!response.ok) {
        const text = await response.text()
        return NextResponse.json({ error: `API Error: ${response.status} - ${text}` }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error("Retrieval API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
