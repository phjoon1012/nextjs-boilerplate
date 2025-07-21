"use client";

import { useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Save, RotateCcw, Upload } from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export default function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = "Start writing your content...",
  label = "Content"
}: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (val?: string) => {
    onChange(val || "");
  };

  const resetContent = () => {
    if (confirm("Are you sure you want to reset the content? This cannot be undone.")) {
      onChange("");
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // Create FormData for upload
        const formData = new FormData();
        formData.append('file', file);
        
        // Upload file
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Upload failed');
        }
        
        const result = await response.json();
        
        // Insert the image markdown with the actual URL
        const imageMarkdown = `![${file.name}](${result.url})`;
        
        // Insert the image markdown at cursor position or append to content
        const newValue = value + (value.endsWith('\n') ? '' : '\n') + imageMarkdown + '\n';
        onChange(newValue);
        
      } catch (error) {
        console.error('Upload error:', error);
        alert('Failed to upload image. Please try again.');
      }
    }
  };

  return (
    <Card className={`${isFullscreen ? 'fixed inset-0 z-50 m-4' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{label}</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center gap-2"
            >
              {isPreview ? <Edit className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {isPreview ? "Edit" : "Preview"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="flex items-center gap-2"
            >
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleImageUpload}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Add Image
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetContent}
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div data-color-mode="light">
          <MDEditor
            value={value}
            onChange={handleChange}
            preview={isPreview ? "preview" : "live"}
            height={isFullscreen ? "calc(100vh - 200px)" : 400}
            className="border-0"
            textareaProps={{
              placeholder: placeholder,
              onKeyDown: (e) => {
                // Don't prevent default for spacebar and enter
                if (e.key === ' ' || e.key === 'Enter') {
                  return; // Let the default behavior happen
                }
                
                // Handle tab key for indentation
                if (e.key === 'Tab') {
                  e.preventDefault();
                  const target = e.target as HTMLTextAreaElement;
                  const start = target.selectionStart;
                  const end = target.selectionEnd;
                  
                  // Insert tab character
                  const newValue = value.substring(0, start) + '  ' + value.substring(end);
                  onChange(newValue);
                  
                  // Set cursor position after tab
                  setTimeout(() => {
                    target.setSelectionRange(start + 2, start + 2);
                  }, 0);
                }
              },
              onInput: (e) => {
                // Ensure input events are handled properly
                const target = e.target as HTMLTextAreaElement;
                if (target.value !== value) {
                  onChange(target.value);
                }
              },
            }}
            previewOptions={{
              style: {
                backgroundColor: "transparent",
              },
            }}
            onKeyDown={(e) => {
              // Global key handler for the editor
              if (e.key === ' ' || e.key === 'Enter') {
                e.stopPropagation();
              }
            }}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>
      </CardContent>
    </Card>
  );
} 