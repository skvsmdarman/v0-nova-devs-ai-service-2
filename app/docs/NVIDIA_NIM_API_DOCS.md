# NVIDIA NIM API Documentation

## Overview
NVIDIA NIM (NVIDIA Inference Microservices) provides hosted, OpenAI-compatible model APIs for inference, vision, speech, retrieval, and more.

## Getting Started

### Base URL and Authentication
- **Base URL:** `https://integrate.api.nvidia.com/v1`
- **Authentication:** Bearer token via `Authorization: Bearer $NVIDIA_API_KEY`
- **API Key:** Generate one at https://build.nvidia.com/settings

### Example Request
```bash
curl https://integrate.api.nvidia.com/v1/chat/completions \
  -H "Authorization: Bearer $NVIDIA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nvidia/llama-3.1-70b-instruct",
    "messages": [{"role": "user", "content": "Hello"}],
    "stream": true
  }'
```

## Models Endpoint

### Fetch All Models
To get the complete list of available models:
```bash
curl https://build.nvidia.com/models.md
```

For pagination (100 models per page):
```bash
curl https://build.nvidia.com/models.md?page=1
curl https://build.nvidia.com/models.md?page=2
```

### Model Categories
Models are organized into the following categories:
- **Reasoning:** `/explore/reasoning.md`
- **Vision:** `/explore/vision.md`
- **Visual Design:** `/explore/visual-design.md`
- **Retrieval:** `/explore/retrieval.md`
- **Speech:** `/explore/speech.md`
- **Biology:** `/explore/biology.md`
- **Simulation:** `/explore/simulation.md`
- **Climate & Weather:** `/explore/climate-weather.md`
- **Safety & Moderation:** `/explore/safety-moderation.md`
- **Automotive:** `/explore/automotive.md`
- **Financial Services:** `/explore/financial-services.md`
- **Gaming:** `/explore/gaming.md`
- **Healthcare:** `/explore/healthcare.md`
- **Industrial:** `/explore/industrial.md`
- **Robotics:** `/explore/robotics.md`

## Streaming Support

All chat completion endpoints support streaming responses using Server-Sent Events (SSE).

### Enable Streaming
Set `stream: true` in your request:

```bash
curl https://integrate.api.nvidia.com/v1/chat/completions \
  -H "Authorization: Bearer $NVIDIA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta/llama-3.1-70b-instruct",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Tell me a story"}
    ],
    "stream": true,
    "temperature": 0.7,
    "max_tokens": 500
  }'
```

### Streaming Response Format
Streaming responses return Server-Sent Events (SSE) with the following format:
```
data: {"id":"...","choices":[{"delta":{"content":"Hello"},"finish_reason":null}]}

data: {"id":"...","choices":[{"delta":{"content":" world"},"finish_reason":null}]}

data: {"id":"...","choices":[{"delta":{},"finish_reason":"stop"}]}
```

Each event contains:
- `id`: Unique request identifier
- `choices`: Array with delta content and finish reason
- `delta.content`: The incremental text generated
- `finish_reason`: `"stop"`, `"length"`, or null if more content is coming

### Python Example with Streaming
```python
import requests
import json

url = "https://integrate.api.nvidia.com/v1/chat/completions"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

payload = {
    "model": "meta/llama-3.1-70b-instruct",
    "messages": [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Tell me a joke"}
    ],
    "stream": True,
    "temperature": 0.7
}

response = requests.post(url, headers=headers, json=payload, stream=True)

for line in response.iter_lines():
    if line:
        decoded_line = line.decode('utf-8')
        if decoded_line.startswith('data: '):
            data = decoded_line[6:]  # Remove 'data: ' prefix
            if data == '[DONE]':
                break
            try:
                json_data = json.loads(data)
                content = json_data['choices'][0]['delta'].get('content', '')
                if content:
                    print(content, end='', flush=True)
            except json.JSONDecodeError:
                pass
```

## Free Tier Information

**All models offer a free trial tier** with no credit card required. Sign in to generate an API key at https://build.nvidia.com/settings.

Models marked with **"Free Endpoint"** badge on build.nvidia.com are available for free testing and development.

## Featured Models with Free Endpoints (Updated 2026)

