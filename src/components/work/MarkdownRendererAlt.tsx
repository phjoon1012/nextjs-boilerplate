"use client";

import { marked } from 'marked';
import { useEffect } from 'react';

interface MarkdownRendererAltProps {
  content: string;
  className?: string;
}

export default function MarkdownRendererAlt({ content, className = "" }: MarkdownRendererAltProps) {
  if (!content || content.trim() === '') {
    return (
      <div className="text-muted-foreground italic">
        Content coming soon...
      </div>
    );
  }

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
    return `<img src="${encodedHref}" alt="${text || ''}" title="${title || ''}" class="max-w-full h-auto rounded-lg my-4 border border-border" />`;
  };

  marked.use({ renderer });

  // Parse markdown to HTML
  const htmlContent = marked(content);

  console.log('Marked HTML output:', htmlContent);

  return (
    <div 
      className={`prose prose-sm max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
} 