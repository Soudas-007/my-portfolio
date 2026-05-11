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

  const springConfig = { stiffness: 120, damping: 20 };
  const headX = useSpring(mousePos.x * 6, springConfig);
  const headY = useSpring(mousePos.y * 6, springConfig);
  const eyeX = useSpring(mousePos.x * 2, springConfig);
  const eyeY = useSpring(mousePos.y * 2, springConfig);

  return (
    <div ref={characterRef} className="relative w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 select-none pointer-events-none">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <svg viewBox="0 0 240 320" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* SNEAKERS - HIGH FIDELITY */}
          <g id="sneakers">
            {/* Left */}
            <path d="M70 290 L60 305 Q60 315 75 315 H100 L105 290 Z" fill="#FFF" stroke="#000" strokeWidth="2.5" />
            <path d="M70 290 L65 305 H95 L100 290 Z" fill="#22D3EE" />
            <path d="M75 295 L90 305" stroke="#000" strokeWidth="1.5" /> {/* Laces */}
            <path d="M60 310 H105" stroke="#000" strokeWidth="1" strokeOpacity="0.3" /> {/* Sole line */}
            
            {/* Right */}
            <path d="M140 290 L130 305 Q130 315 145 315 H170 L175 290 Z" fill="#FFF" stroke="#000" strokeWidth="2.5" />
            <path d="M140 290 L135 305 H165 L170 290 Z" fill="#22D3EE" />
            <path d="M145 295 L160 305" stroke="#000" strokeWidth="1.5" />
            <path d="M130 310 H175" stroke="#000" strokeWidth="1" strokeOpacity="0.3" />
          </g>

          {/* PANTS - CARGO STRAPS */}
          <g id="pants">
            <path d="M75 230 L65 295 H105 L115 230 Z" fill="#262626" stroke="#000" strokeWidth="3" />
            <path d="M125 230 L135 295 H175 L165 230 Z" fill="#262626" stroke="#000" strokeWidth="3" />
            {/* Straps */}
            <path d="M68 250 L102 265" stroke="#000" strokeWidth="1.5" strokeDasharray="4 2" />
            <path d="M138 250 L172 265" stroke="#000" strokeWidth="1.5" strokeDasharray="4 2" />
            {/* Pockets */}
            <rect x="62" y="240" width="15" height="20" rx="2" fill="#1A1A1A" stroke="#000" strokeWidth="1.5" />
            <rect x="163" y="240" width="15" height="20" rx="2" fill="#1A1A1A" stroke="#000" strokeWidth="1.5" />
          </g>

          {/* JACKET - VEST OVER HOODIE */}
          <g id="jacket">
            <path d="M60 140 Q120 110 180 140 L195 230 H45 L60 140Z" fill="#1A1A1A" stroke="#000" strokeWidth="3.5" />
            {/* Vest Overlap */}
            <path d="M60 140 L85 140 V230 H60 Z" fill="#262626" stroke="#000" strokeWidth="2" />
            <path d="M180 140 L155 140 V230 H180 Z" fill="#262626" stroke="#000" strokeWidth="2" />
            {/* Cyan Zippers/Lines */}
            <path d="M90 150 V210" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" />
            <path d="M150 150 V210" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" />
            {/* Chest Pockets with flaps */}
            <rect x="75" y="160" width="22" height="28" rx="2" fill="#333" stroke="#000" strokeWidth="1.5" />
            <path d="M75 160 H97 L95 168 H77 Z" fill="#1A1A1A" stroke="#000" strokeWidth="1.5" />
            <rect x="143" y="160" width="22" height="28" rx="2" fill="#333" stroke="#000" strokeWidth="1.5" />
            <path d="M143 160 H165 L163 168 H145 Z" fill="#1A1A1A" stroke="#000" strokeWidth="1.5" />
          </g>

          {/* HEAD GROUP - HIGH DETAIL */}
          <motion.g style={{ x: headX, y: headY, originX: "120px", originY: "110px" }}>
            {/* Face */}
            <path d="M80 80 Q80 140 120 140 Q160 140 160 80 Q160 35 120 35 Q80 35 80 80Z" fill="#FFD1B3" stroke="#000" strokeWidth="3" />
            
            {/* Spiky Blue Hair - Multi-layered */}
            <path d="M80 60 L60 40 L95 55 L100 5 L120 35 L140 5 L150 55 L180 40 L160 70 Q180 110 160 130 L180 125 L160 145 Q120 150 80 145 L60 125 L80 130 Q55 110 80 60Z" fill="#5EEAD4" stroke="#000" strokeWidth="3" />
            <path d="M100 50 L110 30 M130 50 L125 30" stroke="#000" strokeWidth="1" strokeOpacity="0.4" /> {/* Hair detail */}

            {/* Glasses - Round Orange */}
            <circle cx="102" cy="95" r="16" stroke="#F97316" strokeWidth="6" fill="white" fillOpacity="0.1" />
            <circle cx="138" cy="95" r="16" stroke="#F97316" strokeWidth="6" fill="white" fillOpacity="0.1" />
            <path d="M118 95 H122" stroke="#F97316" strokeWidth="6" />

            {/* Eyes */}
            <motion.g style={{ x: eyeX, y: eyeY }}>
              <circle cx="102" cy="95" r="3.5" fill="#000" />
              <motion.circle cx="138" cy="95" r="3.5" fill="#000" animate={{ scaleY: isWinking ? 0.1 : 1 }} />
            </motion.g>

            {/* Mouth */}
            <path d="M112 120 Q120 125 128 120" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
          </motion.g>

          {/* ARMS & STYLUS */}
          <path d="M45 180 Q30 205 60 225" stroke="#1A1A1A" strokeWidth="12" strokeLinecap="round" />
          <motion.g animate={{ rotate: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ originX: "190px", originY: "185px" }}>
            <path d="M190 185 Q220 210 230 240" stroke="#1A1A1A" strokeWidth="12" strokeLinecap="round" />
            <rect x="225" y="235" width="16" height="16" rx="4" fill="#FFD1B3" stroke="#000" strokeWidth="2.5" />
            
            {/* STYLUS - GLOVING */}
            <motion.g animate={{ rotate: 12 }} style={{ originX: "233px", originY: "243px" }}>
              <rect x="230" y="180" width="8" height="55" rx="2" fill="#FFF" stroke="#000" strokeWidth="2.5" />
              <rect x="230" y="175" width="8" height="8" rx="1.5" fill="#22D3EE" />
              <motion.circle cx="234" cy="173" r="9" fill="#22D3EE" animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0.8, 0.3], filter: ["blur(4px)", "blur(12px)", "blur(4px)"] }} transition={{ duration: 1.5, repeat: Infinity }} />
            </motion.g>
          </motion.g>
        </svg>

        {/* Dynamic Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div key={i} className="absolute w-2 h-2 bg-[#22D3EE]" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0], x: [120, Math.random() * 160 - 80], y: [-100, Math.random() * -200 - 50], scale: [0, 1.2, 0], rotate: [0, 90, 180] }} transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay: i * 0.4 }} style={{ right: "8%", top: "45%" }} />
        ))}
      </motion.div>
    </div>
  );
}
