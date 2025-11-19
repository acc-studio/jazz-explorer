"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Album } from "@/types/jazz";

export default function ListeningDeck({ albums, onReset }: { albums: Album[], onReset: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeAlbum = albums[activeIndex];

  if (!activeAlbum) return null;

  return (
    <section 
      className="min-h-screen w-full flex flex-col relative transition-colors duration-1000 ease-in-out overflow-y-auto"
      style={{ backgroundColor: activeAlbum.color }}
    >
      {/* Mood Overlay */}
      <div className="fixed inset-0 bg-[#0F0E0E] mix-blend-multiply opacity-80 pointer-events-none" />
      
      <div className="relative z-20 flex-1 flex flex-col md:flex-row min-h-screen p-6 md:p-12 gap-12">
        
        {/* LEFT: The Stack (Navigation) */}
        <div className="w-full md:w-1/3 flex flex-col space-y-6 order-2 md:order-1 md:sticky md:top-12 md:h-[calc(100vh-6rem)]">
          <button onClick={onReset} className="text-left text-xs uppercase tracking-widest text-[#E8E6D9]/50 hover:text-[#CC4425] transition-colors mb-4">
            ← Return to Archive
          </button>
          
          <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar pr-4">
            {albums.map((album, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`group text-left p-6 border-l-2 transition-all duration-500 ${
                  idx === activeIndex ? "border-[#CC4425] bg-white/5" : "border-white/10 hover:bg-white/5"
                }`}
              >
                <span className="font-body text-[10px] text-[#E8E6D9]/40 mb-2 block uppercase tracking-[0.2em]">
                  Recommendation 0{idx + 1}
                </span>
                <span className={`font-display text-xl block mb-1 ${idx === activeIndex ? "text-[#E8E6D9]" : "text-[#E8E6D9]/60"}`}>
                  {album.artist}
                </span>
                <span className="font-body text-sm text-[#E8E6D9]/40 group-hover:text-[#E8E6D9]/80 transition-colors">
                   — {album.connection}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: The Sleeve (Content) */}
        <div className="w-full md:w-2/3 flex items-start pt-10 md:pt-20 relative order-1 md:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAlbum.id}
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-4xl"
            >
              {/* Header Info */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="px-4 py-1 border border-[#E8E6D9]/30 rounded-full">
                  <span className="font-body text-xs uppercase tracking-widest text-[#CC4425] font-bold">
                    Rec. {activeAlbum.year}
                  </span>
                </div>
                <div className="h-[1px] flex-1 bg-[#E8E6D9]/20" />
              </div>

              {/* Main Title */}
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#E8E6D9] leading-[0.9] mb-4">
                {activeAlbum.artist}
              </h1>
              <h2 className="font-display italic text-3xl md:text-5xl text-[#E8E6D9]/50 mb-12">
                {activeAlbum.title}
              </h2>

              {/* THE LINER NOTES GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-[#E8E6D9]/10 pt-12">
                
                {/* Column 1: The Sonic Description (7 cols) */}
                <div className="lg:col-span-7 space-y-8">
                  <h3 className="font-body text-xs uppercase tracking-[0.2em] text-[#E8E6D9]/40">Sonic Texture</h3>
                  <p className="font-display text-xl md:text-2xl text-[#E8E6D9]/90 leading-relaxed">
                    &quot;{activeAlbum.linerNotes}&quot;
                  </p>
                  
                  <div className="pt-8">
                     <h3 className="font-body text-xs uppercase tracking-[0.2em] text-[#E8E6D9]/40 mb-4">Key Selections</h3>
                     <ul className="space-y-3">
                        {activeAlbum.tracks.map((t, i) => (
                          <li key={i} className="flex items-center gap-4 text-[#E8E6D9]/80 font-body text-sm border-b border-[#E8E6D9]/5 pb-2">
                            <span className="text-[#CC4425] font-mono text-xs">0{i+1}</span> {t}
                          </li>
                        ))}
                     </ul>
                  </div>
                </div>

                {/* Column 2: Personnel & Credits (5 cols) */}
                <div className="lg:col-span-5 space-y-8 lg:border-l lg:border-[#E8E6D9]/10 lg:pl-12">
                   
                   {/* The Personnel List */}
                   <div>
                     <h3 className="font-body text-xs uppercase tracking-[0.2em] text-[#E8E6D9]/40 mb-6">Personnel</h3>
                     <div className="font-body text-sm text-[#E8E6D9]/70 leading-loose">
                       {/* Safe check in case personnel is missing from earlier data */}
                       {(activeAlbum.personnel || "Details unavailable").split(',').map((p, i) => (
                         <div key={i} className="mb-2">
                           {p.trim()}
                         </div>
                       ))}
                     </div>
                   </div>

                   <div className="pt-8">
                      <div className="p-6 bg-[#E8E6D9]/5 border border-[#E8E6D9]/10">
                        <h4 className="font-display text-lg text-[#E8E6D9] mb-2">Why this?</h4>
                        <p className="font-body text-xs text-[#E8E6D9]/60 leading-relaxed">
                          {activeAlbum.connection}
                        </p>
                      </div>
                   </div>

                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}