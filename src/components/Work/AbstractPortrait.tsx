"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AbstractPortrait() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 group">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-foreground/5 blur-3xl rounded-full scale-110 group-hover:bg-foreground/10 transition-colors duration-700" />
      
      {/* The Image with Abstract Filters */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-foreground/10 bg-background">
        <Image
          src="/me/20220325_113134-01.jpeg"
          alt="Sahil Gangurde"
          fill
          className="object-cover grayscale contrast-[1.2] opacity-40 scale-110 group-hover:scale-100 group-hover:opacity-60 transition-all duration-700 ease-out"
          priority
        />
        
        {/* Pixel/Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.15] group-hover:opacity-[0.1] transition-opacity pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fff_1px,transparent_1px)] bg-[size:8px_8px]" />
        </div>

        {/* Scanlines */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,#000_50%)] bg-[size:100%_4px]" />
        </div>

        {/* Glitch Overlay (Animated) */}
        <motion.div 
          animate={{ 
            opacity: [0, 0.1, 0],
            x: [-2, 2, -1],
          }}
          transition={{ 
            duration: 0.2, 
            repeat: Infinity, 
            repeatDelay: 5 
          }}
          className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay pointer-events-none"
        />

        {/* Geometric Accents */}
        <div className="absolute top-4 right-4 text-[8px] font-mono text-foreground/20 uppercase tracking-widest">
          Auth_ID: 0xSFG
        </div>
        <div className="absolute bottom-4 left-4 w-12 h-px bg-foreground/20" />
      </div>

      {/* Outer Decorative Frame */}
      <div className="absolute -inset-4 border border-foreground/5 rounded-[2rem] pointer-events-none" />
      <div className="absolute -inset-8 border border-foreground/[0.02] rounded-[3rem] pointer-events-none" />
      
      {/* Interactive Reveal */}
      <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700" />
    </div>
  );
}
