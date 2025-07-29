"use client";

import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface SimpleMathRendererProps {
  content: string;
  className?: string;
}

export default function SimpleMathRenderer({ content, className = "" }: SimpleMathRendererProps) {
  // Use client-side only rendering to avoid hydration issues
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return <div className={className}>{content}</div>;
  }

  const renderContent = (text: string) => {
    // Normalize the input
    const normalizedText = text.trim();
    
    // Enhanced markdown processing
    const processMarkdown = (markdown: string) => {
      let processed = markdown;
      
      // Line breaks first (to avoid conflicts)
      processed = processed.replace(/\n\n/g, '<br/><br/>');
      processed = processed.replace(/\n/g, '<br/>');
      
      // Headers (more flexible matching)
      processed = processed.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
      processed = processed.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
      processed = processed.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');
      
      // Bold and italic (more flexible)
      processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      processed = processed.replace(/\*([^*]+)\*/g, '<em>$1</em>');
      
      // Lists (more flexible)
      processed = processed.replace(/^-\s+(.+)$/gm, '<li>$1</li>');
      
      // Wrap consecutive list items in ul tags
      processed = processed.replace(/(<li>.*?<\/li>)+/g, (match) => {
        return `<ul>${match}</ul>`;
      });
      
      // Images (markdown syntax)
      processed = processed.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg mx-auto block" />');
      
      return processed;
    };

    // Find all math expressions and their positions
    const mathExpressions = [];
    
    // Find inline math
    let inlineMatch;
    const inlineMathRegex = /\\\((.*?)\\\)/g;
    while ((inlineMatch = inlineMathRegex.exec(normalizedText)) !== null) {
      mathExpressions.push({
        type: 'inline',
        start: inlineMatch.index,
        end: inlineMatch.index + inlineMatch[0].length,
        content: inlineMatch[1]
      });
    }
    
    // Find block math
    let blockMatch;
    const blockMathRegex = /\\\[(.*?)\\\]/g;
    while ((blockMatch = blockMathRegex.exec(normalizedText)) !== null) {
      mathExpressions.push({
        type: 'block',
        start: blockMatch.index,
        end: blockMatch.index + blockMatch[0].length,
        content: blockMatch[1]
      });
    }
    
    // Sort by position
    mathExpressions.sort((a, b) => a.start - b.start);
    
    const result = [];
    let lastIndex = 0;
    let keyCounter = 0;
    
    // Process each math expression
    for (const mathExpr of mathExpressions) {
      // Add text before math
      if (mathExpr.start > lastIndex) {
        const textBefore = normalizedText.slice(lastIndex, mathExpr.start);
        if (textBefore) {
          result.push(
            <span key={`text-${keyCounter++}`} dangerouslySetInnerHTML={{ __html: processMarkdown(textBefore) }} />
          );
        }
      }
      
      // Add math
      try {
        if (mathExpr.type === 'inline') {
          result.push(<InlineMath key={`math-${keyCounter++}`} math={mathExpr.content} />);
        } else {
          result.push(<BlockMath key={`math-${keyCounter++}`} math={mathExpr.content} />);
        }
      } catch (error) {
        const MathComponent = mathExpr.type === 'inline' ? 'span' : 'div';
        result.push(
          <MathComponent key={`math-${keyCounter++}`} className="text-red-500">
            {mathExpr.type === 'inline' ? `\\(${mathExpr.content}\\)` : `\\[${mathExpr.content}\\]`}
          </MathComponent>
        );
      }
      
      lastIndex = mathExpr.end;
    }
    
    // Add remaining text
    if (lastIndex < normalizedText.length) {
      const remainingText = normalizedText.slice(lastIndex);
      if (remainingText) {
        result.push(
          <span key={`text-${keyCounter++}`} dangerouslySetInnerHTML={{ __html: processMarkdown(remainingText) }} />
        );
      }
    }
    
    return result.length > 0 ? result : [<span key="empty" dangerouslySetInnerHTML={{ __html: processMarkdown(normalizedText) }} />];
  };

  return (
    <div className={className}>
      {renderContent(content)}
    </div>
  );
} 