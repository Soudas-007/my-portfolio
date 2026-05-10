"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [stars, setStars] = useState<{ top: string; left: string; width: string; height: string; delay: number; duration: number }[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const skylineY = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const moonY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  useEffect(() => {
    // Generate random stars only on the client side to avoid hydration mismatch
    const generatedStars = [...Array(30)].map(() => ({
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 4 + 2}px`,
      height: `${Math.random() * 4 + 2}px`,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <section ref={containerRef} className="relative py-40 px-6 bg-[var(--color-primary)] text-white overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
      
      {/* Night Scene Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Pixel Moon with Parallax & Pulse */}
        <motion.div
          style={{ y: moonY }}
          animate={{ 
            boxShadow: [
              "0px 0px 20px rgba(255, 249, 240, 0.5)", 
              "0px 0px 60px rgba(255, 249, 240, 0.8)", 
              "0px 0px 20px rgba(255, 249, 240, 0.5)"
            ] 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[15%] w-32 h-32 bg-[#FFF9F0] rounded-full opacity-90 blur-[2px]"
        >
          {/* Craters */}
          <div className="absolute top-8 left-6 w-6 h-6 bg-[#E0D8C8] rounded-full opacity-60" />
          <div className="absolute bottom-6 right-8 w-8 h-8 bg-[#E0D8C8] rounded-full opacity-60" />
          <div className="absolute top-12 right-10 w-4 h-4 bg-[#E0D8C8] rounded-full opacity-60" />
        </motion.div>

        {/* Moving Night Clouds */}
        <motion.div
          animate={{ x: [0, -100, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-32 right-1/4 w-40 h-12 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ x: [0, 150, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-48 left-1/4 w-60 h-16 bg-white/5 rounded-full blur-2xl"
        />

        {/* Twinkling & Drifting Stars */}
        {stars.map((star, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.1, 1, 0.1],
              x: [0, i % 2 === 0 ? 10 : -10, 0] 
            }}
            transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
            className="absolute bg-white rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: star.width,
              height: star.height,
            }}
          />
        ))}

        {/* Parallax Skyline Silhouette */}
        <motion.div 
          style={{ y: skylineY }}
          className="absolute bottom-0 left-0 w-full h-32 flex items-end opacity-20"
        >
          <div className="w-[10%] h-[60%] bg-white mx-[2%]" />
          <div className="w-[15%] h-[90%] bg-white mx-[1%]" />
          <div className="w-[8%] h-[40%] bg-white mx-[3%]" />
          <div className="w-[20%] h-[100%] bg-white mx-[2%]" />
          <div className="w-[12%] h-[70%] bg-white mx-[1%]" />
          <div className="w-[25%] h-[50%] bg-white mx-[2%]" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-24 h-24 mb-8 bg-[var(--color-accent-blue)] border-4 border-white rounded-2xl flex items-center justify-center shadow-[6px_6px_0px_#1A1A1A] transform -rotate-6"
        >
          <span className="text-5xl">👾</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-pixel text-5xl md:text-7xl font-bold mb-6 drop-shadow-[4px_4px_0px_#1A1A1A]"
        >
          LET'S WORK TOGETHER
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed font-semibold"
        >
          Have a playful project in mind? Looking for a designer who codes? 
          Drop me a message and let's create something memorable.
        </motion.p>
        
        <motion.button
          whileHover={{ 
            scale: 1.05, 
            y: -5, 
            boxShadow: "0px 0px 30px var(--color-accent-yellow)",
            borderColor: "var(--color-accent-yellow)"
          }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-5 bg-[var(--color-accent-yellow)] text-primary font-bold font-pixel text-2xl border-4 border-white rounded-xl shadow-[6px_6px_0px_#1A1A1A] transition-all flex items-center gap-3 relative group overflow-hidden"
        >
          <span>Send Message</span> <span className="text-3xl group-hover:translate-x-2 transition-transform">🚀</span>
          
          {/* Sparkles on hover */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.div 
              animate={{ y: [-10, -30], x: [0, 10], opacity: [1, 0] }} 
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute top-2 left-4 w-2 h-2 bg-white rounded-full" 
            />
            <motion.div 
              animate={{ y: [-10, -40], x: [0, -15], opacity: [1, 0] }} 
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
              className="absolute top-4 right-8 w-1.5 h-1.5 bg-white rounded-full" 
            />
          </div>
        </motion.button>
      </div>

      <div className="absolute bottom-6 text-sm text-gray-400 font-semibold z-10">
        <p>© {new Date().getFullYear()} Soudas Sur. Designed with ♥ & Pixels.</p>
      </div>
    </section>
  );
}
