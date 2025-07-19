import { About8 } from "@/components/about8";
import { Hero12 } from "@/components/hero12";
import { Hero219 } from "@/components/hero219";
import { Hero223 } from "@/components/hero223";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero223 />
      {/* <About8 />
      <Hero12 />
      <Hero219 />
      <div className="mt-8 flex justify-center">
        <Link href="/chatbot" className="underline text-blue-600">Chatbot Page Example</Link>
        <Link href="/about" className="underline text-blue-600">About Page Example</Link>
      </div>
      <div className="mt-8 p-4 border rounded">
        <h2>Markdown Renderer Test</h2>
        <p>Testing the updated markdown renderer with images:</p>
        <div className="mt-4">
          <img 
            src="/uploads/1752914995875-Screenshot 2025-06-19 at 5.37.27 PM.png" 
            alt="Direct Test" 
            className="max-w-full h-auto border rounded my-2" 
          />
        </div>
      </div> */}
    </>
  );
}
