import { Hero12 } from "@/components/hero12";
import Link from "next/link";

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
