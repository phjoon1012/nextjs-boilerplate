"use client";

export default function ImageTest() {
  const imageUrl = "/uploads/1752914995875-Screenshot 2025-06-19 at 5.37.27 PM.png";
  
  return (
    <div className="p-4">
      <h2>Image Test</h2>
      <p>Testing direct image load:</p>
      <img 
        src={imageUrl} 
        alt="Test Screenshot" 
        className="max-w-full h-auto border rounded"
        onError={(e) => {
          console.error('Direct image load failed:', imageUrl);
          e.currentTarget.style.display = 'none';
        }}
        onLoad={() => {
          console.log('Direct image load successful:', imageUrl);
        }}
      />
      
      <h3>Markdown Test:</h3>
      <div className="mt-4">
        <p>Raw markdown: ![Screenshot 2025-06-19 at 5.37.27 PM.png](/uploads/1752914995875-Screenshot 2025-06-19 at 5.37.27 PM.png)</p>
      </div>
    </div>
  );
} 