// This allows easy management of models, base URL, and API settings

export const API_CONFIG = {
  // Base URL for the API - change this to your deployed domain
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://your-domain.herokuapp.com",

  // NVIDIA API configuration
  NVIDIA: {
    API_KEY: "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",
    API_URL: "https://integrate.api.nvidia.com/v1",
  },

  // Rate limiting configuration
  RATE_LIMIT: {
    MAX_RETRIES: 3,
    BASE_DELAY: 1000, // milliseconds
  },
}

// Model configuration - Add or remove models here
export const MODELS_CONFIG = {
  chat: [
    { id: "meta/llama-3.3-70b-instruct", name: "Llama 3.3 70B", context: "128K", provider: "Meta" },
    { id: "meta/llama-3.1-405b-instruct", name: "Llama 3.1 405B", context: "128K", provider: "Meta" },
    { id: "meta/llama-3.1-70b-instruct", name: "Llama 3.1 70B", context: "128K", provider: "Meta" },
    { id: "meta/llama-3.1-8b-instruct", name: "Llama 3.1 8B", context: "128K", provider: "Meta" },
    { id: "mistralai/mistral-large-2-instruct", name: "Mistral Large 2", context: "128K", provider: "Mistral AI" },
    { id: "google/gemma-2-27b-it", name: "Gemma 2 27B", context: "8K", provider: "Google" },
    { id: "google/gemma-2-9b-it", name: "Gemma 2 9B", context: "8K", provider: "Google" },
    { id: "microsoft/phi-3.5-mini-instruct", name: "Phi 3.5 Mini", context: "128K", provider: "Microsoft" },
    { id: "nvidia/llama-3.1-nemotron-70b-instruct", name: "Llama 3.1 Nemotron 70B", context: "128K", provider: "NVIDIA" },
    { id: "deepseek-ai/deepseek-r1", name: "DeepSeek R1", context: "64K", provider: "DeepSeek" },
  ],

  coding: [
    { id: "meta/llama-3.1-405b-instruct", name: "Llama 3.1 405B", context: "128K", provider: "Meta" },
    { id: "mistralai/codestral-22b-instruct-v0.1", name: "Codestral 22B", context: "32K", provider: "Mistral AI" },
    { id: "google/codegemma-7b", name: "CodeGemma 7B", context: "8K", provider: "Google" },
    { id: "qwen/qwen2.5-coder-32b-instruct", name: "Qwen 2.5 Coder 32B", context: "32K", provider: "Qwen" },
    { id: "qwen/qwen3-235b-a22b", name: "Qwen 3.0 Coder 235B", context: "58K", provider: "Qwen" },
  ],

  thinking: [
    { id: "deepseek-ai/deepseek-r1", name: "DeepSeek R1", context: "64K", provider: "DeepSeek" },
    { id: "nvidia/llama-3.1-nemotron-70b-instruct", name: "Nemotron 70B", context: "128K", provider: "NVIDIA" },
    { id: "meta/llama-3.1-405b-instruct", name: "Llama 3.1 405B", context: "128K", provider: "Meta" },
  ],

  vision: [
    { id: "nvidia/nemotron-nano-12b-v2-vl", name: "Nemotron Nano 12B VL", context: "128K", provider: "NVIDIA" },
    { id: "meta/llama-3.2-90b-vision-instruct", name: "Llama 3.2 90B Vision", context: "128K", provider: "Meta" },
    { id: "meta/llama-3.2-11b-vision-instruct", name: "Llama 3.2 11B Vision", context: "128K", provider: "Meta" },
    { id: "google/paligemma", name: "PaliGemma", context: "8K", provider: "Google" },
    { id: "microsoft/phi-3.5-vision-instruct", name: "Phi 3.5 Vision", context: "128K", provider: "Microsoft" },
  ],

  image: [
    { id: "stabilityai/stable-diffusion-xl", name: "Stable Diffusion 3 Medium", context: "N/A", provider: "Stability AI" },
    { id: "black-forest-labs/flux.1-dev", name: "Flux.1 Dev", context: "N/A", provider: "Black Forest Labs" },
  ],

  speech: [
    { id: "nvidia/parakeet-ctc-1.1b-asr", name: "Parakeet ASR (Speech-to-Text)", context: "N/A", provider: "NVIDIA" },
    // TTS might require a different structure, will implement as specific tools
  ],

  search: [
    { id: "meta/llama-3.3-70b-instruct", name: "Llama 3.3 70B", context: "128K", provider: "Meta" },
    { id: "nvidia/llama-3.1-nemotron-70b-instruct", name: "Nemotron 70B", context: "128K", provider: "NVIDIA" },
  ],
}

// Get all models across all categories
export const getAllModels = () => {
  return Object.entries(MODELS_CONFIG).flatMap(([category, models]) => models.map((model) => ({ ...model, category })))
}

// Get models by category
export const getModelsByCategory = (category: keyof typeof MODELS_CONFIG) => {
  return MODELS_CONFIG[category as keyof typeof MODELS_CONFIG] || []
}

// Get default model for each category
export const getDefaultModel = (category: keyof typeof MODELS_CONFIG) => {
  const models = MODELS_CONFIG[category as keyof typeof MODELS_CONFIG]
  return models.length > 0 ? models[0].id : null
}
