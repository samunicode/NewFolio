"use client"
import React from "react";
import { FlipWords } from "@/components/ui/flip-words";
import Image from "next/image"

const movies = [
  { title: "FL1", src: "/th1.avif" },
  { title: "FL2", src: "/th3.avif" },
  { title: "FL3", src: "/th2.avif" },
  { title: "FL4", src: "/fl1.png" },
  { title: "FL5", src: "/fl2.png" },
  { title: "FL6", src: "/fl3.png" },
  { title: "FL8", src: "/fl5.png" },
  { title: "FL9", src: "/fl6.png" },
]

export default function MeRightNow() {
  const duplicatedMovies = [...movies, ...movies] // Creates seamless loop
  const words = ["playing gta5", "learning to cook", "grinding leetcode", "coding endlessly", "watching movies", "hitting gym"];

  return (
    <div className="hidden lg:block p-4 space-y-4 transition-all duration-300 overflow-hidden relative  bg-black/80 backdrop-blur-sm border border-blue-800/25 rounded-3xl shadow-2xl card-hover hover:border-blue-500/50 hover:glow-emerald">

      <h2 className="text-white text-lg mb-4 text-center font-space-grotesk font-semibold">
        Me these days...
        <span className="text-blue-400"> <FlipWords words={words} /> </span>
      </h2>

      {/* B99 Block */}
      <div className="rounded-2xl overflow-hidden bg-transparent text-center shadow-lg">
        <Image
          src="/b99.png"
          width={350}
          height={100}
          alt="Breaking Bad"
          className="mx-auto rounded-xl object-fill"
        />
      </div>

      {/* Movie Carousel with side fade */}
      <div className="space-y-3 relative">

        <div className="relative overflow-hidden">
          {/* Gradient shadow overlays */}
          <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Auto-scrolling movie row */}
          <div className="flex w-max animate-marquee gap-2">
            {duplicatedMovies.map((movie, idx) => (
              <div
                key={idx}
                className="relative w-[70px] sm:w-[90px] md:w-[110px] aspect-[3/4] rounded-xl overflow-hidden bg-transparent shadow-md"
              >
                <Image
                  src={movie.src}
                  alt={movie.title}
                  fill
                  className="object-fill rounded-lg"
                />
              </div>
            ))}
          </div>

        </div>
        <p className="text-white/90 text-lg mb-4 text-center font-space-grotesk font-semibold">
          Clearing my <span className="underline decoration-wavy underline-offset-4 font-caveat text-2xl text-purple-300">movie backlog</span>
        </p>
      </div>

      {/* Cooking Meme */}
      <div className="rounded-xl overflow-hidden shadow-md">
        <Image
          src="/tenor.gif"
          alt="Cooking Meme"
          width={497}
          height={236}
          className="rounded-xl object-cover w-[400px] mx-auto"
        />
        <p className="text-white text-lg mt-4 mb-2 text-center font-space-grotesk font-semibold">
          Trying to <span className="underline decoration-wavy underline-offset-4 font-caveat text-2xl text-yellow-300">cook</span> more often
        </p>
      </div>
    </div>
  )
}
