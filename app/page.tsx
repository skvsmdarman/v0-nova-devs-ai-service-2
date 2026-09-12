import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Code, Brain, Eye, Search, Zap, Shield, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background to-muted/20">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="container relative mx-auto px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="secondary">
              Powered by Nova devs
            </Badge>
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
              The most powerful AI API for developers
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
              Access multiple state-of-the-art AI models through a unified API. Build transformative AI experiences with
              chat, code generation, reasoning, vision, and search capabilities.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/playground">Try Playground</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs">View Documentation</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Free tier available • No credit card required • Multiple models
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Five powerful AI capabilities
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">Choose the right AI model for your specific use case</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="relative overflow-hidden transition-all hover:shadow-lg">
            <CardHeader>
              <MessageSquare className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Chat API</CardTitle>
              <CardDescription>Conversational AI for chat applications and customer support</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Multi-turn conversations</li>
                <li>• Context-aware responses</li>
                <li>• Multiple language support</li>
                <li>• Up to 1M context window</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden transition-all hover:shadow-lg">
            <CardHeader>
              <Code className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Coding API</CardTitle>
              <CardDescription>Generate clean, production-ready code for any language</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• HTML, CSS, JavaScript</li>
                <li>• React, TypeScript, Python</li>
                <li>• Website generation</li>
                <li>• Code explanation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden transition-all hover:shadow-lg">
            <CardHeader>
              <Brain className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Thinking API</CardTitle>
              <CardDescription>Advanced reasoning for complex problem-solving</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Step-by-step reasoning</li>
                <li>• Mathematical proofs</li>
                <li>• Logical analysis</li>
                <li>• Deep comprehension</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden transition-all hover:shadow-lg">
            <CardHeader>
              <Eye className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Vision API</CardTitle>
              <CardDescription>Analyze images, documents, and videos with AI</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Image understanding</li>
                <li>• Document OCR</li>
                <li>• Chart analysis</li>
                <li>• Video comprehension</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden transition-all hover:shadow-lg">
            <CardHeader>
              <Search className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Search API</CardTitle>
              <CardDescription>Web search and information retrieval powered by AI</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Real-time information</li>
                <li>• Factual answers</li>
                <li>• Source citations</li>
                <li>• Comprehensive search</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden transition-all hover:shadow-lg border-primary/50">
            <CardHeader>
              <Sparkles className="h-10 w-10 text-primary mb-2" />
              <CardTitle>All in One API</CardTitle>
              <CardDescription>Unified interface for all capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Single integration</li>
                <li>• Consistent responses</li>
                <li>• Easy model switching</li>
                <li>• Automatic rate limiting</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-y border-border bg-muted/20">
        <div className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Why Nova Devs AI?</h2>
            <p className="mt-4 text-lg text-muted-foreground">Built for developers who need reliability and speed</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Optimized for speed with automatic retry logic and rate limiting handling
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Free & Reliable</h3>
              <p className="text-muted-foreground">
                Access to premium models at no cost with built-in error handling and retries
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Easy Integration</h3>
              <p className="text-muted-foreground">
                Simple REST API with comprehensive documentation and interactive playground
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Start building with Nova Devs AI today
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Try our interactive playground or dive into the documentation to get started
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/playground">Open Playground</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs">Read Docs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold">
                N
              </div>
              <span className="text-sm font-semibold text-foreground">Nova Devs AI Service</span>
            </div>
            <p className="text-sm text-muted-foreground">Powered by NVIDIA NIM • Free AI Models</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
