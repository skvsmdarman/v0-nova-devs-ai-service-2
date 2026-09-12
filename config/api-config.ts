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

// Model configuration - Updated with latest NVIDIA NIM models (2026)
// All models listed below have free endpoints available at build.nvidia.com
export const MODELS_CONFIG = {
  chat: [
    // Latest Featured Models with Free Endpoints
    { id: "moonshotai/kimi-k3", name: "Kimi K3", context: "1M", provider: "moonshotai" },
    { id: "deepseek-ai/deepseek-v4-pro-0813", name: "DeepSeek V4 Pro", context: "262K", provider: "deepseek-ai" },
    { id: "nvidia/nemotron-3.5-lightning-30b-a3b", name: "Nemotron 3.5 Lightning 30B", context: "128K", provider: "nvidia" },
    { id: "nvidia/nemotron-3-ultra-550b-a55b", name: "Nemotron 3 Ultra 550B", context: "1M", provider: "nvidia" },
    { id: "google/gemma-4-31b-it", name: "Gemma 4 31B", context: "128K", provider: "google" },
    { id: "openai/gpt-oss-20b", name: "GPT OSS 20B", context: "128K", provider: "openai" },
    
    // Meta Llama Models
    { id: "meta/llama-3.1-8b-instruct", name: "Llama 3.1 8B", context: "128K", provider: "meta" },
    { id: "meta/llama-3.1-70b-instruct", name: "Llama 3.1 70B", context: "128K", provider: "meta" },
    { id: "meta/llama-3.1-405b-instruct", name: "Llama 3.1 405B", context: "128K", provider: "meta" },
    { id: "meta/llama-3.2-1b-instruct", name: "Llama 3.2 1B", context: "128K", provider: "meta" },
    { id: "meta/llama-3.2-3b-instruct", name: "Llama 3.2 3B", context: "128K", provider: "meta" },
    { id: "meta/llama-3.3-70b-instruct", name: "Llama 3.3 70B", context: "128K", provider: "meta" },
    { id: "meta/llama-guard-4-12b", name: "Llama Guard 4 12B", context: "128K", provider: "meta" },
    
    // Google Gemma Models
    { id: "google/gemma-2-2b-it", name: "Gemma 2 2B", context: "128K", provider: "google" },
    { id: "google/gemma-2-9b-it", name: "Gemma 2 9B", context: "128K", provider: "google" },
    { id: "google/gemma-2-27b-it", name: "Gemma 2 27B", context: "128K", provider: "google" },
    { id: "google/gemma-3-1b-it", name: "Gemma 3 1B", context: "128K", provider: "google" },
    { id: "google/gemma-3-27b-it", name: "Gemma 3 27B", context: "128K", provider: "google" },
    
    // Microsoft Phi Models
    { id: "microsoft/phi-3-mini-128k-instruct", name: "Phi-3 Mini 128K", context: "128K", provider: "microsoft" },
    { id: "microsoft/phi-3-small-128k-instruct", name: "Phi-3 Small 128K", context: "128K", provider: "microsoft" },
    { id: "microsoft/phi-3-medium-128k-instruct", name: "Phi-3 Medium 128K", context: "128K", provider: "microsoft" },
    { id: "microsoft/phi-4-mini-instruct", name: "Phi-4 Mini", context: "128K", provider: "microsoft" },
    
    // Mistral AI Models
    { id: "mistralai/mistral-7b-instruct-v0.3", name: "Mistral 7B v0.3", context: "128K", provider: "mistralai" },
    { id: "mistralai/mistral-large", name: "Mistral Large", context: "128K", provider: "mistralai" },
    { id: "mistralai/mistral-medium-3-instruct", name: "Mistral Medium 3", context: "128K", provider: "mistralai" },
    { id: "mistralai/mistral-nemotron", name: "Mistral Nemotron", context: "128K", provider: "mistralai" },
    { id: "mistralai/mistral-small-24b-instruct", name: "Mistral Small 24B", context: "128K", provider: "mistralai" },
    
    // NVIDIA Nemotron Models
    { id: "nvidia/llama-3.1-nemotron-70b-instruct", name: "Nemotron 70B Instruct", context: "128K", provider: "nvidia" },
    { id: "nvidia/nemotron-mini-4b-instruct", name: "Nemotron Mini 4B", context: "128K", provider: "nvidia" },
    { id: "nvidia/nemotron-4-mini-hindi-4b-instruct", name: "Nemotron 4 Mini Hindi", context: "128K", provider: "nvidia" },
    
    // Qwen Models
    { id: "qwen/qwen2.5-7b-instruct", name: "Qwen 2.5 7B", context: "128K", provider: "qwen" },
    { id: "qwen/qwen3-235b-a22b", name: "Qwen 3 235B", context: "128K", provider: "qwen" },
    
    // DeepSeek Models
    { id: "deepseek-ai/deepseek-v3.1", name: "DeepSeek V3.1", context: "128K", provider: "deepseek-ai" },
    
    // Other Models
    { id: "ai21labs/jamba-1.5-mini-instruct", name: "Jamba 1.5 Mini", context: "128K", provider: "ai21labs" },
    { id: "thudm/chatglm3-6b", name: "ChatGLM3 6B", context: "128K", provider: "thudm" },
    { id: "tiiuae/falcon3-7b-instruct", name: "Falcon 3 7B", context: "128K", provider: "tiiuae" },
  ],

  coding: [
    // Latest Featured Coding Models with Free Endpoints
    { id: "deepseek-ai/deepseek-v4-pro-0813", name: "DeepSeek V4 Pro", context: "262K", provider: "deepseek-ai" },
    { id: "moonshotai/kimi-k3", name: "Kimi K3", context: "1M", provider: "moonshotai" },
    { id: "nvidia/nemotron-3.5-lightning-30b-a3b", name: "Nemotron 3.5 Lightning 30B", context: "128K", provider: "nvidia" },
    
    // Specialized Coding Models
    { id: "mistralai/codestral-22b-instruct-v0.1", name: "Codestral 22B", context: "128K", provider: "mistralai" },
    { id: "qwen/qwen2.5-coder-32b-instruct", name: "Qwen 2.5 Coder 32B", context: "128K", provider: "qwen" },
    { id: "qwen/qwen3-coder-480b-a35b-instruct", name: "Qwen 3 Coder 480B", context: "128K", provider: "qwen" },
  ],

  thinking: [
    // Latest Reasoning Models with Free Endpoints
    { id: "moonshotai/kimi-k3", name: "Kimi K3", context: "1M", provider: "moonshotai" },
    { id: "deepseek-ai/deepseek-v4-pro-0813", name: "DeepSeek V4 Pro", context: "262K", provider: "deepseek-ai" },
    { id: "nvidia/nemotron-3-ultra-550b-a55b", name: "Nemotron 3 Ultra 550B", context: "1M", provider: "nvidia" },
    { id: "nvidia/cosmos3-nano-reasoner", name: "Cosmos3 Nano Reasoner", context: "128K", provider: "nvidia" },
    
    // DeepSeek R1 Series
    { id: "deepseek-ai/deepseek-r1", name: "DeepSeek R1", context: "128K", provider: "deepseek-ai" },
    { id: "deepseek-ai/deepseek-r1-distill-qwen-32b", name: "DeepSeek R1 Distill Qwen 32B", context: "128K", provider: "deepseek-ai" },
    
    // Other Thinking Models
    { id: "microsoft/phi-4-mini-flash-reasoning", name: "Phi-4 Mini Flash Reasoning", context: "128K", provider: "microsoft" },
    { id: "qwen/qwen3-next-80b-a3b-thinking", name: "Qwen 3 Next 80B Thinking", context: "128K", provider: "qwen" },
  ],

  vision: [
    // Latest Vision Models with Free Endpoints
    { id: "meta/llama-3.2-90b-vision-instruct", name: "Llama 3.2 90B Vision", context: "128K", provider: "meta" },
    { id: "meta/llama-3.2-11b-vision-instruct", name: "Llama 3.2 11B Vision", context: "128K", provider: "meta" },
    { id: "nvidia/cosmos3-nano-reasoner", name: "Cosmos3 Nano Reasoner", context: "128K", provider: "nvidia" },
    { id: "nvidia/nemotron-parse-2.0", name: "Nemotron Parse 2.0", context: "128K", provider: "nvidia" },
    
    // Additional Vision Models
    { id: "microsoft/phi-3.5-vision-instruct", name: "Phi-3.5 Vision", context: "128K", provider: "microsoft" },
    { id: "meta/llama-guard-4-12b", name: "Llama Guard 4 12B", context: "128K", provider: "meta" },
  ],

  image: [
    // Image Generation Models with Free Endpoints
    { id: "black-forest-labs/flux.1-dev", name: "FLUX.1 Dev", context: "N/A", provider: "black-forest-labs" },
    { id: "black-forest-labs/flux.1-schnell", name: "FLUX.1 Schnell", context: "N/A", provider: "black-forest-labs" },
    { id: "stabilityai/stable-diffusion-3.5-large", name: "Stable Diffusion 3.5 Large", context: "N/A", provider: "stabilityai" },
    { id: "nvidia/qwen-image", name: "Qwen Image", context: "N/A", provider: "nvidia" },
    { id: "nvidia/qwen-image-edit", name: "Qwen Image Edit", context: "N/A", provider: "nvidia" },
  ],

  speech: [
    // Speech/Audio Models with Free Endpoints
    { id: "nvidia/nemotron-asr-streaming", name: "Nemotron ASR Streaming", context: "N/A", provider: "nvidia" },
    { id: "nvidia/magpie-tts-multilingual", name: "Magpie TTS Multilingual", context: "N/A", provider: "nvidia" },
    { id: "nvidia/chatterbox-multilingual-tts", name: "Chatterbox Multilingual TTS", context: "N/A", provider: "nvidia" },
    { id: "nvidia/parakeet-ctc-1.1b-asr", name: "Parakeet CTC 1.1B ASR", context: "N/A", provider: "nvidia" },
  ],

  search: [
    { id: "meta/llama-3.3-70b-instruct", name: "Llama 3.3 70B", context: "128K", provider: "meta" },
    { id: "nvidia/llama-3.1-nemotron-70b-instruct", name: "Nemotron 70B", context: "128K", provider: "nvidia" },
  ],

  retrieval: [
    // Embedding/Retrieval Models with Free Endpoints
    { id: "nvidia/nemotron-3-embed-1b", name: "Nemotron 3 Embed 1B", context: "128K", provider: "nvidia" },
    { id: "nvidia/llama-nemotron-embed-vl-1b-v2", name: "Llama Nemotron Embed VL 1B v2", context: "128K", provider: "nvidia" },
    { id: "nvidia/llama-nemotron-rerank-vl-1b-v2", name: "Llama Nemotron Rerank VL 1B v2", context: "128K", provider: "nvidia" },
    
    // Additional Retrieval Models
    { id: "nvidia/llama-3.2-nv-embedqa-1b-v2", name: "Llama 3.2 NV EmbedQA 1B v2", context: "128K", provider: "nvidia" },
    { id: "nvidia/nv-embed-v1", name: "NV Embed v1", context: "128K", provider: "nvidia" },
  ],

  "safety-moderation": [
    // Safety & Moderation Models with Free Endpoints
    { id: "meta/llama-guard-4-12b", name: "Llama Guard 4 12B", context: "128K", provider: "meta" },
    { id: "nvidia/nemoguard-jailbreak-detect", name: "Nemoguard Jailbreak Detect", context: "128K", provider: "nvidia" },
    { id: "nvidia/nemotron-3.5-content-safety", name: "Nemotron 3.5 Content Safety", context: "128K", provider: "nvidia" },
    { id: "nvidia/llama-3.1-nemoguard-8b-content-safety", name: "Nemoguard 8B Content Safety", context: "128K", provider: "nvidia" },
  ]
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
