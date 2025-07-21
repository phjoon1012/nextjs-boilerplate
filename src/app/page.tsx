import { AboutCarousel } from "@/components/about/AboutCarousel";
import { HeroMain } from "@/components/home/HeroMain";
import { HeroAnimated } from "@/components/home/HeroAnimated";
import { HeroBoxes } from "@/components/home/HeroBoxes";
import HeroCreative from "@/components/home/HeroCreative";
import HeroAboutMe from "@/components/home/HeroAboutMe";
import HeroMyWork from "@/components/home/HeroMyWork";
import { HeroStats } from "@/components/home/HeroStats";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <HeroBoxes />
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
