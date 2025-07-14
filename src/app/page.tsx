import Image from "next/image";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Hero12 } from "@/components/hero12";
import { Button, buttonVariants } from "@/components/ui/button";
export default function Home() {
  return (
    <>
      <Hero12 />
      <div className="mt-8 flex justify-center">
        <Link href="/about" className="underline text-blue-600">About Page Example</Link>
      </div>
    </>
  );
}
