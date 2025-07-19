"use client";

import { marked } from 'marked';
import { Card, CardContent } from "@/components/ui/card";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  if (!content || content.trim() === '') {
    return (
      <div className="text-muted-foreground italic">
        Content coming soon...
      </div>
    );
  }

  // Debug: Log the content to see what's being passed
  console.log('MarkdownRenderer content:', content);
  console.log('Contains image markdown:', content.includes('!['));

  // Clean up the content to ensure proper markdown parsing
  const cleanedContent = content
    .replace(/\n\s*\n/g, '\n\n') // Normalize line breaks
    .replace(/\n!\[/g, '\n\n![') // Ensure images start on their own line
    .replace(/\]\n/g, ']\n\n'); // Ensure images end with proper spacing

  console.log('Cleaned content:', cleanedContent);

  // Configure marked to handle images properly
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  // Custom renderer for images
  const renderer = new marked.Renderer();
  renderer.image = ({ href, title, text }: { href: string; title: string | null; text: string }) => {
    console.log('Marked rendering image:', { href, title, text });
    if (!href) return '';
    
    const encodedHref = encodeURI(href);
    return `<img src="${encodedHref}" alt="${text || ''}" title="${title || ''}" class="max-w-full h-auto rounded-lg my-4 border border-border" onerror="this.style.display='none';" />`;
  };

  marked.use({ renderer });

  // Parse markdown to HTML
  const htmlContent = marked(cleanedContent);

  console.log('Marked HTML output:', htmlContent);

  return (
    <div 
      className={`prose prose-sm max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
} 