"use client";

import { motion, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function PixelCharacter({ isWaving = false }: { isWaving?: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isWobbling, setIsWobbling] = useState(false);
  const characterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!characterRef.current) return;
      const rect = characterRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const nx = (e.clientX - centerX) / (window.innerWidth / 2);
      const ny = (e.clientY - centerY) / (window.innerHeight / 2);
      setMousePos({ x: nx, y: ny });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Random "wobble" or "lose balance" effect
    const wobbleInterval = setInterval(() => {
      if (Math.random() > 0.8 && !isWaving) {
        setIsWobbling(true);
        setTimeout(() => setIsWobbling(false), 1200);
      }
    }, 6000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(wobbleInterval);
    };
  }, [isWaving]);

  const springConfig = { stiffness: 120, damping: 20 };
  const charX = useSpring(mousePos.x * 25, springConfig);
  const charY = useSpring(mousePos.y * 15, springConfig);

  return (
    <div ref={characterRef} className="relative w-48 h-56 md:w-56 md:h-64 lg:w-64 lg:h-72 select-none pointer-events-none">
      <motion.div
        style={{ x: charX, y: charY }}
        animate={isWaving ? {
          rotate: [0, -5, 5, -5, 0],
          y: [0, -10, 0],
          scaleY: [1, 1.05, 1],
        } : isWobbling ? {
          rotate: [0, -12, 10, -6, 0],
          scaleY: [1, 0.85, 1.15, 0.9, 1],
        } : {
          y: [0, -12, 0],
          rotate: [-1.5, 1.5, -1.5],
          scaleY: [1, 1.02, 1],
        }}
        transition={{ 
          duration: isWaving ? 0.8 : isWobbling ? 1.2 : 5, 
          repeat: isWaving ? Infinity : isWobbling ? 0 : Infinity, 
          ease: "easeInOut" 
        }}
        className="relative w-full h-full flex items-center justify-center drop-shadow-[0_25px_50px_rgba(0,0,0,0.25)]"
      >
        <Image 
          src="/mascot.svg"
          alt="Mascot"
          width={426}
          height={500}
          className="w-full h-full object-contain"
          priority
        />
        
        {/* Interaction Elements */}
        <AnimatePresence>
          {isWaving && (
            <motion.div
              initial={{ opacity: 0, scale: 0, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 50, y: -20 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute top-0 right-0 text-3xl"
            >
              👋
            </motion.div>
          )}
          {isWobbling && !isWaving && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-4 right-4 text-xl"
            >
              💫
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
