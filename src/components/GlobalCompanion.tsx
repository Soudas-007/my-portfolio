"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PixelCharacter from "./PixelCharacter";

type SectionId = "home" | "work" | "about" | "toolbox" | "contact";

interface MascotState {
  x: string | number;
  y: string | number;
  scale: number;
  rotation: number;
  speech: string | null;
}

const sectionConfigs: Record<SectionId, MascotState> = {
  home: {
    x: "85%",
    y: "65%",
    scale: 0.7,
    rotation: 0,
    speech: "Welcome 👋",
  },
  work: {
    x: "90%",
    y: "20%",
    scale: 0.55,
    rotation: -5,
    speech: "This one was fun ✨",
  },
  about: {
    x: "10%",
    y: "40%",
    scale: 0.65,
    rotation: 5,
    speech: "Inspecting... 🔍",
  },
  toolbox: {
    x: "88%",
    y: "50%",
    scale: 0.6,
    rotation: -2,
    speech: "Powering up ⚡",
  },
  contact: {
    x: "75%",
    y: "75%",
    scale: 0.75,
    rotation: 0,
    speech: "Let's magic! 🚀",
  },
};

const mobileOverrides: Partial<Record<SectionId, Partial<MascotState>>> = {
  home: { x: "50%", y: "85%", scale: 0.5 },
  work: { x: "85%", y: "5%", scale: 0.4 },
  about: { x: "50%", y: "90%", scale: 0.45 },
  toolbox: { x: "85%", y: "10%", scale: 0.45 },
  contact: { x: "50%", y: "85%", scale: 0.55 },
};

export default function GlobalCompanion() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [showSpeech, setShowSpeech] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const sections: SectionId[] = ["home", "work", "about", "toolbox", "contact"];
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
    };
  }, []);

  const baseConfig = sectionConfigs[activeSection];
  const override = isMobile ? mobileOverrides[activeSection] : {};
  const config = { ...baseConfig, ...override };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {hasEntered && (
          <motion.div
            key="companion"
            initial={{ opacity: 0, scale: 0.2, x: isMobile ? "50%" : "90%", y: "100%" }}
            animate={{
              opacity: 0.8, // Slightly more subtle as it's in background
              scale: config.scale,
              x: config.x,
              y: config.y,
              rotate: config.rotation,
              translateX: isMobile ? "-50%" : "0%",
            }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 20,
              mass: 1.5,
            }}
            className="absolute pointer-events-none" // Ensure it never blocks interactions
            style={{ width: "fit-content", height: "fit-content" }}
          >
            <div className="relative group flex flex-col items-center">
              <PixelCharacter />

              {/* Contextual Speech Bubble - stays slightly above background */}
              <AnimatePresence>
                {showSpeech && config.speech && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 backdrop-blur-sm border-2 border-primary px-4 py-2 rounded-xl shadow-[4px_4px_0px_var(--color-primary)] z-10"
                  >
                    <p className="text-[10px] font-bold font-pixel text-primary uppercase tracking-tight">
                      {config.speech}
                    </p>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/90 border-r-2 border-b-2 border-primary rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Soft Shadow */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-black/5 rounded-full blur-md" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
