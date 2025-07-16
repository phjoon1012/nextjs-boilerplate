import { About4 } from "@/components/about4";
import { Hero12 } from "@/components/hero12";
import { Hero219 } from "@/components/hero219";
import { Hero223 } from "@/components/hero223";
import { Navbar } from "@/components/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero223 />
      <About4 />
      <Hero12 />
      <Hero219 />
      <div className="mt-8 flex justify-center">
        <Link href="/chatbot" className="underline text-blue-600">Chatbot Page Example</Link>
        <Link href="/about" className="underline text-blue-600">About Page Example</Link>
      </div>
    </>
  );
}
