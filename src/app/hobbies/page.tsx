"use client";

import Link from "next/link";

export default function HobbiesPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">My Hobbies</h1>
        <p className="text-muted-foreground mb-8">
          This page is under construction and will be available in the future.
        </p>
        <div className="inline-flex items-center gap-2 text-primary">
          <span>Head back to</span>
          <Link href="/" className="underline">home</Link>
          <span>or</span>
          <Link href="/about" className="underline">about</Link>
        </div>
      </section>
    </div>
  );
} 