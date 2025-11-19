"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function InputEngine({ onSubmit, isLoading }: { onSubmit: (val: string) => void, isLoading: boolean }) {
  const [input, setInput] = useState("");

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center px-4 relative overflow-hidden bg-[#0F0E0E]">
      
      {/* 1. Atmospheric Glow (Subtler) */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#CC4425] rounded-full blur-[180px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#425C5A] rounded-full blur-[150px] opacity-15 pointer-events-none" />

      <div className="max-w-4xl w-full relative z-10 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex flex-col items-center"
        >
          {/* 2. Micro-Typography Header */}
          <div className="mb-16 tracking-[0.4em] text-[#E8E6D9] opacity-60 text-[10px] uppercase font-body font-semibold">
            The Archive • ACC
          </div>

          {/* 3. The Prompt */}
          <h1 className="font-display text-4xl md:text-6xl text-[#E8E6D9] text-center leading-tight mb-8">
            <span className="opacity-40 italic font-light">
              I am currently listening to
            </span>
          </h1>

          {/* 4. The Input Field (The Star of the Show) */}
          <div className="relative w-full max-w-2xl group">
            <input
              autoFocus
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && input && onSubmit(input)}
              placeholder="e.g. John Coltrane"
              // IMPROVED: High contrast placeholder, removed outlines, huge text
              className="w-full bg-transparent text-center text-4xl md:text-6xl text-[#CC4425] font-display italic placeholder:text-[#E8E6D9]/30 focus:outline-none py-4 font-medium"
              autoComplete="off"
            />
            
            {/* 5. The Line (Tighter and Reactive) */}
            <div className={`h-[1px] w-full bg-[#E8E6D9]/20 mt-4 mx-auto transition-all duration-500 ease-out transform ${input ? 'bg-[#CC4425] scale-x-100' : 'scale-x-75'}`} />
            
            {/* Helper Text */}
            <div className="mt-4 text-center opacity-0 group-hover:opacity-40 transition-opacity duration-500 font-body text-xs text-[#E8E6D9] tracking-widest uppercase">
              Press Enter to Dig
            </div>
          </div>

          {/* 6. Loading State */}
          <div className="mt-12 h-8">
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-[#CC4425] font-body text-xs uppercase tracking-widest"
              >
                <span className="animate-spin text-lg">✢</span> 
                <span>Analyzing Harmonics...</span>
              </motion.div>
            )}
          </div>

        </motion.div>
      </div>
    </section>
  );
}