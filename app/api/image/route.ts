import { type NextRequest, NextResponse } from "next/server"
import { callNvidiaImageGen } from "@/lib/nvidia"
import { MODELS_CONFIG } from "@/config/api-config"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, model, negative_prompt, width, height, steps, cfg_scale } = body

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const validModel = model || MODELS_CONFIG.image[0].id

    const response = await callNvidiaImageGen({
      prompt,
      model: validModel,
      negative_prompt,
      width,
      height,
      steps,
      cfg_scale
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error("Image Gen API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
