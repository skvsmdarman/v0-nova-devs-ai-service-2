import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { API_CONFIG, MODELS_CONFIG } from "@/config/api-config"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-foreground">API Documentation</h1>
          <p className="mt-2 text-lg text-muted-foreground">Complete reference for Nova Devs AI Service endpoints</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-4">
          <nav className="lg:col-span-1">
            <div className="sticky top-8 space-y-2">
              <h3 className="mb-4 text-sm font-semibold text-foreground">Navigation</h3>
              <a href="#overview" className="block text-sm text-muted-foreground hover:text-foreground">
                Overview
              </a>
              <a href="#endpoints" className="block text-sm text-muted-foreground hover:text-foreground">
                Endpoints
              </a>
              <a href="#chat" className="block pl-4 text-sm text-muted-foreground hover:text-foreground">
                Chat API
              </a>
              <a href="#coding" className="block pl-4 text-sm text-muted-foreground hover:text-foreground">
                Coding API
              </a>
              <a href="#thinking" className="block pl-4 text-sm text-muted-foreground hover:text-foreground">
                Thinking API
              </a>
              <a href="#vision" className="block pl-4 text-sm text-muted-foreground hover:text-foreground">
                Vision API
              </a>
              <a href="#search" className="block pl-4 text-sm text-muted-foreground hover:text-foreground">
                Search API
              </a>
              <a href="#speech" className="block pl-4 text-sm text-muted-foreground hover:text-foreground">
                Speech API
              </a>
              <a href="#retrieval" className="block pl-4 text-sm text-muted-foreground hover:text-foreground">
                Retrieval API
              </a>
              <a href="#models" className="block text-sm text-muted-foreground hover:text-foreground">
                Available Models
              </a>
            </div>
          </nav>

          <div className="lg:col-span-3 space-y-8">
            <section id="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>
                    Nova Devs AI Service provides access to {Object.values(MODELS_CONFIG).flat().length}+ free AI models
                    through a unified API
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Base URL</h4>
                    <code className="block bg-muted p-3 rounded-md text-sm">{API_CONFIG.BASE_URL}/api</code>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Features</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Huge library of models including Chat, Coding, Vision, Speech, and Retrieval</li>
                      <li>Unified API interface</li>
                      <li>Integrated playgrounds for testing</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="endpoints">
              <h2 className="text-3xl font-bold text-foreground mb-6">API Endpoints</h2>

              <div className="space-y-6">
                {/* Chat API */}
                <Card id="chat">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Chat API</CardTitle>
                      <Badge>POST /api/chat</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Compatible with OpenAI Chat Completions.</p>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                      {`{ "messages": [{"role": "user", "content": "Hello"}], "model": "meta/llama-3.1-70b-instruct" }`}
                    </pre>
                  </CardContent>
                </Card>

                {/* Speech API */}
                <Card id="speech">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Speech API</CardTitle>
                      <Badge>POST /api/speech</Badge>
                    </div>
                    <CardDescription>Text-to-Speech generation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                      {`{ "text": "Hello world", "model": "nvidia/fastpitch-hifigan-tts" }`}
                    </pre>
                    <p className="mt-2 text-sm text-muted-foreground">Returns a JSON object with base64 encoded audio.</p>
                  </CardContent>
                </Card>

                 {/* Retrieval API */}
                 <Card id="retrieval">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Retrieval API</CardTitle>
                      <Badge>POST /api/retrieval</Badge>
                    </div>
                    <CardDescription>Generate embeddings for text</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                      {`{ "query": "Search query or document text", "model": "nvidia/embed-qa-4", "input_type": "query" }`}
                    </pre>
                  </CardContent>
                </Card>

                 {/* Vision API */}
                 <Card id="vision">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Vision / Classification API</CardTitle>
                      <Badge>POST /api/vision</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                      {`{ "prompt": "Describe image", "image_url": "https://...", "model": "google/paligemma" }`}
                    </pre>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="models">
              <Card>
                <CardHeader>
                  <CardTitle>Available Models</CardTitle>
                  <CardDescription>
                    Browse available models by category.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="chat">
                    <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto">
                      <TabsTrigger value="chat">Chat</TabsTrigger>
                      <TabsTrigger value="coding">Coding</TabsTrigger>
                      <TabsTrigger value="thinking">Think</TabsTrigger>
                      <TabsTrigger value="vision">Vision</TabsTrigger>
                      <TabsTrigger value="image">Image</TabsTrigger>
                      <TabsTrigger value="speech">Speech</TabsTrigger>
                      <TabsTrigger value="retrieval">Retriev</TabsTrigger>
                      <TabsTrigger value="clf">Classify</TabsTrigger>
                    </TabsList>

                    {Object.entries(MODELS_CONFIG).map(([category, models]) => (
                      <TabsContent key={category} value={category === "image-classification" ? "clf" : category} className="space-y-2 mt-4">
                        <div className="space-y-2">
                          {models.map((model) => (
                            <div key={model.id} className="flex justify-between items-center p-3 bg-muted rounded">
                              <div className="overflow-hidden">
                                <span className="font-medium text-foreground block truncate">{model.name}</span>
                                <span className="text-xs text-muted-foreground">{model.id}</span>
                              </div>
                              <Badge variant="secondary" className="shrink-0">{model.context}</Badge>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
