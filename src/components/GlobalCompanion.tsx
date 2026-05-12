"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import PixelCharacter from "./PixelCharacter";

type SectionId = "home" | "work" | "about" | "toolbox" | "contact" | "exp-card-1" | "exp-card-2" | "exp-card-3" | "ai-toolbox" | "about-visual";

interface MascotState {
  x: number; // percentage
  y: number; // percentage
  scale: number;
  rotation: number;
  speech: string | null;
}

const sectionConfigs: Record<SectionId, MascotState> = {
  home: { x: 18, y: 32, scale: 0.45, rotation: 0, speech: "Hey! 👋" },
  work: { x: 92, y: 15, scale: 0.35, rotation: -5, speech: "This one was fun ✨" },
  "exp-card-1": { x: 82, y: 35, scale: 0.32, rotation: 5, speech: "Intern life! 🖥️" },
  "exp-card-2": { x: 18, y: 50, scale: 0.32, rotation: -5, speech: "Organizing... 📁" },
  "exp-card-3": { x: 82, y: 65, scale: 0.32, rotation: 5, speech: "3D Magic ✨" },
  "about-visual": { x: 25, y: 35, scale: 0.38, rotation: 0, speech: "Comfy! 💻" },
  about: { x: 8, y: 45, scale: 0.4, rotation: 5, speech: "The Designer 🔍" },
  toolbox: { x: 90, y: 55, scale: 0.38, rotation: -2, speech: "Powering up ⚡" },
  "ai-toolbox": { x: 10, y: 65, scale: 0.38, rotation: 2, speech: "AI Magic 🤖" },
  contact: { x: 80, y: 80, scale: 0.48, rotation: 0, speech: "Let's magic! 🚀" },
};

const mobileOverrides: Partial<Record<SectionId, Partial<MascotState>>> = {
  home: { x: 15, y: 88, scale: 0.3 },
  work: { x: 88, y: 8, scale: 0.25 },
  "exp-card-1": { x: 85, y: 40, scale: 0.22 },
  "exp-card-2": { x: 15, y: 55, scale: 0.22 },
  "exp-card-3": { x: 85, y: 70, scale: 0.22 },
  "about-visual": { x: 50, y: 40, scale: 0.28 },
  about: { x: 50, y: 92, scale: 0.28 },
  toolbox: { x: 88, y: 12, scale: 0.28 },
  "ai-toolbox": { x: 12, y: 15, scale: 0.28 },
  contact: { x: 50, y: 88, scale: 0.35 },
};

export default function GlobalCompanion() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [showSpeech, setShowSpeech] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const scrollY = useMotionValue(0);

  // Physics-based motion values
  const targetX = useMotionValue(18);
  const targetY = useMotionValue(32);
  const mascotX = useSpring(targetX, { stiffness: 40, damping: 15, mass: 1.2 });
  const mascotY = useSpring(targetY, { stiffness: 40, damping: 15, mass: 1.2 });
  const mascotScale = useSpring(0.45, { stiffness: 100, damping: 20 });
  const mascotRotate = useSpring(0, { stiffness: 100, damping: 20 });

  // Move transforms to top level to avoid hook rules violation
  const leftPos = useTransform(mascotX, (v) => `${v}%`);
  const topPos = useTransform(mascotY, (v) => `${v}%`);

  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleWave = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setIsWaving(customEvent.detail);
    };
    window.addEventListener("mascot-wave", handleWave as EventListener);

    const sections: SectionId[] = [
      "home", "work", "exp-card-1", "exp-card-2", "exp-card-3", 
      "about-visual", "about", "toolbox", "ai-toolbox", "contact"
    ];
    
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setActiveSection(id);
            setShowSpeech(true);
            const timer = setTimeout(() => setShowSpeech(false), 3500);
            return () => clearTimeout(timer);
          }
        },
        { threshold: 0.25 }
      );

      observer.observe(el);
      return observer;
    });

    setTimeout(() => setHasEntered(true), 1200);

    return () => {
      observers.forEach((o) => o?.disconnect());
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mascot-wave", handleWave);
    };
  }, [scrollY]);

  // Update target positions with physics
  useEffect(() => {
    const baseConfig = sectionConfigs[activeSection];
    const override = isMobile ? mobileOverrides[activeSection] : {};
    const config = { ...baseConfig, ...override };

    targetX.set(config.x);
    targetY.set(config.y);
    mascotScale.set(config.scale);
    mascotRotate.set(config.rotation);
  }, [activeSection, isMobile, targetX, targetY, mascotScale, mascotRotate]);

  return (
    <div className="fixed inset-0 z-5 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {hasEntered && (
          <motion.div
            key="companion"
            style={{
              left: leftPos,
              top: topPos,
              scale: mascotScale,
              rotate: mascotRotate,
              translateX: isMobile ? "-50%" : "0%",
              translateY: "-50%",
            }}
            className="absolute pointer-events-none"
          >
            <div className="relative group flex flex-col items-center">
              <PixelCharacter isWaving={isWaving} />

              {/* Contextual Speech Bubble */}
              <AnimatePresence>
                {showSpeech && sectionConfigs[activeSection].speech && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.7 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.7 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute -top-20 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white border-3 border-primary px-5 py-2.5 rounded-2xl shadow-[5px_5px_0px_var(--color-primary)] z-10"
                  >
                    <p className="text-[10px] font-bold font-pixel text-primary uppercase tracking-wider">
                      {sectionConfigs[activeSection].speech}
                    </p>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-3 border-b-3 border-primary rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Dynamic Physics Shadow */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.15, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full blur-xl pointer-events-none" 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
