"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Download, Eye, Edit, Plus, X } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeSnippet {
  id: string;
  language: string;
  code: string;
  title?: string;
  description?: string;
}

interface CodeSnippetEditorProps {
  snippets: CodeSnippet[];
  onChange: (snippets: CodeSnippet[]) => void;
}

const LANGUAGE_OPTIONS = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'scala', label: 'Scala' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'sql', label: 'SQL' },
  { value: 'bash', label: 'Bash' },
  { value: 'json', label: 'JSON' },
  { value: 'yaml', label: 'YAML' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'plaintext', label: 'Plain Text' },
];

export default function CodeSnippetEditor({ snippets, onChange }: CodeSnippetEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);

  const addSnippet = () => {
    const newSnippet: CodeSnippet = {
      id: Date.now().toString(),
      language: 'javascript',
      code: '// Your code here',
      title: '',
      description: ''
    };
    onChange([...snippets, newSnippet]);
    setEditingId(newSnippet.id);
  };

  const updateSnippet = (id: string, updates: Partial<CodeSnippet>) => {
    const updatedSnippets = snippets.map(snippet => 
      snippet.id === id ? { ...snippet, ...updates } : snippet
    );
    onChange(updatedSnippets);
  };

  const removeSnippet = (id: string) => {
    const updatedSnippets = snippets.filter(snippet => snippet.id !== id);
    onChange(updatedSnippets);
  };

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const downloadSnippet = (snippet: CodeSnippet) => {
    const extension = snippet.language === 'javascript' ? 'js' : 
                     snippet.language === 'typescript' ? 'ts' :
                     snippet.language === 'python' ? 'py' :
                     snippet.language === 'java' ? 'java' :
                     snippet.language === 'cpp' ? 'cpp' :
                     snippet.language === 'csharp' ? 'cs' :
                     snippet.language === 'php' ? 'php' :
                     snippet.language === 'ruby' ? 'rb' :
                     snippet.language === 'go' ? 'go' :
                     snippet.language === 'rust' ? 'rs' :
                     snippet.language === 'swift' ? 'swift' :
                     snippet.language === 'kotlin' ? 'kt' :
                     snippet.language === 'scala' ? 'scala' :
                     snippet.language === 'html' ? 'html' :
                     snippet.language === 'css' ? 'css' :
                     snippet.language === 'sql' ? 'sql' :
                     snippet.language === 'bash' ? 'sh' :
                     snippet.language === 'json' ? 'json' :
                     snippet.language === 'yaml' ? 'yml' :
                     snippet.language === 'markdown' ? 'md' : 'txt';
    
    const filename = snippet.title ? `${snippet.title}.${extension}` : `snippet.${extension}`;
    const blob = new Blob([snippet.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Code Snippets</h3>
        <Button onClick={addSnippet} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Snippet
        </Button>
      </div>

      {snippets.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No code snippets yet. Click "Add Snippet" to get started.</p>
          </CardContent>
        </Card>
      )}

      {snippets.map((snippet) => (
        <Card key={snippet.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Snippet title (optional)"
                  value={snippet.title || ''}
                  onChange={(e) => updateSnippet(snippet.id, { title: e.target.value })}
                  className="w-48"
                />
                <Select
                  value={snippet.language}
                  onValueChange={(value) => updateSnippet(snippet.id, { language: value })}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGE_OPTIONS.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPreviewId(previewId === snippet.id ? null : snippet.id)}
                  className="flex items-center gap-2"
                >
                  {previewId === snippet.id ? <Edit className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {previewId === snippet.id ? 'Edit' : 'Preview'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(snippet.code)}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => downloadSnippet(snippet)}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSnippet(snippet.id)}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Input
              placeholder="Snippet description (optional)"
              value={snippet.description || ''}
              onChange={(e) => updateSnippet(snippet.id, { description: e.target.value })}
              className="mt-2"
            />
          </CardHeader>
          <CardContent className="p-0">
            {previewId === snippet.id ? (
              <div className="bg-muted/30 p-4">
                <SyntaxHighlighter
                  language={snippet.language}
                  style={oneLight}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                  }}
                >
                  {snippet.code}
                </SyntaxHighlighter>
              </div>
            ) : (
              <Textarea
                value={snippet.code}
                onChange={(e) => updateSnippet(snippet.id, { code: e.target.value })}
                placeholder="Enter your code here..."
                className="min-h-[200px] font-mono text-sm border-0 resize-none focus:ring-0 focus:border-0"
                style={{
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word'
                }}
              />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 