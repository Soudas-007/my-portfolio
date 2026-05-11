"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function PixelCharacter() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isWinking, setIsWinking] = useState(false);
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
    const blinkInterval = setInterval(() => {
      setIsWinking(true);
      setTimeout(() => setIsWinking(false), 150);
    }, 4000);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(blinkInterval);
    };
  }, []);

  const springConfig = { stiffness: 150, damping: 15 };
  const headX = useSpring(mousePos.x * 6, springConfig);
  const headY = useSpring(mousePos.y * 6, springConfig);
  const eyeX = useSpring(mousePos.x * 2.5, springConfig);
  const eyeY = useSpring(mousePos.y * 2.5, springConfig);

  return (
    <div ref={characterRef} className="relative w-32 h-40 md:w-40 md:h-48 lg:w-44 lg:h-56 select-none pointer-events-none">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <svg viewBox="0 0 240 320" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* SHOES */}
          <g id="shoes">
            <path d="M75 295 L65 310 H95 L100 295 Z" fill="#FFF" stroke="#000" strokeWidth="2" />
            <path d="M75 295 L70 305 H90 L95 295 Z" fill="#22D3EE" />
            <path d="M140 295 L130 310 H160 L165 295 Z" fill="#FFF" stroke="#000" strokeWidth="2" />
            <path d="M140 295 L135 305 H155 L160 295 Z" fill="#22D3EE" />
          </g>

          {/* LEGS */}
          <g id="legs">
            <path d="M80 230 L75 295 H105 L110 230 Z" fill="#1F1F1F" stroke="#000" strokeWidth="2" />
            <path d="M130 230 L135 295 H165 L160 230 Z" fill="#1F1F1F" stroke="#000" strokeWidth="2" />
            <rect x="73" y="245" width="12" height="15" rx="1" fill="#111" stroke="#000" strokeWidth="1" />
            <rect x="155" y="245" width="12" height="15" rx="1" fill="#111" stroke="#000" strokeWidth="1" />
          </g>

          {/* BODY - Techwear Jacket with Cyan Accents */}
          <g id="body">
            <path d="M65 140 Q120 120 175 140 L190 230 H50 L65 140Z" fill="#1A1A1A" stroke="#000" strokeWidth="3" />
            <path d="M100 150 V210" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
            <path d="M140 150 V210" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
            <rect x="78" y="160" width="18" height="22" rx="2" fill="#262626" stroke="#000" strokeWidth="1" />
            <rect x="144" y="160" width="18" height="22" rx="2" fill="#262626" stroke="#000" strokeWidth="1" />
          </g>

          {/* HEAD GROUP */}
          <motion.g style={{ x: headX, y: headY, originX: "120px", originY: "110px" }}>
            <path d="M85 80 Q85 135 120 135 Q155 135 155 80 Q155 40 120 40 Q85 40 85 80Z" fill="#FFD1B3" stroke="#000" strokeWidth="2.5" />
            
            {/* HAIR - Spiky Cyan/Blue */}
            <path d="M85 60 L70 40 L95 50 L100 10 L120 30 L140 10 L145 50 L170 40 L155 65 Q175 100 155 120 L170 115 L155 130 Q120 135 85 130 L70 115 L85 120 Q65 100 85 60Z" fill="#5EEAD4" stroke="#000" strokeWidth="2.5" />
            
            {/* GLASSES - Orange Round */}
            <circle cx="103" cy="90" r="14" stroke="#F97316" strokeWidth="5" fill="white" fillOpacity="0.1" />
            <circle cx="137" cy="90" r="14" stroke="#F97316" strokeWidth="5" fill="white" fillOpacity="0.1" />
            <path d="M117 90 H123" stroke="#F97316" strokeWidth="5" />

            {/* EYES */}
            <motion.g style={{ x: eyeX, y: eyeY }}>
              <circle cx="103" cy="90" r="3" fill="#000" />
              <motion.circle cx="137" cy="90" r="3" fill="#000" animate={{ scaleY: isWinking ? 0.1 : 1 }} />
            </motion.g>

            {/* MOUTH */}
            <path d="M115 115 Q120 120 125 115" stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </motion.g>

          {/* ARMS & STYLUS */}
          <path d="M50 180 Q35 200 55 220" stroke="#1A1A1A" strokeWidth="10" strokeLinecap="round" />
          <motion.g animate={{ rotate: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ originX: "185px", originY: "180px" }}>
            <path d="M185 180 Q210 200 220 230" stroke="#1A1A1A" strokeWidth="10" strokeLinecap="round" />
            <rect x="215" y="225" width="14" height="14" rx="3" fill="#FFD1B3" stroke="#000" strokeWidth="1.5" />
            
            {/* GLOWING STYLUS */}
            <motion.g animate={{ rotate: 15 }} style={{ originX: "222px", originY: "233px" }}>
              <rect x="218" y="180" width="7" height="45" rx="1.5" fill="#FFF" stroke="#000" strokeWidth="1.5" />
              <rect x="218" y="175" width="7" height="7" rx="1" fill="#22D3EE" />
              <motion.circle cx="221.5" cy="174" r="7" fill="#22D3EE" animate={{ scale: [1, 2, 1], opacity: [0.3, 0.7, 0.3], filter: ["blur(4px)", "blur(8px)", "blur(4px)"] }} transition={{ duration: 1.5, repeat: Infinity }} />
            </motion.g>
          </motion.g>
        </svg>

        {/* Particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div key={i} className="absolute w-1.5 h-1.5 bg-[#22D3EE]" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0], x: [110, Math.random() * 120 - 60], y: [-80, Math.random() * -140 - 40], scale: [0, 1, 0] }} transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: i * 0.5 }} style={{ right: "12%", top: "45%" }} />
        ))}
      </motion.div>
    </div>
  );
}
