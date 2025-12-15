import { type NextRequest, NextResponse } from "next/server"
import { API_CONFIG, MODELS_CONFIG } from "@/config/api-config"

// Helper to call NVIDIA Speech API
// Note: This is a simplified implementation. Real ASR/TTS often requires specific header handling for audio data.
async function callNvidiaSpeech(endpoint: string, body: any, isTTS = false) {
  const url = `${API_CONFIG.NVIDIA.API_URL}/${endpoint}`

  const headers: Record<string, string> = {
    "Authorization": `Bearer ${API_CONFIG.NVIDIA.API_KEY}`,
    "Content-Type": "application/json",
  }

  // TTS might return audio content
  if (isTTS) {
    headers["Accept"] = "audio/mpeg" // or wav
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`NVIDIA API Error: ${response.status} - ${errorText}`)
  }

  if (isTTS) {
    // Return the audio blob/buffer
    return await response.blob()
  }

  return await response.json()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, model, voice } = body

    if (!text) {
      return NextResponse.json({ error: "Text is required for speech generation" }, { status: 400 })
    }

    // Default to a TTS model if none specified, or the verified one
    const validModel = model || "nvidia/fastpitch-hifigan-tts"

    // Note: The actual endpoint for TTS on NIM might vary (e.g., v1/tts/...).
    // Since we don't have the exact spec for every model, we assume a standard structure or a specific known path.
    // For 'nvidia/fastpitch-hifigan-tts', it often uses `/tts`

    // We will attempt to hit the model's invoke endpoint if it follows standard NIM.
    // However, NIM for TTS often expects:
    // POST https://.../v1/ttts
    // BODY: { "text": "...", "voice_name": "..." }

    // Using a generic TTS endpoint assumption:
    // If this fails, we might need model-specific paths.

    // Attempting a direct call to the text-to-speech endpoint wrapper
    // Since I can't verify the exact path for 'nvidia/fastpitch-hifigan-tts' without docs,
    // I will use a standard OpenAI-like `audio/speech` if supported, or NIM's `genai/audio/tts`.
    // Let's try the standard OpenAI compatible endpoint `audio/speech` which some NIMs support,
    // or fall back to a generic invoker.

    // Assumption: The base URL `https://integrate.api.nvidia.com/v1` implies OpenAI compatibility.
    // OpenAI TTS endpoint is `/audio/speech`.

    const response = await fetch(`${API_CONFIG.NVIDIA.API_URL}/audio/speech`, {
       method: "POST",
       headers: {
         "Authorization": `Bearer ${API_CONFIG.NVIDIA.API_KEY}`,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         model: validModel,
         input: text,
         voice: voice || "alloy", // OpenAI param, might be ignored by NIM but required for schema
       }),
    })

    if (!response.ok) {
       // Fallback: If 404, maybe it's not OpenAI compatible.
       // Try generic inference endpoint?
       throw new Error(`TTS API Error: ${response.status} - ${response.statusText}`)
    }

    const audioBlob = await response.blob()
    const arrayBuffer = await audioBlob.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64Audio = buffer.toString('base64')

    return NextResponse.json({
      audio: base64Audio,
      type: audioBlob.type || 'audio/mpeg'
    })

  } catch (error) {
    console.error("Speech API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
