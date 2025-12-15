import { type NextRequest, NextResponse } from "next/server"
import { API_CONFIG } from "@/config/api-config"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { model, image_url, image_b64 } = body

    if (!model) {
      return NextResponse.json({ error: "Model is required" }, { status: 400 })
    }

    if (!image_url && !image_b64) {
      return NextResponse.json({ error: "Image URL or Base64 data is required" }, { status: 400 })
    }

    // For image classification/detection, the endpoint might be `v1/chat/completions` (multimodal)
    // or a specific task endpoint.
    // Models like `nvidia/retail-object-detection` might require `v1/cv/detect` or similar.
    // However, sticking to the standard Chat Completion for Multimodal is safest for "Vision" models.
    // For specific "Detection" models, we might need a dedicated inference call.

    // Attempt standard Chat Completion first as it's the most common NIM interface.
    // If the model is a specific CV model, it might fail or behave differently.

    const messages = [
      {
        role: "user",
        content: [
          { type: "text", text: "Analyze this image and detect objects or classify it." },
          {
            type: "image_url",
            image_url: {
              url: image_url || `data:image/jpeg;base64,${image_b64}`
            }
          }
        ]
      }
    ]

    const response = await fetch(`${API_CONFIG.NVIDIA.API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_CONFIG.NVIDIA.API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        max_tokens: 1024
      }),
    })

    if (!response.ok) {
        // If chat completion fails, it might be a specialized CV endpoint.
        // There is no standard "universal" endpoint for all these CV models in verified list.
        // We will return the error.
        const text = await response.text()
        return NextResponse.json({ error: `API Error: ${response.status} - ${text}` }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error("Image Classification API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
