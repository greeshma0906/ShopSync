"use client"

import { PhotoUpload } from "@/components/photo-upload"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Upload & Analyze</h1>
            <p className="mt-2 text-muted-foreground">
              Upload photos of your clothing items for AI-powered style analysis
            </p>
          </div>

          <PhotoUpload
            mode="wardrobe"
            onAnalysisComplete={(result) => {
              console.log("Analysis complete:", result)
            }}
          />
        </div>
      </div>
    </div>
  )
}
