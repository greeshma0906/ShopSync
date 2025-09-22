"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Camera, Upload, X, Sparkles, Loader2, Check } from "lucide-react"

interface AnalysisResult {
  category: string
  color: string
  style: string
  brand?: string
  confidence: number
  suggestions: string[]
}

interface PhotoUploadProps {
  onAnalysisComplete?: (result: AnalysisResult) => void
  mode?: "wardrobe" | "friend"
}

export function PhotoUpload({ onAnalysisComplete, mode = "wardrobe" }: PhotoUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([])
  const [manualInfo, setManualInfo] = useState({ brand: "", model: "", description: "" })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: true,
  })

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const simulateAnalysis = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate AI analysis progress
    const progressSteps = [
      { progress: 20, message: "Processing image..." },
      { progress: 40, message: "Detecting clothing items..." },
      { progress: 60, message: "Analyzing style and colors..." },
      { progress: 80, message: "Generating recommendations..." },
      { progress: 100, message: "Analysis complete!" },
    ]

    for (const step of progressSteps) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setAnalysisProgress(step.progress)
    }

    // Mock analysis results
    const mockResults: AnalysisResult[] = uploadedFiles.map((file, index) => ({
      category: ["tops", "bottoms", "shoes", "accessories"][index % 4],
      color: ["navy", "black", "white", "brown"][index % 4],
      style: ["casual", "formal", "sporty", "bohemian"][index % 4],
      brand: manualInfo.brand || "Unknown",
      confidence: 85 + Math.random() * 10,
      suggestions: ["Pairs well with neutral colors", "Great for layering", "Versatile for multiple occasions"],
    }))

    setAnalysisResults(mockResults)
    setIsAnalyzing(false)

    if (onAnalysisComplete && mockResults.length > 0) {
      onAnalysisComplete(mockResults[0])
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="mr-2 h-5 w-5" />
            {mode === "wardrobe" ? "Upload Your Items" : "Upload Friend Photos"}
          </CardTitle>
          <CardDescription>
            {mode === "wardrobe"
              ? "Take photos of clothing items you own or want to add to your wardrobe"
              : "Upload photos of your friend to analyze their style preferences"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">
                  {isDragActive ? "Drop photos here" : "Drag & drop photos here"}
                </p>
                <p className="text-sm text-muted-foreground">or click to browse files</p>
              </div>
              <Badge variant="secondary">JPG, PNG, WebP up to 10MB</Badge>
            </div>
          </div>

          {/* Uploaded Files Preview */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-4 text-sm font-medium text-foreground">Uploaded Photos</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-square overflow-hidden rounded-lg border border-border">
                      <img
                        src={URL.createObjectURL(file) || "/placeholder.svg"}
                        alt={`Upload ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    <p className="mt-2 truncate text-xs text-muted-foreground">{file.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Manual Information Input */}
      {mode === "wardrobe" && uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Information</CardTitle>
            <CardDescription>Help us provide better recommendations (optional)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  placeholder="e.g., Nike, Zara, H&M"
                  value={manualInfo.brand}
                  onChange={(e) => setManualInfo((prev) => ({ ...prev, brand: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="model">Model/Style</Label>
                <Input
                  id="model"
                  placeholder="e.g., Air Max, Slim Fit"
                  value={manualInfo.model}
                  onChange={(e) => setManualInfo((prev) => ({ ...prev, model: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Any additional details about the item..."
                value={manualInfo.description}
                onChange={(e) => setManualInfo((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Button */}
      {uploadedFiles.length > 0 && (
        <div className="flex justify-center">
          <Button size="lg" onClick={simulateAnalysis} disabled={isAnalyzing} className="px-8">
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Analyze with AI
              </>
            )}
          </Button>
        </div>
      )}

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">AI Analysis in Progress</span>
                <span className="text-sm text-muted-foreground">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} />
              <p className="text-center text-sm text-muted-foreground">
                Our AI is analyzing your photos to provide personalized recommendations...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {analysisResults.length > 0 && !isAnalyzing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-green-500" />
              Analysis Complete
            </CardTitle>
            <CardDescription>Here's what our AI discovered about your items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysisResults.map((result, index) => (
                <div key={index} className="rounded-lg border border-border/50 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="default">{result.category}</Badge>
                        <Badge variant="secondary">{result.style}</Badge>
                        <div
                          className="h-4 w-4 rounded-full border border-border"
                          style={{ backgroundColor: result.color === "white" ? "#f8f9fa" : result.color }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Brand: {result.brand} • Confidence: {result.confidence.toFixed(1)}%
                      </p>
                      <div>
                        <p className="text-sm font-medium mb-1">AI Suggestions:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {result.suggestions.map((suggestion, i) => (
                            <li key={i} className="flex items-start">
                              <div className="mr-2 mt-1.5 h-1 w-1 rounded-full bg-primary" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
