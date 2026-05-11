"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function PixelCharacter() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isWinking, setIsWinking] = useState(false);
  const characterRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for eyes and head tilt
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

    // Random looking around
    const lookInterval = setInterval(() => {
      const isMoving = Math.random() > 0.5;
      if (!isMoving) return;
      setMousePos({ x: Math.random() * 0.4 - 0.2, y: Math.random() * 0.4 - 0.2 });
    }, 3000);

    const blinkInterval = setInterval(() => {
      setIsWinking(true);
      setTimeout(() => setIsWinking(false), 150);
    }, 4000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(lookInterval);
      clearInterval(blinkInterval);
    };
  }, []);

  // Spring animations for smooth tracking
  const springConfig = { stiffness: 150, damping: 15 };
  const headX = useSpring(mousePos.x * 10, springConfig);
  const headY = useSpring(mousePos.y * 10, springConfig);
  const eyeX = useSpring(mousePos.x * 4, springConfig);
  const eyeY = useSpring(mousePos.y * 4, springConfig);

  return (
    <div ref={characterRef} className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 select-none pointer-events-none">
      {/* Background Aura */}
      <div className="absolute inset-0 bg-[var(--color-accent-blue)]/5 rounded-full blur-3xl" />

      {/* Main Character Group */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full h-full flex items-center justify-center pointer-events-auto cursor-pointer"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* BODY / HOODIE */}
          <path
            d="M60 160 Q100 140 140 160 L150 200 H50 L60 160Z"
            fill="#1A1A1A"
            stroke="#000"
            strokeWidth="3"
          />
          <path d="M90 155 L85 180" stroke="#FFF" strokeWidth="2" strokeOpacity="0.3" />
          <path d="M110 155 L115 180" stroke="#FFF" strokeWidth="2" strokeOpacity="0.3" />

          {/* NECK */}
          <rect x="92" y="145" width="16" height="10" fill="#FFD1B3" stroke="#000" strokeWidth="2" />

          {/* HEAD GROUP - TILTS */}
          <motion.g style={{ x: headX, y: headY, originX: "100px", originY: "120px" }}>
            {/* FACE SHAPE */}
            <path
              d="M70 100 Q70 145 100 145 Q130 145 130 100 Q130 65 100 65 Q70 65 70 100Z"
              fill="#FFD1B3"
              stroke="#000"
              strokeWidth="3"
            />

            {/* HAIR - Spiky Blue (Pixel style) */}
            <path
              d="M70 75 L60 60 L80 65 L85 40 L100 55 L115 40 L120 65 L140 60 L130 75 Q135 100 130 110 L140 105 L130 120 Q100 125 70 120 L60 105 L70 110 Q65 100 70 75Z"
              fill="#5EEAD4"
              stroke="#000"
              strokeWidth="3"
            />
            
            {/* EARS */}
            <circle cx="68" cy="105" r="6" fill="#FFD1B3" stroke="#000" strokeWidth="2" />
            <circle cx="132" cy="105" r="6" fill="#FFD1B3" stroke="#000" strokeWidth="2" />
            <circle cx="68" cy="108" r="1.5" fill="#000" /> {/* Piercing */}

            {/* GLASSES - Orange Round */}
            <circle cx="85" cy="105" r="15" stroke="#F97316" strokeWidth="4" fill="white" fillOpacity="0.1" />
            <circle cx="115" cy="105" r="15" stroke="#F97316" strokeWidth="4" fill="white" fillOpacity="0.1" />
            <path d="M100 105 H110" stroke="#F97316" strokeWidth="4" />

            {/* EYES - Tracking */}
            <motion.g style={{ x: eyeX, y: eyeY }}>
              <circle cx="85" cy="105" r="3" fill="#000" />
              <motion.circle 
                cx="115" cy="105" r="3" fill="#000" 
                animate={{ scaleY: isWinking ? 0.1 : 1 }}
              />
            </motion.g>

            {/* MOUTH */}
            <path d="M92 130 Q100 135 108 130" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
          </motion.g>

          {/* ARM HOLDING STYLUS */}
          <motion.g
            animate={{ rotate: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ originX: "60px", originY: "170px" }}
          >
            <path d="M55 170 Q40 160 30 130" stroke="#1A1A1A" strokeWidth="12" strokeLinecap="round" />
            <rect x="22" y="120" width="16" height="16" rx="4" fill="#FFD1B3" stroke="#000" strokeWidth="2" /> {/* Hand */}
            
            {/* STYLUS */}
            <motion.g style={{ originX: "30px", originY: "130px" }} animate={{ rotate: 15 }}>
              <rect x="26" y="80" width="8" height="45" rx="2" fill="#FFF" stroke="#000" strokeWidth="2" />
              <rect x="26" y="75" width="8" height="8" rx="1" fill="#22D3EE" /> {/* Tip */}
              
              {/* Glow Effect */}
              <motion.circle
                cx="30" cy="79" r="6"
                fill="#22D3EE"
                animate={{ 
                  scale: [1, 2, 1], 
                  opacity: [0.4, 0.9, 0.4],
                  filter: ["blur(4px)", "blur(8px)", "blur(4px)"]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.g>
          </motion.g>
        </svg>

        {/* Floating "Pixels" (Particles) from Stylus */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[var(--color-accent-blue)]"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              x: [20, Math.random() * 100 - 50],
              y: [-100, Math.random() * -200 - 50],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{ left: "20%", top: "30%" }}
          />
        ))}
      </motion.div>

      {/* Interaction Speech Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        whileHover={{ opacity: 1, scale: 1, y: 0 }}
        className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white border-2 border-primary px-4 py-2 rounded-xl shadow-[4px_4px_0px_var(--color-primary)] pointer-events-none"
      >
        <p className="text-[10px] font-bold font-pixel">Designing magic! ✨</p>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-primary rotate-45" />
      </motion.div>
    </div>
  );
}
