"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkdownTest() {
  const testMarkdown = `This is a test paragraph.

![Screenshot 2025-06-19 at 5.37.27 PM.png](/uploads/1752914995875-Screenshot 2025-06-19 at 5.37.27 PM.png)

Another paragraph.`;

  return (
    <div className="p-4 border rounded">
      <h2>Markdown Test</h2>
      <div className="mb-4">
        <h3>Raw Markdown:</h3>
        <pre className="bg-gray-100 p-2 rounded text-sm">{testMarkdown}</pre>
      </div>
      
      <div className="mb-4">
        <h3>Rendered Markdown:</h3>
        <div className="border p-4 rounded">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ src, alt }) => {
                console.log('Test component rendering image:', { src, alt });
                return (
                  <img 
                    src={src as string} 
                    alt={alt || ''} 
                    className="max-w-full h-auto border rounded my-2" 
                  />
                );
              },
              p: ({ children }) => {
                console.log('Test component rendering paragraph:', children);
                return <p className="mb-2">{children}</p>;
              }
            }}
          >
            {testMarkdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
} 