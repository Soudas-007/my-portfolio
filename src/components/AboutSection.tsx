"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  const skills = [
    { name: "Figma", color: "var(--color-accent-blue)" },
    { name: "UI Design", color: "var(--color-accent-green)" },
    { name: "Prototyping", color: "var(--color-accent-yellow)" },
    { name: "Wireframing", color: "var(--color-accent-red)" },
    { name: "Aseprite", color: "var(--color-accent-blue)" },
    { name: "Research", color: "var(--color-accent-green)" }
  ];

  return (
    <section id="about" className="py-fluid-section px-6 relative overflow-hidden bg-background">
      {/* Decorative Atmosphere */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-surface/20 -skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* Left: Manifesto Content (7 cols) */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-[10px] font-bold text-accent-blue uppercase tracking-[0.4em] mb-4 block">Manifesto</span>
              <h2 className="font-pixel text-fluid-h1 text-primary leading-tight">
                MEMORABLE BY <br/> DESIGN.
              </h2>
            </div>

            <p className="text-secondary font-semibold text-fluid-body leading-relaxed max-w-2xl">
              I&apos;m a UI/UX Designer who believes digital products shouldn&apos;t just be usable—they should be memorable. By blending modern product logic with playful, handcrafted aesthetics, I build experiences that bridge the gap between utility and emotion.
            </p>

            <div className="pt-4">
              <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-6 opacity-40">Core Stack & Expertise</h4>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -3, scale: 1.05 }} 
                    className="px-5 py-2 bg-white border-3 border-primary rounded-2xl font-bold text-primary text-xs shadow-[4px_4px_0px_var(--color-primary)] cursor-default"
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Desk Visual (5 cols) */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            whileHover={{ rotate: 1 }}
            className="relative w-full max-w-[400px] aspect-[4/3] bg-surface border-4 border-primary rounded-[2.5rem] shadow-[15px_15px_0px_var(--color-primary)] p-2 flex flex-col group"
          >
            <div className="w-full h-full bg-[#121212] rounded-[1.8rem] border-3 border-primary overflow-hidden relative">
              {/* Window Header */}
              <div className="absolute top-0 left-0 w-full h-6 bg-primary/10 flex gap-1.5 items-center px-4 z-10 border-b-2 border-primary/20">
                <div className="w-2 h-2 rounded-full bg-accent-red border border-primary/20" />
                <div className="w-2 h-2 rounded-full bg-accent-yellow border border-primary/20" />
                <div className="w-2 h-2 rounded-full bg-accent-green border border-primary/20" />
              </div>
              
              {/* Visual Content */}
              <div className="absolute inset-0 mt-6 flex items-center justify-center p-6">
                <div className="relative w-full h-full">
                  <Image 
                    src="/designer.png" 
                    alt="Designer at Work" 
                    fill 
                    className="object-contain pixelated transition-transform duration-700 group-hover:scale-110" 
                    priority 
                  />
                </div>
              </div>

              {/* Interaction Overlay */}
              <div className="absolute inset-0 bg-accent-blue/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Monitor Stand Logic */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-8 bg-surface border-x-4 border-primary z-0" />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-4 bg-surface border-4 border-primary rounded-t-2xl z-10" />
            
            {/* Ambient Accessories */}
            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 w-12 h-16 bg-accent-red border-4 border-primary rounded-xl shadow-[4px_4px_0px_var(--color-primary)] z-30 flex items-center justify-center"
            >
              <span className="text-lg">☕</span>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
