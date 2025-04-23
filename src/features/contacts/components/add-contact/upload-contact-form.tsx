"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileIcon, Loader2, Upload, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type UploadProductsFormProps = {
  onCancel: () => void
  onSuccess: () => void
}

export function UploadContactsForm({ onCancel, onSuccess }: UploadProductsFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setError(null)

    if (selectedFile) {
      // Check file type
      const fileType = selectedFile.name.split(".").pop()?.toLowerCase()
      if (!["csv", "xlsx", "xls"].includes(fileType || "")) {
        setError("Please upload a CSV or Excel file")
        setFile(null)
        return
      }

      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit")
        setFile(null)
        return
      }

      setFile(selectedFile)
    }
  }

  const handleUpload = () => {
    if (!file) {
      setError("Please select a file to upload")
      return
    }

    setIsUploading(true)
    setError(null)

    // Simulate upload process
    setTimeout(() => {
      console.log("Uploading file:", file.name)
      setIsUploading(false)
      onSuccess()
    }, 2000)
  }

  const clearFile = () => {
    setFile(null)
    setError(null)
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="file-upload">Upload File</Label>

        {!file ? (
          <div
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground">CSV or Excel files (max 5MB)</p>
            <Input
              id="file-upload"
              type="file"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileIcon className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={clearFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Template</h3>
        <p className="text-xs text-muted-foreground">
          Download our product template to ensure your data is formatted correctly.
        </p>
        <Button variant="outline" size="sm" className="mt-2">
          Download Template
        </Button>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleUpload} disabled={!file || isUploading}>
          {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isUploading ? "Uploading..." : "Upload Products"}
        </Button>
      </div>
    </div>
  )
}
