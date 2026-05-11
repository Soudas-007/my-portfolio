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
  const headX = useSpring(mousePos.x * 8, springConfig);
  const headY = useSpring(mousePos.y * 8, springConfig);
  const eyeX = useSpring(mousePos.x * 3, springConfig);
  const eyeY = useSpring(mousePos.y * 3, springConfig);

  return (
    <div ref={characterRef} className="relative w-32 h-40 md:w-40 md:h-48 lg:w-48 lg:h-56 select-none pointer-events-none">
      {/* Background Aura */}
      <div className="absolute inset-0 bg-[var(--color-accent-blue)]/5 rounded-full blur-3xl" />

      {/* Main Character Group */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.05, y: -20 }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <svg
          viewBox="0 0 240 320"
          className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SNEAKERS - Cyan/White/Black */}
          <g id="shoes">
            {/* Left Shoe */}
            <path d="M75 295 L65 310 H95 L100 295 Z" fill="#FFF" stroke="#000" strokeWidth="2" />
            <path d="M75 295 L70 305 H90 L95 295 Z" fill="#22D3EE" />
            <path d="M75 302 L85 302" stroke="#000" strokeWidth="1" /> {/* Laces */}
            
            {/* Right Shoe */}
            <path d="M140 295 L130 310 H160 L165 295 Z" fill="#FFF" stroke="#000" strokeWidth="2" />
            <path d="M140 295 L135 305 H155 L160 295 Z" fill="#22D3EE" />
            <path d="M140 302 L150 302" stroke="#000" strokeWidth="1" />
          </g>

          {/* LEGS - Techwear Cargo Pants */}
          <g id="legs">
            {/* Left Leg */}
            <path d="M80 230 L75 295 H105 L110 230 Z" fill="#262626" stroke="#000" strokeWidth="2" />
            <rect x="73" y="245" width="14" height="18" rx="2" fill="#1A1A1A" stroke="#000" strokeWidth="1.5" /> {/* Pocket */}
            <path d="M73 263 L107 263" stroke="#000" strokeWidth="1" strokeDasharray="2 2" /> {/* Strap */}
            
            {/* Right Leg */}
            <path d="M130 230 L135 295 H165 L160 230 Z" fill="#262626" stroke="#000" strokeWidth="2" />
            <rect x="153" y="245" width="14" height="18" rx="2" fill="#1A1A1A" stroke="#000" strokeWidth="1.5" />
            <path d="M133 263 L167 263" stroke="#000" strokeWidth="1" strokeDasharray="2 2" />
          </g>

          {/* TORSO - Techwear Hoodie/Jacket */}
          <g id="torso">
            <path
              d="M70 140 Q120 115 170 140 L185 230 H55 L70 140Z"
              fill="#1A1A1A"
              stroke="#000"
              strokeWidth="3"
            />
            {/* Cyan Accents */}
            <path d="M100 150 L100 220" stroke="#22D3EE" strokeWidth="2.5" strokeOpacity="0.7" />
            <path d="M140 150 L140 220" stroke="#22D3EE" strokeWidth="2.5" strokeOpacity="0.7" />
            
            {/* Chest Pockets */}
            <rect x="78" y="155" width="20" height="25" rx="2" fill="#262626" stroke="#000" strokeWidth="1.5" />
            <rect x="142" y="155" width="20" height="25" rx="2" fill="#262626" stroke="#000" strokeWidth="1.5" />
            
            {/* Hoodie Strings */}
            <circle cx="115" cy="140" r="2" fill="#FFF" />
            <circle cx="125" cy="140" r="2" fill="#FFF" />
          </g>

          {/* HEAD GROUP - TILTS */}
          <motion.g style={{ x: headX, y: headY, originX: "120px", originY: "110px" }}>
            {/* FACE SHAPE */}
            <path
              d="M85 80 Q85 135 120 135 Q155 135 155 80 Q155 40 120 40 Q85 40 85 80Z"
              fill="#FFD1B3"
              stroke="#000"
              strokeWidth="2.5"
            />

            {/* HAIR - Spiky Blue (Match Reference) */}
            <path
              d="M85 60 L70 45 L95 50 L100 10 L120 30 L140 10 L145 50 L170 45 L155 65 Q170 100 155 115 L170 110 L155 125 Q120 130 85 125 L70 110 L85 115 Q70 100 85 60Z"
              fill="#5EEAD4"
              stroke="#000"
              strokeWidth="2.5"
            />
            
            {/* GLASSES - Bold Orange Round */}
            <circle cx="103" cy="90" r="15" stroke="#F97316" strokeWidth="5" fill="white" fillOpacity="0.1" />
            <circle cx="137" cy="90" r="15" stroke="#F97316" strokeWidth="5" fill="white" fillOpacity="0.1" />
            <path d="M118 90 H122" stroke="#F97316" strokeWidth="5" />

            {/* EYES - Tracking */}
            <motion.g style={{ x: eyeX, y: eyeY }}>
              <circle cx="103" cy="90" r="3.5" fill="#000" />
              <motion.circle 
                cx="137" cy="90" r="3.5" fill="#000" 
                animate={{ scaleY: isWinking ? 0.1 : 1 }}
              />
            </motion.g>

            {/* MOUTH */}
            <path d="M112 115 Q120 120 128 115" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
          </motion.g>

          {/* LEFT ARM (Tucked in pocket) */}
          <path d="M60 180 Q45 200 65 220" stroke="#1A1A1A" strokeWidth="12" strokeLinecap="round" />

          {/* RIGHT ARM HOLDING STYLUS */}
          <motion.g
            animate={{ rotate: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ originX: "180px", originY: "170px" }}
          >
            <path d="M180 170 Q205 190 215 220" stroke="#1A1A1A" strokeWidth="12" strokeLinecap="round" />
            <rect x="208" y="215" width="16" height="16" rx="4" fill="#FFD1B3" stroke="#000" strokeWidth="2" />
            
            {/* STYLUS (Glowing Cyan) */}
            <motion.g style={{ originX: "216px", originY: "223px" }} animate={{ rotate: 15 }}>
              <rect x="212" y="170" width="8" height="50" rx="2" fill="#FFF" stroke="#000" strokeWidth="2" />
              <rect x="212" y="165" width="8" height="8" rx="1" fill="#22D3EE" />
              <motion.circle
                cx="216" cy="164" r="8"
                fill="#22D3EE"
                animate={{ 
                  scale: [1, 2.5, 1], 
                  opacity: [0.3, 0.8, 0.3],
                  filter: ["blur(4px)", "blur(10px)", "blur(4px)"]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.g>
          </motion.g>
        </svg>

        {/* Floating Particles from Stylus */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#22D3EE]"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              x: [120, Math.random() * 150 - 75],
              y: [-100, Math.random() * -200 - 50],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: 2.5 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{ right: "10%", top: "40%" }}
          />
        ))}
      </motion.div>
    </div>
  );
}