### Chat/Text Models
| Model ID | Provider | Context | Description |
|----------|----------|---------|-------------|
| `moonshotai/kimi-k3` | Moonshot AI | 1M tokens | ~2.8T hybrid KDA+MLA multimodal MoE for long-horizon coding |
| `deepseek-ai/deepseek-v4-pro-0813` | DeepSeek AI | 262K tokens | Efficient MoE architecture for coding tasks |
| `nvidia/nemotron-3.5-lightning-30b-a3b` | NVIDIA | 128K tokens | Fastest 30B A3B MoE for specialized agentic tasks |
| `nvidia/nemotron-3-ultra-550b-a55b` | NVIDIA | 1M tokens | Hybrid Mamba-Transformer MoE for agentic reasoning |
| `google/gemma-4-31b-it` | Google | 128K tokens | Dense 31B model for coding and agentic workflows |
| `openai/gpt-oss-20b` | OpenAI | 128K tokens | Smaller MoE text-only LLM for efficient reasoning |
| `meta/llama-3.1-70b-instruct` | Meta | 128K tokens | High-performance Meta model |
| `meta/llama-3.1-405b-instruct` | Meta | 128K tokens | Largest Llama 3.1 model |
| `mistralai/mistral-large` | Mistral AI | 128K tokens | Advanced Mistral model |

### Vision Models
| Model ID | Provider | Description |
|----------|----------|-------------|
| `meta/llama-3.2-90b-vision-instruct` | Meta | Cutting-edge vision-language model |
| `meta/llama-3.2-11b-vision-instruct` | Meta | Vision-language model for image reasoning |
| `nvidia/cosmos3-nano-reasoner` | NVIDIA | Vision language model for physical world understanding |
| `nvidia/nemotron-parse-2.0` | NVIDIA | Document text and metadata retrieval |

### Image Generation Models
| Model ID | Provider | Description |
|----------|----------|-------------|
| `black-forest-labs/flux.1-dev` | Black Forest Labs | State-of-the-art image generation |
| `black-forest-labs/flux.1-schnell` | Black Forest Labs | Distilled fast image generation |
| `stabilityai/stable-diffusion-3.5-large` | Stability AI | Popular text-to-image model |
| `nvidia/qwen-image` | NVIDIA | Advanced multilingual text rendering |
| `nvidia/qwen-image-edit` | NVIDIA | Image editing with text editing |

### Speech/Audio Models
| Model ID | Provider | Description |
|----------|----------|-------------|
| `nvidia/nemotron-asr-streaming` | NVIDIA | Real-time English speech recognition |
| `nvidia/magpie-tts-multilingual` | NVIDIA | Natural voices in multiple languages |
| `nvidia/chatterbox-multilingual-tts` | NVIDIA | Expressive voices in 23 languages |

### Retrieval/Embedding Models
| Model ID | Provider | Description |
|----------|----------|-------------|
| `nvidia/nemotron-3-embed-1b` | NVIDIA | 1B embedding model for semantic search |
| `nvidia/llama-nemotron-embed-vl-1b-v2` | NVIDIA | Multimodal question-answer retrieval |
| `nvidia/llama-nemotron-rerank-vl-1b-v2` | NVIDIA | GPU-accelerated reranking model |

### Safety & Moderation Models
| Model ID | Provider | Description |
|----------|----------|-------------|
| `meta/llama-guard-4-12b` | Meta | Multi-modal safety classification |
| `nvidia/nemoguard-jailbreak-detect` | NVIDIA | Jailbreak attempt detection |
| `nvidia/nemotron-3.5-content-safety` | NVIDIA | Multilingual unsafe content detection |

## Common Issues

### Model Not Found (404)
Ensure you're using the correct model ID format: `publisher/model-name`

### Rate Limiting (429)
Free tier has rate limits. Implement exponential backoff:
```python
import time

def call_with_retry(url, headers, payload, max_retries=3):
    for i in range(max_retries):
        response = requests.post(url, headers=headers, json=payload)
        if response.status_code == 429:
            wait_time = (2 ** i)  # Exponential backoff
            time.sleep(wait_time)
            continue
        return response
    raise Exception("Max retries exceeded")
```

### Authentication Error (401)
Verify your API key is valid and not expired. Regenerate at https://build.nvidia.com/settings

## Additional Resources

- **Documentation:** https://docs.api.nvidia.com/
- **Developer Forums:** https://forums.developer.nvidia.com/c/ai-data-science/nvidia-nim/678
- **Support:** help@build.nvidia.com
- **Model Catalog:** https://build.nvidia.com/models
- **API Settings:** https://build.nvidia.com/settings

## Notes

- All NIM model endpoints implement the OpenAI Chat Completions API
- Point existing OpenAI SDK clients at `https://integrate.api.nvidia.com/v1`
- Set the model name to the specific NVIDIA model you want to use
- Models are optimized for NVIDIA GPU infrastructure
- Free tier available for development and testing
