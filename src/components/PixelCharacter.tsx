"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function PixelCharacter() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const characterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!characterRef.current) return;
      const rect = characterRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Normalized coordinates (-1 to 1)
      const nx = (e.clientX - centerX) / (window.innerWidth / 2);
      const ny = (e.clientY - centerY) / (window.innerHeight / 2);
      
      setMousePos({ x: nx, y: ny });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth springs for 'live' tracking
  const springConfig = { stiffness: 150, damping: 30 };
  const charX = useSpring(mousePos.x * 20, springConfig);
  const charY = useSpring(mousePos.y * 15, springConfig);

  return (
    <div ref={characterRef} className="relative w-48 h-56 md:w-56 md:h-64 lg:w-64 lg:h-72 select-none pointer-events-none">
      <motion.div
        style={{ x: charX, y: charY }}
        animate={{ 
          y: [0, -15, 0],
          rotate: [-1, 1, -1] 
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative w-full h-full flex items-center justify-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
      >
        <Image 
          src="/mascot.svg"
          alt="Mascot"
          width={426}
          height={500}
          className="w-full h-full object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}
