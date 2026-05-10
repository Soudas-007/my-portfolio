"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  const [particles, setParticles] = useState<{ top: string; left: string; delay: number; duration: number; xMove: number }[]>([]);

  useEffect(() => {
    requestAnimationFrame(() => {
      setParticles([...Array(15)].map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 3,
        duration: 8 + Math.random() * 5,
        xMove: (Math.random() - 0.5) * 30
      })));
    });
  }, []);

  const skills = [
    { name: "Figma", color: "var(--color-accent-blue)" },
    { name: "UI Design", color: "var(--color-accent-green)" },
    { name: "Prototyping", color: "var(--color-accent-yellow)" },
    { name: "Wireframing", color: "var(--color-accent-red)" },
    { name: "Aseprite", color: "var(--color-accent-blue)" },
    { name: "User Research", color: "var(--color-accent-green)" }
  ];

  return (
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p, i) => (
          <motion.div
            key={`ambient-${i}`}
            animate={{ 
              y: [0, -50, 0], 
              x: [0, p.xMove, 0],
              opacity: [0.2, 0.6, 0.2] 
            }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
            className="absolute w-1.5 h-1.5 bg-primary/20 rounded-full"
            style={{
              top: p.top,
              left: p.left
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center z-10 relative">
        
        {/* Left Side: The "Desk" (Interactive Visuals) */}
        <div className="w-full lg:w-1/2 relative h-[500px] flex items-center justify-center">
          
          {/* Main Monitor */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="relative z-20 w-80 h-56 bg-surface border-4 border-primary rounded-xl shadow-[8px_8px_0px_var(--color-primary)] flex flex-col p-2 cursor-pointer group"
          >
            {/* Screen */}
            <div className="w-full h-full bg-[#1A1A1A] rounded-lg border-2 border-primary overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-4 bg-primary/20 flex gap-1 items-center px-2">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              <motion.div 
                animate={{ opacity: [1, 1, 0, 1] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 1] }}
                className="mt-8 px-4 font-pixel text-[#4AF626] text-sm"
              >
                {">"} Loading Resume...<br/>
                <motion.span 
                  animate={{ opacity: [0, 1, 0] }} 
                  transition={{ duration: 1, repeat: Infinity }}
                >_</motion.span>
              </motion.div>
            </div>
            {/* Stand */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-8 bg-surface border-x-4 border-primary z-0" />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-4 bg-surface border-4 border-primary rounded-t-lg z-10 shadow-[4px_4px_0px_var(--color-primary)]" />
          </motion.div>

          {/* Swinging Lamp */}
          <motion.div
            animate={{ rotateZ: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top center" }}
            className="absolute top-10 left-10 w-24 h-32 z-30 pointer-events-none"
          >
            {/* Cord */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-primary" />
            {/* Shade */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-10 bg-[var(--color-accent-yellow)] border-4 border-primary rounded-t-full z-10" />
            {/* Light Cone */}
            <motion.div 
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-b from-yellow-200/50 to-transparent blur-md" 
            />
          </motion.div>

          {/* Coffee Mug with Animated Steam */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="absolute bottom-20 right-10 w-12 h-14 bg-[var(--color-accent-red)] border-4 border-primary rounded-b-lg rounded-t-sm z-30 shadow-[4px_4px_0px_var(--color-primary)] flex justify-end cursor-pointer"
          >
            <div className="w-4 h-6 border-4 border-l-0 border-primary rounded-r-lg mt-2 -mr-3" />
            {/* Steam */}
            <motion.div 
              animate={{ y: [-5, -20], x: [0, 5, -5, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 left-2 text-gray-400 text-lg"
            >♨️</motion.div>
          </motion.div>

          {/* Flipping Sticky Notes */}
          <motion.div
            whileHover={{ scale: 1.1, rotateX: 180 }}
            className="absolute top-24 right-20 w-16 h-16 bg-[var(--color-accent-green)] border-2 border-primary shadow-[2px_2px_0px_var(--color-primary)] rotate-12 flex items-center justify-center p-2 text-xs font-bold text-center cursor-pointer transform-style-3d"
          >
            <div style={{ transform: "rotateX(0deg) translateZ(1px)" }}>Call Mom</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1, rotateX: 180 }}
            className="absolute top-40 right-10 w-16 h-16 bg-[var(--color-accent-yellow)] border-2 border-primary shadow-[2px_2px_0px_var(--color-primary)] -rotate-6 flex items-center justify-center p-2 text-xs font-bold text-center cursor-pointer transform-style-3d"
          >
            <div style={{ transform: "rotateX(0deg) translateZ(1px)" }}>Review PR</div>
          </motion.div>
        </div>

        {/* Right Side: Content & Skills */}
        <div className="w-full lg:w-1/2">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-pixel text-4xl md:text-5xl text-primary mb-6"
          >
            THE DESIGNER BEHIND THE PIXELS
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-semibold text-lg leading-relaxed mb-8"
          >
            I&apos;m a UI/UX Designer who believes digital products shouldn&apos;t just be usable—they should be memorable. By blending modern product design with playful, nostalgic aesthetics, I create experiences that make people smile while driving real business value.
          </motion.p>

          {/* Skills Grid */}
          <div className="flex flex-wrap gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  boxShadow: `0px 0px 15px ${skill.color}, 4px 4px 0px var(--color-primary)`
                }}
                animate={{ y: [0, -3, 0] }}
                transition={{
                  delay: index * 0.1,
                  y: { duration: 2 + index * 0.3, repeat: Infinity, repeatType: "mirror" }
                }}
                className="px-4 py-2 bg-white border-2 border-primary rounded-full font-bold text-primary shadow-[4px_4px_0px_var(--color-primary)] cursor-pointer relative group"
              >
                {skill.name}
                {/* Tiny Particle Burst on Hover */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 1 }}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--color-accent-yellow)] rounded-full border border-primary z-[-1] transition-transform duration-200"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
