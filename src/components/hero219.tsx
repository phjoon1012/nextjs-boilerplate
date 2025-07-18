"use client";

import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

import { Particles } from "@/components/magicui/particles";

const Hero219 = () => {
  return (
    <section className="relative py-32 max-w-5xl mx-auto">
      <div className="container flex flex-col items-center justify-center gap-4 overflow-hidden">
        <p className="text-muted-foreground">
          Bridging Developers, Building the Future
        </p>
        <h1 className="realtive z-15 max-w-3xl text-center text-6xl font-medium tracking-tighter md:text-7xl">
          The only app you Need to{" "}
          <span
            className="overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
              perspective: "600px",
            }}
          >
            {"Stay Productive".split(" ").map((word, i) => (
              <motion.span
                className="relative inline-block px-[6px] leading-[none]"
                key={i}
                initial={{
                  opacity: 0,
                  y: "70%",
                  rotateX: "-28deg",
                }}
                animate={{
                  opacity: 1,
                  y: "0%",
                  rotateX: "0deg",
                }}
                transition={{
                  delay: i * 0.08 + 0.1,
                  duration: 0.8,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                {word === "Productive" ? (
                  <span className="font-playfair">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </span>
        </h1>
        <Particles
          className="absolute inset-0 z-0"
          quantity={500}
          ease={80}
          color="#000000"
          refresh
        />

        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-20 mt-10 flex items-center justify-center gap-4"
        >
          <SkiperUiMarquee
            showCard={1}
            className=""
            reverse={true}
            src={[
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nextjs-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vue-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/typescript-icon.svg",
            ]}
          />
          <SkiperUiMarquee
            showCard={2}
            className=""
            src={[
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/remix-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vite-icon.svg",
            ]}
          />
          <SkiperUiMarquee
            showCard={3}
            reverse={true}
            className=""
            src={[
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/github-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/laravel-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/gatsby-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vscode-icon.svg",
            ]}
          />
          <SkiperUiMarquee
            showCard={2}
            className=""
            src={[
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vite-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/sketch-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/brave-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/dropbox-icon.svg",
            ]}
          />
          <SkiperUiMarquee
            showCard={3}
            reverse={true}
            className=""
            src={[
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nike-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/spotify-icon.svg",
            ]}
          />
          <SkiperUiMarquee
            showCard={2}
            className=""
            src={[
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/slack-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/linkedin-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/instagram-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/facebook-icon.svg",
            ]}
          />
          <SkiperUiMarquee
            reverse={true}
            showCard={1}
            className=""
            src={[
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/notion-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/twitter-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/google-icon.svg",
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/google-play-icon.svg",
            ]}
          />
        </motion.div>

        <div className="h-92 bg-background absolute bottom-20 left-0 right-0 w-full blur-xl" />
      </div>
    </section>
  );
};

export { Hero219 };

function Marquee({
  className,
  reverse,
  children,
  vertical = false,
  repeat = 4,
  ...props
   
}: any) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around ![animation-duration:12s] [animation-play-state:running] [gap:var(--gap)] group-hover:[animation-play-state:paused]",
              {
                "animate-marquee flex-row": !vertical,
                "animate-marquee-vertical flex-col": vertical,
                "[animation-direction:reverse]": reverse,
              },
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

interface SkiperUiMarqueeProps {
  showCard: number;
  reverse?: boolean;
  className?: string;
  src: string[];
}

export function SkiperUiMarquee({
  showCard,
  reverse = false,
  className,
  src,
}: SkiperUiMarqueeProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        height: showCard * 113,
      }}
    >
      <Marquee reverse={reverse} vertical={true}>
        {src.map((item, idx) => (
          <Card key={idx} src={item} />
        ))}
      </Marquee>
      <div className="from-background absolute top-0 z-10 h-8 w-full bg-gradient-to-b to-transparent" />
      <div className="from-background absolute bottom-0 z-10 h-8 w-full bg-gradient-to-t to-transparent" />
    </div>
  );
}

function Card({ src }: { src?: string }) {
  return (
    <div
      className={cn(
        "border-muted relative flex size-24 items-center justify-center overflow-hidden rounded-3xl border p-4",
        "from-muted/50 to-background bg-gradient-to-b",
        "dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <img
        src={src || "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/notion-icon.svg"}
        alt="Card"
        className="size-8 object-cover"
      />
    </div>
  );
}
