import { API_CONFIG } from "@/config/api-config"

export interface NvidiaMessage {
  role: "user" | "assistant" | "system"
  content: string | Array<{ type: "text" | "image_url"; text?: string; image_url?: { url: string } }>
}

export interface NvidiaChatRequest {
  model: string
  messages: NvidiaMessage[]
  temperature?: number
  top_p?: number
  max_tokens?: number
  stream?: boolean
}

export interface NvidiaImageRequest {
  prompt: string
  model: string // e.g. "stabilityai/stable-diffusion-3-medium"
  negative_prompt?: string
  width?: number
  height?: number
  steps?: number
  cfg_scale?: number
}

// Response interfaces
export interface NvidiaChatResponse {
  id: string
  choices: Array<{
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export interface NvidiaImageResponse {
  data: Array<{
    b64_json?: string
    url?: string
  }>
  created: number
}

const NVIDIA_API_KEY = API_CONFIG.NVIDIA.API_KEY
const BASE_URL = "https://integrate.api.nvidia.com/v1"

// Mapping for specific GenAI endpoints that don't follow the standard /chat/completions
const MODEL_ENDPOINTS: Record<string, string> = {
  "stabilityai/stable-diffusion-3-medium": "https://integrate.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-3-medium",
  "black-forest-labs/flux.1-dev": "https://integrate.api.nvidia.com/v1/genai/black-forest-labs/flux.1-dev",
  // Add other specific endpoints here if they deviate from standard chat
}

export async function callNvidiaChat(request: NvidiaChatRequest): Promise<NvidiaChatResponse> {
  const url = `${BASE_URL}/chat/completions`

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NVIDIA_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`NVIDIA API Error: ${response.status} - ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("NVIDIA Chat API call failed:", error)
    throw error
  }
}

export async function callNvidiaImageGen(request: NvidiaImageRequest): Promise<NvidiaImageResponse> {
  // Determine endpoint based on model
  const url = MODEL_ENDPOINTS[request.model] || `${BASE_URL}/genai/${request.model}` // Fallback pattern

  // payload structure varies slightly by model, but usually follows this for NVIDIA NIM GenAI
  const payload = {
    text_prompts: [{ text: request.prompt, weight: 1 }],
    cfg_scale: request.cfg_scale || 5,
    sampler: "K_EULER_ANCESTRAL",
    seed: 0,
    steps: request.steps || 25,
    height: request.height || 1024,
    width: request.width || 1024,
  }

  // Flux and SD3 might have different payloads.
  // Standardizing for SD3 based on docs found:
  // Input: prompt, mode, aspect_ratio, etc.
  // But standard OpenAI image gen format is different. NVIDIA often uses its own.
  // Let's try to adapt based on the specific model if we can, or use a generic one.
  // For SD3 Medium on NVIDIA NIM:
  const sd3Payload = {
    prompt: request.prompt,
    negative_prompt: request.negative_prompt || "",
    mode: "text-to-image",
    aspect_ratio: "1:1",
    output_format: "jpeg"
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NVIDIA_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(sd3Payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`NVIDIA Image Gen Error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    // NVIDIA NIM usually returns 'image': "base64..." in the response object or artifact
    // Let's normalize it to our interface
    return {
      data: [{ b64_json: data.image || data.artifacts?.[0]?.base64 }], // Adjust based on actual response
      created: Date.now()
    }
  } catch (error) {
    console.error("NVIDIA Image API call failed:", error)
    throw error
  }
}
