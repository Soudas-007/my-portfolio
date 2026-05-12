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
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-[-1] bg-background" />
      <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-center z-10 relative">
        {/* Left: Desk Visual - Smaller scale */}
        <div 
          className="w-full lg:w-1/2 relative h-[200px] sm:h-[300px] flex items-center justify-center cursor-pointer"
          onMouseEnter={() => window.dispatchEvent(new CustomEvent("mascot-wave", { detail: true }))}
          onMouseLeave={() => window.dispatchEvent(new CustomEvent("mascot-wave", { detail: false }))}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-20 w-44 sm:w-60 md:w-64 lg:w-[320px] h-32 sm:h-44 md:h-48 lg:h-[220px] bg-surface border-3 border-primary rounded-xl shadow-[5px_5px_0px_var(--color-primary)] flex flex-col p-1 transition-all hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_var(--color-primary)]"
          >
            <div className="w-full h-full bg-[#1A1A1A] rounded-lg border-2 border-primary overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-3 bg-[#2a2a2a] flex gap-1 items-center px-1.5 z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" /><div className="w-1.5 h-1.5 rounded-full bg-yellow-400" /><div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              </div>
              <div className="absolute inset-0 mt-3 flex items-center justify-center">
                <Image src="/designer.png" alt="Designer" fill className="object-contain p-2 pixelated" priority />
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-4 bg-surface border-x-2 border-primary z-0" />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-2.5 bg-surface border-2 border-primary rounded-t-lg z-10" />
          </motion.div>
          {/* Smaller accessories */}
          <div className="absolute bottom-6 right-2 sm:right-10 w-5 sm:w-8 h-6 sm:h-10 bg-[var(--color-accent-red)] border-2 border-primary rounded-b-lg z-30" />
        </div>

        {/* Right: Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-pixel text-fluid-h2 text-primary mb-3">About me</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-secondary font-semibold text-[10px] sm:text-xs md:text-sm lg:text-base leading-relaxed mb-5">
            I&apos;m a UI/UX Designer who believes digital products shouldn&apos;t just be usable—they should be memorable. By blending modern product design with playful aesthetics.
          </motion.p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            {skills.map((skill, i) => (
              <motion.div key={i} whileHover={{ y: -1 }} className="px-2 py-1 bg-white border-2 border-primary rounded-full font-bold text-primary text-[8px] sm:text-[10px] shadow-[2px_2px_0px_var(--color-primary)]">
                {skill.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
