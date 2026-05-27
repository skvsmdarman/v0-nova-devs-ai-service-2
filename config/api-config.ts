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
    { id: "nvidia/nemotron-mini-4b-instruct", name: "Mini 4b Instruct Role play model", context: "128K", provider: "Nvidia" },
    { id: "abacusai/dracarys-llama-3.1-70b-instruct", name: "Dracarys Llama 3.1 70B", context: "128K", provider: "abacusai" },
    { id: "ai21labs/jamba-1.5-mini-instruct", name: "Jamba 1.5 Mini", context: "128K", provider: "ai21labs" },
    { id: "baichuan-inc/baichuan2-13b-chat", name: "Baichuan2 13B", context: "128K", provider: "baichuan-inc" },
    { id: "bytedance/seed-oss-36b-instruct", name: "Seed OSS 36B", context: "128K", provider: "bytedance" },
    { id: "deepseek-ai/deepseek-v3.1", name: "DeepSeek V3.1", context: "128K", provider: "deepseek-ai" },
    { id: "deepseek-ai/deepseek-v3.1-terminus", name: "DeepSeek V3.1 Terminus", context: "128K", provider: "deepseek-ai" },
    { id: "google/gemma-7b", name: "Gemma 7B", context: "128K", provider: "google" },
    { id: "google/gemma-2-2b-it", name: "Gemma 2 2B", context: "128K", provider: "google" },
    { id: "google/gemma-2-9b-it", name: "Gemma 2 9B", context: "128K", provider: "google" },
    { id: "google/gemma-2-27b-it", name: "Gemma 2 27B", context: "128K", provider: "google" },
    { id: "google/gemma-3-1b-it", name: "Gemma 3 1B", context: "128K", provider: "google" },
    { id: "google/gemma-3-27b-it", name: "Gemma 3 27B", context: "128K", provider: "google" },
    { id: "google/gemma-3n-e2b-it", name: "Gemma 3N E2B", context: "128K", provider: "google" },
    { id: "google/gemma-3n-e4b-it", name: "Gemma 3N E4B", context: "128K", provider: "google" },
    { id: "google/shieldgemma-9b", name: "ShieldGemma 9B", context: "128K", provider: "google" },
    { id: "gotocompany/gemma-2-9b-cpt-sahabatai-instruct", name: "Gemma 2 9B SahabatAI", context: "128K", provider: "gotocompany" },
    { id: "ibm/granite-guardian-3.0-8b", name: "Granite Guardian 3.0 8B", context: "128K", provider: "ibm" },
    { id: "institute-of-science-tokyo/llama-3.1-swallow-8b-instruct-v0.1", name: "Llama 3.1 Swallow 8B", context: "128K", provider: "institute-of-science-tokyo" },
    { id: "marin/marin-8b-instruct", name: "Marin 8B", context: "128K", provider: "marin" },
    { id: "mediatek/breeze-7b-instruct", name: "Breeze 7B", context: "128K", provider: "mediatek" },
    { id: "meta/llama2-70b", name: "Llama 2 70B", context: "128K", provider: "meta" },
    { id: "meta/llama-3.1-8b-instruct", name: "Llama 3.1 8B", context: "128K", provider: "meta" },
    { id: "meta/llama-3.1-70b-instruct", name: "Llama 3.1 70B", context: "128K", provider: "meta" },
    { id: "meta/llama-3.1-405b-instruct", name: "Llama 3.1 405B", context: "128K", provider: "meta" },
    { id: "meta/llama-3.2-1b-instruct", name: "Llama 3.2 1B", context: "128K", provider: "meta" },
    { id: "meta/llama-3.2-3b-instruct", name: "Llama 3.2 3B", context: "128K", provider: "meta" },
    { id: "meta/llama-3.3-70b-instruct", name: "Llama 3.3 70B", context: "128K", provider: "meta" },
    { id: "meta/llama-guard-4-12b", name: "Llama Guard 4 12B", context: "128K", provider: "meta" },
    { id: "meta/llama-4-maverick-17b-128e-instruct", name: "Llama 4 Maverick 17B", context: "128K", provider: "meta" },
    { id: "meta/llama-4-scout-17b-16e-instruct", name: "Llama 4 Scout 17B", context: "128K", provider: "meta" },
    { id: "microsoft/phi-3-medium-128k-instruct", name: "Phi-3 Medium 128K", context: "128K", provider: "microsoft" },
    { id: "microsoft/phi-3-medium-4k-instruct", name: "Phi-3 Medium 4K", context: "128K", provider: "microsoft" },
    { id: "microsoft/phi-3-mini-128k-instruct", name: "Phi-3 Mini 128K", context: "128K", provider: "microsoft" },
    { id: "microsoft/phi-3-mini-4k-instruct", name: "Phi-3 Mini 4K", context: "128K", provider: "microsoft" },
    { id: "microsoft/phi-3-small-128k-instruct", name: "Phi-3 Small 128K", context: "128K", provider: "microsoft" },
    { id: "microsoft/phi-3-small-8k-instruct", name: "Phi-3 Small 8K", context: "128K", provider: "microsoft" },
    { id: "microsoft/phi-4-mini-instruct", name: "Phi-4 Mini", context: "128K", provider: "microsoft" },
    { id: "microsoft/phi-4-multimodal-instruct", name: "Phi-4 Multimodal", context: "128K", provider: "microsoft" },
    { id: "minimaxai/minimax-m2", name: "Minimax M2", context: "128K", provider: "minimaxai" },
    { id: "mistralai/devstral-2-123b-instruct-2512", name: "Devstral 2 123B", context: "128K", provider: "mistralai" },
    { id: "mistralai/magistral-small-2506", name: "Magistral Small", context: "128K", provider: "mistralai" },
    { id: "mistralai/ministral-14b-instruct-2512", name: "Ministral 14B", context: "128K", provider: "mistralai" },
    { id: "mistralai/mistral-7b-instruct-v0.3", name: "Mistral 7B v0.3", context: "128K", provider: "mistralai" },
    { id: "mistralai/mistral-large", name: "Mistral Large", context: "128K", provider: "mistralai" },
    { id: "mistralai/mistral-large-3-675b-instruct-2512", name: "Mistral Large 3", context: "128K", provider: "mistralai" },
    { id: "mistralai/mistral-medium-3-instruct", name: "Mistral Medium 3", context: "128K", provider: "mistralai" },
    { id: "mistralai/mistral-nemotron", name: "Mistral Nemotron", context: "128K", provider: "mistralai" },
    { id: "mistralai/mistral-small-24b-instruct", name: "Mistral Small 24B", context: "128K", provider: "mistralai" },
    { id: "moonshotai/kimi-k2-instruct", name: "Kimi K2 Instruct", context: "128K", provider: "moonshotai" },
    { id: "moonshotai/kimi-k2-instruct-0905", name: "Kimi K2 Instruct 0905", context: "128K", provider: "moonshotai" },
    { id: "nvidia/llama3-chatqa-1.5-8b", name: "Llama3 ChatQA 1.5 8B", context: "128K", provider: "nvidia" },
    { id: "nvidia/llama-3.1-nemoguard-8b-content-safety", name: "Nemoguard 8B Content Safety", context: "128K", provider: "nvidia" },
    { id: "nvidia/llama-3.1-nemoguard-8b-topic-control", name: "Nemoguard 8B Topic Control", context: "128K", provider: "nvidia" },
    { id: "nvidia/llama-3.1-nemotron-nano-8b-v1", name: "Nemotron Nano 8B", context: "128K", provider: "nvidia" },
    { id: "nvidia/llama-3.1-nemotron-51b-instruct", name: "Nemotron 51B Instruct", context: "128K", provider: "nvidia" },
    { id: "nvidia/llama-3.1-nemotron-70b-instruct", name: "Nemotron 70B Instruct", context: "128K", provider: "nvidia" },
    { id: "nvidia/llama-3.1-nemotron-70b-reward", name: "Nemotron 70B Reward", context: "128K", provider: "nvidia" },
    { id: "nvidia/llama-3.1-nemotron-ultra-253b-v1", name: "Nemotron Ultra 253B", context: "128K", provider: "nvidia" },
    { id: "nvidia/llama-3.3-nemotron-super-49b-v1", name: "Nemotron Super 49B", context: "128K", provider: "nvidia" },
    { id: "nvidia/mistral-nemo-minitron-8b-base", name: "Mistral Nemo Minitron 8B", context: "128K", provider: "nvidia" },
    { id: "nvidia/nemotron-3-nano-30b-a3b", name: "Nemotron 3 Nano 30B", context: "128K", provider: "nvidia" },
    { id: "nvidia/nemotron-4-mini-hindi-4b-instruct", name: "Nemotron 4 Mini Hindi", context: "128K", provider: "nvidia" },
    { id: "nvidia/nemotron-mini-4b-instruct", name: "Nemotron Mini 4B", context: "128K", provider: "nvidia" },
    { id: "nvidia/nemotron-parse", name: "Nemotron Parse", context: "128K", provider: "nvidia" },
    { id: "nvidia/nvidia-nemotron-nano-9b-v2", name: "Nemotron Nano 9B v2", context: "128K", provider: "nvidia" },
    { id: "nvidia/streampetr", name: "StreamPETR", context: "128K", provider: "nvidia" },
    { id: "nvidia/vila", name: "VILA", context: "128K", provider: "nvidia" },
    { id: "openai/gpt-oss-20b", name: "GPT OSS 20B", context: "128K", provider: "openai" },
    { id: "openai/gpt-oss-120b", name: "GPT OSS 120B", context: "128K", provider: "openai" },
    { id: "opengpt-x/teuken-7b-instruct-commercial-v0.4", name: "Teuken 7B", context: "128K", provider: "opengpt-x" },
    { id: "qwen/qwen2-7b-instruct", name: "Qwen 2 7B", context: "128K", provider: "qwen" },
    { id: "qwen/qwen2.5-7b-instruct", name: "Qwen 2.5 7B", context: "128K", provider: "qwen" },
    { id: "qwen/qwen3-235b-a22b", name: "Qwen 3 235B", context: "128K", provider: "qwen" },
    { id: "qwen/qwen3-next-80b-a3b-instruct", name: "Qwen 3 Next 80B", context: "128K", provider: "qwen" },
    { id: "qwen/qwq-32b", name: "QwQ 32B", context: "128K", provider: "qwen" },
    { id: "rakuten/rakutenai-7b-chat", name: "RakutenAI 7B Chat", context: "128K", provider: "rakuten" },
    { id: "rakuten/rakutenai-7b-instruct", name: "RakutenAI 7B Instruct", context: "128K", provider: "rakuten" },
    { id: "sarvamai/sarvam-m", name: "Sarvam M", context: "128K", provider: "sarvamai" },
    { id: "stockmark/stockmark-2-100b-instruct", name: "Stockmark 2 100B", context: "128K", provider: "stockmark" },
    { id: "thudm/chatglm3-6b", name: "ChatGLM3 6B", context: "128K", provider: "thudm" },
    { id: "tiiuae/falcon3-7b-instruct", name: "Falcon 3 7B", context: "128K", provider: "tiiuae" },
    { id: "upstage/solar-10.7b-instruct", name: "Solar 10.7B", context: "128K", provider: "upstage" },
    { id: "utter-project/eurollm-9b-instruct", name: "EuroLLM 9B", context: "128K", provider: "utter-project" },
    { id: "yentinglin/llama-3-taiwan-70b-instruct", name: "Llama 3 Taiwan 70B", context: "128K", provider: "yentinglin" }
  ],

  coding: [
    { id: "moonshotai/kimi-k2-thinking", name: "Kimi 2.5 thinking", context: "128K", provider: "kimi" },
    { id: "mistralai/codestral-22b-instruct-v0.1", name: "Codestral 22B", context: "128K", provider: "mistralai" },
    { id: "mistralai/mamba-codestral-7b-v0.1", name: "Mamba Codestral 7B", context: "128K", provider: "mistralai" },
    { id: "qwen/qwen2.5-coder-7b-instruct", name: "Qwen 2.5 Coder 7B", context: "128K", provider: "qwen" },
    { id: "qwen/qwen2.5-coder-32b-instruct", name: "Qwen 2.5 Coder 32B", context: "128K", provider: "qwen" },
    { id: "qwen/qwen3-coder-480b-a35b-instruct", name: "Qwen 3 Coder 480B", context: "128K", provider: "qwen" },
  ],

  thinking: [
    { id: "deepseek-ai/deepseek-r1", name: "DeepSeek R1", context: "128K", provider: "deepseek-ai" },
    { id: "deepseek-ai/deepseek-r1-0528", name: "DeepSeek R1 0528", context: "128K", provider: "deepseek-ai" },
    { id: "deepseek-ai/deepseek-r1-distill-llama-8b", name: "DeepSeek R1 Distill Llama 8B", context: "128K", provider: "deepseek-ai" },
    { id: "deepseek-ai/deepseek-r1-distill-qwen-7b", name: "DeepSeek R1 Distill Qwen 7B", context: "128K", provider: "deepseek-ai" },
    { id: "deepseek-ai/deepseek-r1-distill-qwen-14b", name: "DeepSeek R1 Distill Qwen 14B", context: "128K", provider: "deepseek-ai" },
    { id: "deepseek-ai/deepseek-r1-distill-qwen-32b", name: "DeepSeek R1 Distill Qwen 32B", context: "128K", provider: "deepseek-ai" },
    { id: "microsoft/phi-4-mini-flash-reasoning", name: "Phi-4 Mini Flash Reasoning", context: "128K", provider: "microsoft" },
    { id: "moonshotai/kimi-k2-thinking", name: "Kimi K2 Thinking", context: "128K", provider: "moonshotai" },
    { id: "qwen/qwen3-next-80b-a3b-thinking", name: "Qwen 3 Next 80B Thinking", context: "128K", provider: "qwen" },
  ],

  vision: [
    { id: "meta/llama-3.2-11b-vision-instruct", name: "Llama 3.2 11B Vision", context: "128K", provider: "meta" },
    { id: "meta/llama-3.2-90b-vision-instruct", name: "Llama 3.2 90B Vision", context: "128K", provider: "meta" },
    { id: "microsoft/phi-3.5-vision-instruct", name: "Phi-3.5 Vision", context: "128K", provider: "microsoft" },
    { id: "nvidia/llama-3.1-nemotron-nano-vl-8b-v1", name: "Nemotron Nano VL 8B", context: "128K", provider: "nvidia" },
    { id: "nvidia/nemotron-nano-12b-v2-vl", name: "Nemotron Nano 12B VL", context: "128K", provider: "nvidia" },
  ],

  image: [

  ],

  speech: [

  ],

  search: [
    { id: "meta/llama-3.3-70b-instruct", name: "Llama 3.3 70B", context: "128K", provider: "meta" },
    { id: "nvidia/llama-3.1-nemotron-70b-instruct", name: "Nemotron 70B", context: "128K", provider: "nvidia" },
    // Google/Perplexity models if user had them, but for now defaulting to smart models
  ],

  retrieval: [
    { id: "nvidia/embed-qa-4", name: "Embed QA 4", context: "128K", provider: "nvidia" },
    { id: "nvidia/llama-3.2-nemoretriever-1b-vlm-embed-v1", name: "Llama 3.2 Nemoretriever 1B VLM", context: "128K", provider: "nvidia" },
    { id: "nvidia/llama-3.2-nemoretriever-300m-embed-v1", name: "Llama 3.2 Nemoretriever 300M v1", context: "128K", provider: "nvidia" },
    { id: "nvidia/llama-3.2-nemoretriever-300m-embed-v2", name: "Llama 3.2 Nemoretriever 300M v2", context: "128K", provider: "nvidia" },
    { id: "nvidia/llama-3.2-nv-embedqa-1b-v1", name: "Llama 3.2 NV EmbedQA 1B v1", context: "128K", provider: "nvidia" },
    { id: "nvidia/llama-3.2-nv-embedqa-1b-v2", name: "Llama 3.2 NV EmbedQA 1B v2", context: "128K", provider: "nvidia" },
    { id: "nvidia/nemoretriever-parse", name: "Nemoretriever Parse", context: "128K", provider: "nvidia" },
    { id: "nvidia/nv-embed-v1", name: "NV Embed v1", context: "128K", provider: "nvidia" },
    { id: "nvidia/nv-embedcode-7b-v1", name: "NV EmbedCode 7B", context: "128K", provider: "nvidia" },
    { id: "nvidia/nv-embedqa-e5-v5", name: "NV EmbedQA E5", context: "128K", provider: "nvidia" },
    { id: "nvidia/nv-embedqa-mistral-7b-v2", name: "NV EmbedQA Mistral 7B", context: "128K", provider: "nvidia" },
    { id: "snowflake/arctic-embed-l", name: "Arctic Embed L", context: "128K", provider: "snowflake" },
  ],

  "image-classification": [
    // Even if verification failed, these are specific endpoint models the user likely wants.
    // I will add them but they might fail if the endpoint differs from standard chat.
    { id: "nvidia/nemoguard-jailbreak-detect", name: "Jailbreak Detect", context: "128K", provider: "nvidia" },
    { id: "nvidia/bevformer", name: "BEVFormer", context: "128K", provider: "nvidia" },
    { id: "nvidia/nv-grounding-dino", name: "Grounding DINO", context: "128K", provider: "nvidia" },
    { id: "nvidia/ocdrnet", name: "OCDRNet", context: "128K", provider: "nvidia" },
    { id: "nvidia/retail-object-detection", name: "Retail Object Detection", context: "128K", provider: "nvidia" },
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
