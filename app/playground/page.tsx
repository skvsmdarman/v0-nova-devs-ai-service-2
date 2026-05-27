"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Copy, Check, ExternalLink, Upload, Play, FileJson } from "lucide-react"
import { MODELS_CONFIG } from "@/config/api-config"

const MODELS = {
  chat: MODELS_CONFIG.chat,
  coding: MODELS_CONFIG.coding,
  thinking: MODELS_CONFIG.thinking,
  vision: MODELS_CONFIG.vision,
  search: MODELS_CONFIG.search,
  image: MODELS_CONFIG.image || [],
  speech: MODELS_CONFIG.speech || [],
  retrieval: MODELS_CONFIG.retrieval || [],
  "image-classification": MODELS_CONFIG["image-classification"] || [],
}

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState("chat")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState("")
  const [responseImage, setResponseImage] = useState("")
  const [responseAudio, setResponseAudio] = useState("")
  const [copied, setCopied] = useState(false)
  const [previewUrl, setPreviewUrl] = useState("")

  const [chatMessages, setChatMessages] = useState("")
  const [chatModel, setChatModel] = useState(MODELS.chat[0]?.id || "")

  const [codingPrompt, setCodingPrompt] = useState("")
  const [codingLanguage, setCodingLanguage] = useState("html")
  const [codingModel, setCodingModel] = useState(MODELS.coding[0]?.id || "")

  const [thinkingPrompt, setThinkingPrompt] = useState("")
  const [thinkingModel, setThinkingModel] = useState(MODELS.thinking[0]?.id || "")

  const [visionPrompt, setVisionPrompt] = useState("")
  const [visionImageUrl, setVisionImageUrl] = useState("")
  const [visionFile, setVisionFile] = useState<File | null>(null)
  const [visionModel, setVisionModel] = useState(MODELS.vision[0]?.id || "")

  const [searchQuery, setSearchQuery] = useState("")
  const [searchModel, setSearchModel] = useState(MODELS.search[0]?.id || "")

  const [imagePrompt, setImagePrompt] = useState("")
  const [imageModel, setImageModel] = useState(MODELS.image[0]?.id || "")

  const [speechText, setSpeechText] = useState("")
  const [speechModel, setSpeechModel] = useState(MODELS.speech[0]?.id || "")

  const [retrievalQuery, setRetrievalQuery] = useState("")
  const [retrievalModel, setRetrievalModel] = useState(MODELS.retrieval[0]?.id || "")

  const [clfImageUrl, setClfImageUrl] = useState("")
  const [clfFile, setClfFile] = useState<File | null>(null)
  const [clfModel, setClfModel] = useState(MODELS["image-classification"][0]?.id || "")

  const handleCopyResponse = async () => {
    await navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleVisionFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVisionFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setVisionImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClfFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setClfFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setClfImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetResponse = () => {
    setResponse("")
    setResponseImage("")
    setResponseAudio("")
    setPreviewUrl("")
  }

  const handleChat = async () => {
    setLoading(true)
    resetResponse()
    try {
      const messages = chatMessages
        .split("\n\n")
        .filter((m) => m.trim())
        .map((msg) => {
          const parts = msg.split(": ")
          if (parts.length < 2) return { role: "user" as const, content: msg }
          const [role, ...contentParts] = parts
          const roleLower = role.toLowerCase()
          return {
            role: (roleLower === "assistant" || roleLower === "system" ? roleLower : "user") as "user" | "assistant" | "system",
            content: contentParts.join(": "),
          }
        })

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, model: chatModel }),
      })

      const data = await res.json()
      if (data.choices && data.choices[0]) {
        setResponse(data.choices[0].message.content)
      } else if (data.error) {
        setResponse(`Error: ${data.error}`)
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCoding = async () => {
    setLoading(true)
    resetResponse()
    try {
      if (codingLanguage === "html") {
        const res = await fetch("/api/generate-html", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: codingPrompt,
            model: codingModel,
          }),
        })

        const data = await res.json()
        if (data.html) {
          setResponse(data.html)
          setPreviewUrl(data.previewUrl)
        } else if (data.error) {
          setResponse(`Error: ${data.error}`)
        }
      } else {
        const res = await fetch("/api/coding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: `Write ${codingLanguage} code for: ${codingPrompt}` }],
            model: codingModel,
          }),
        })

        const data = await res.json()
        if (data.choices && data.choices[0]) {
          setResponse(data.choices[0].message.content)
        } else if (data.error) {
          setResponse(`Error: ${data.error}`)
        }
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const handleThinking = async () => {
    setLoading(true)
    resetResponse()
    try {
      const res = await fetch("/api/thinking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: thinkingPrompt }],
          model: thinkingModel,
        }),
      })

      const data = await res.json()
      if (data.choices && data.choices[0]) {
        setResponse(data.choices[0].message.content)
      } else if (data.error) {
        setResponse(`Error: ${data.error}`)
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const handleVision = async () => {
    setLoading(true)
    resetResponse()
    try {
      const imageUrlToSend = visionImageUrl

      const res = await fetch("/api/vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: visionPrompt,
          image_url: imageUrlToSend,
          model: visionModel,
        }),
      })

      const data = await res.json()
      if (data.choices && data.choices[0]) {
        setResponse(data.choices[0].message.content)
      } else if (data.error) {
        setResponse(`Error: ${data.error}`)
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    setLoading(true)
    resetResponse()
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: searchQuery,
          model: searchModel,
        }),
      })

      const data = await res.json()
      if (data.choices && data.choices[0]) {
        setResponse(data.choices[0].message.content)
      } else if (data.error) {
        setResponse(`Error: ${data.error}`)
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const handleImageGen = async () => {
    setLoading(true)
    resetResponse()
    try {
      const res = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: imagePrompt,
          model: imageModel,
        }),
      })

      const data = await res.json()
      if (data.data && data.data[0] && data.data[0].b64_json) {
        setResponseImage(`data:image/jpeg;base64,${data.data[0].b64_json}`)
        setResponse("Image generated successfully.")
      } else if (data.error) {
        setResponse(`Error: ${data.error}`)
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSpeech = async () => {
    setLoading(true)
    resetResponse()
    try {
      const res = await fetch("/api/speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: speechText,
          model: speechModel,
        }),
      })

      const data = await res.json()
      if (data.audio) {
        setResponseAudio(`data:${data.type};base64,${data.audio}`)
        setResponse("Audio generated successfully.")
      } else if (data.error) {
        setResponse(`Error: ${data.error}`)
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const handleRetrieval = async () => {
    setLoading(true)
    resetResponse()
    try {
      const res = await fetch("/api/retrieval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: retrievalQuery,
          model: retrievalModel,
        }),
      })

      const data = await res.json()
      if (data.data) {
        setResponse(JSON.stringify(data, null, 2))
      } else if (data.error) {
        setResponse(`Error: ${data.error}`)
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const handleClassification = async () => {
    setLoading(true)
    resetResponse()
    try {
       // Convert file/url to b64 if needed, but here we assume URL or pre-loaded b64 from file input
       // The API supports image_url (which can be b64 data url)
       const imageUrlToSend = clfImageUrl

       const res = await fetch("/api/image-classification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: imageUrlToSend,
          model: clfModel,
        }),
      })

      const data = await res.json()
      if (data.choices && data.choices[0]) {
        setResponse(data.choices[0].message.content)
      } else if (data.error) {
        setResponse(`Error: ${data.error}`)
      } else {
        setResponse(JSON.stringify(data, null, 2))
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-foreground">AI Playground</h1>
          <p className="mt-2 text-lg text-muted-foreground">Test all Nova Devs AI models interactively with Nvidia Powered GPU</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Configure Request</CardTitle>
              <CardDescription>Select model and enter your prompt</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9 h-auto p-1 gap-1">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="coding">Coding</TabsTrigger>
                  <TabsTrigger value="thinking">Think</TabsTrigger>
                  <TabsTrigger value="vision">Vision</TabsTrigger>
                  <TabsTrigger value="image">Image</TabsTrigger>
                  <TabsTrigger value="search">Search</TabsTrigger>
                  <TabsTrigger value="speech">Speech</TabsTrigger>
                  <TabsTrigger value="retrieval">Retriev</TabsTrigger>
                  <TabsTrigger value="clf">Classify</TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="chat-model">Model</Label>
                    <Select value={chatModel} onValueChange={setChatModel}>
                      <SelectTrigger id="chat-model">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MODELS.chat.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name} ({model.context})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chat-messages">Messages</Label>
                    <Textarea
                      id="chat-messages"
                      placeholder="user: Hello! How are you?&#10;&#10;assistant: I'm doing well, thank you!&#10;&#10;user: Can you help me with a question?"
                      value={chatMessages}
                      onChange={(e) => setChatMessages(e.target.value)}
                      rows={8}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">Format: role: message (separated by double newline)</p>
                  </div>

                  <Button onClick={handleChat} disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Send Chat"
                    )}
                  </Button>
                </TabsContent>

                {/* Other tabs similar to chat but simplified for brevity... */}

                <TabsContent value="coding" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Select value={codingModel} onValueChange={setCodingModel}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{MODELS.coding.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={codingLanguage} onValueChange={setCodingLanguage}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="html">HTML (Preview)</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea value={codingPrompt} onChange={e => setCodingPrompt(e.target.value)} placeholder="Code prompt..." rows={6} />
                  <Button onClick={handleCoding} disabled={loading} className="w-full">Generate Code</Button>
                </TabsContent>

                <TabsContent value="thinking" className="space-y-4 mt-4">
                  <Select value={thinkingModel} onValueChange={setThinkingModel}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{MODELS.thinking.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}</SelectContent>
                  </Select>
                  <Textarea value={thinkingPrompt} onChange={e => setThinkingPrompt(e.target.value)} placeholder="Reasoning problem..." rows={6} />
                  <Button onClick={handleThinking} disabled={loading} className="w-full">Start Reasoning</Button>
                </TabsContent>

                <TabsContent value="vision" className="space-y-4 mt-4">
                  <Select value={visionModel} onValueChange={setVisionModel}>
                     <SelectTrigger><SelectValue /></SelectTrigger>
                     <SelectContent>{MODELS.vision.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}</SelectContent>
                  </Select>
                  <Input type="file" accept="image/*" onChange={handleVisionFileUpload} />
                  <Input placeholder="Or Image URL" value={visionImageUrl} onChange={e => setVisionImageUrl(e.target.value)} />
                  {visionImageUrl && <div className="h-40 border rounded overflow-hidden"><img src={visionImageUrl} className="h-full object-contain" /></div>}
                  <Textarea value={visionPrompt} onChange={e => setVisionPrompt(e.target.value)} placeholder="Describe this image..." rows={4} />
                  <Button onClick={handleVision} disabled={loading || !visionImageUrl} className="w-full">Analyze Image</Button>
                </TabsContent>

                <TabsContent value="image" className="space-y-4 mt-4">
                  <Select value={imageModel} onValueChange={setImageModel}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{MODELS.image.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}</SelectContent>
                  </Select>
                  <Textarea value={imagePrompt} onChange={e => setImagePrompt(e.target.value)} placeholder="Image prompt..." rows={4} />
                  <Button onClick={handleImageGen} disabled={loading} className="w-full">Generate Image</Button>
                </TabsContent>

                <TabsContent value="search" className="space-y-4 mt-4">
                  <Select value={searchModel} onValueChange={setSearchModel}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{MODELS.search.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}</SelectContent>
                  </Select>
                  <Textarea value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search query..." rows={4} />
                  <Button onClick={handleSearch} disabled={loading} className="w-full">Search</Button>
                </TabsContent>

                <TabsContent value="speech" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Select value={speechModel} onValueChange={setSpeechModel}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{MODELS.speech.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <Textarea value={speechText} onChange={e => setSpeechText(e.target.value)} placeholder="Text to speech..." rows={4} />
                  <Button onClick={handleSpeech} disabled={loading} className="w-full">Generate Speech</Button>
                </TabsContent>

                <TabsContent value="retrieval" className="space-y-4 mt-4">
                  <div className="space-y-2">
                     <Label>Model</Label>
                     <Select value={retrievalModel} onValueChange={setRetrievalModel}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{MODELS.retrieval.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}</SelectContent>
                     </Select>
                  </div>
                  <Textarea value={retrievalQuery} onChange={e => setRetrievalQuery(e.target.value)} placeholder="Text to embed..." rows={4} />
                  <Button onClick={handleRetrieval} disabled={loading} className="w-full">Get Embeddings</Button>
                </TabsContent>

                <TabsContent value="clf" className="space-y-4 mt-4">
                   <div className="space-y-2">
                      <Label>Model</Label>
                      <Select value={clfModel} onValueChange={setClfModel}>
                         <SelectTrigger><SelectValue /></SelectTrigger>
                         <SelectContent>{MODELS["image-classification"].map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}</SelectContent>
                      </Select>
                   </div>
                   <Input type="file" accept="image/*" onChange={handleClfFileUpload} />
                   <Input placeholder="Or Image URL" value={clfImageUrl} onChange={e => setClfImageUrl(e.target.value)} />
                   {clfImageUrl && <div className="h-40 border rounded overflow-hidden"><img src={clfImageUrl} className="h-full object-contain" /></div>}
                   <Button onClick={handleClassification} disabled={loading || !clfImageUrl} className="w-full">Classify / Detect</Button>
                </TabsContent>

              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Response</CardTitle>
                  <CardDescription>Model output will appear here</CardDescription>
                </div>
                {response && (
                  <Button variant="outline" size="sm" onClick={handleCopyResponse}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (response || responseImage || responseAudio) ? (
                <div className="space-y-4">
                  {responseImage && (
                    <div className="rounded-md overflow-hidden border">
                      <img src={responseImage} alt="Generated" className="w-full h-auto" />
                    </div>
                  )}
                  {responseAudio && (
                     <div className="rounded-md bg-muted p-4 flex items-center justify-center">
                        <audio controls src={responseAudio} className="w-full" />
                     </div>
                  )}
                  {response && (
                    <div className="rounded-md bg-muted p-4 max-h-[600px] overflow-y-auto">
                      <pre className="whitespace-pre-wrap font-mono text-sm text-foreground">{response}</pre>
                    </div>
                  )}
                  {previewUrl && (
                    <div className="flex gap-2">
                      <Button variant="default" asChild className="w-full">
                        <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open Preview
                        </a>
                      </Button>
                      <Badge variant="outline" className="flex items-center">
                        Expires in 24h
                      </Badge>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center py-12 text-muted-foreground">
                  <p>Enter a prompt and click the button to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
