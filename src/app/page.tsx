"use client";
import { AboutCarousel } from "@/components/about/AboutCarousel";
import { HeroMain } from "@/components/home/HeroMain";
import { HeroAnimated } from "@/components/home/HeroAnimated";
import { HeroBoxes } from "@/components/home/HeroBoxes";
import HeroCreative from "@/components/home/HeroCreative";
import { HeroStats } from "@/components/home/HeroStats";
import { Boxes } from "@/components/aceternity/background-boxes";
import { Particles } from "@/components/magicui/particles";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const dividerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!dividerRef.current) return;
      const rect = dividerRef.current.getBoundingClientRect();
      // Show divider when it's at least 40px from the top of the viewport
      setVisible(rect.top < window.innerHeight - 40);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <HeroBoxes />
      {/* Long, thin, minimalistic divider with fade-out ends and scroll-triggered fade-in */}
      <div className="flex justify-center items-center w-full my-8">
        <div
          ref={dividerRef}
          className={`h-0.5 w-3/4 bg-muted rounded-full shadow-sm transition-opacity duration-700 relative ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        />
      </div>
      <HeroStats />
      {/* <AboutCarousel />
      <HeroMain />
      <HeroAnimated />
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
