"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; type: 'click' | 'trail'; offsetX?: number; offsetY?: number }[]>([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const lastTrailPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);

      // Trailing particle logic
      const dist = Math.hypot(e.clientX - lastTrailPos.current.x, e.clientY - lastTrailPos.current.y);
      if (dist > 40) {
        setParticles((prev) => [
          ...prev.slice(-15), // keep array small
          { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY, type: 'trail' }
        ]);
        lastTrailPos.current = { x: e.clientX, y: e.clientY };
      }

      // Detect hover on interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = window.getComputedStyle(target).cursor === 'pointer' ||
        target.closest('button, a, input, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      // Click burst
      const burst = Array.from({ length: 5 }).map((_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        type: 'click' as const,
        offsetX: (Math.random() - 0.5) * 80,
        offsetY: (Math.random() - 0.5) * 80 - 40,
      }));
      setParticles((prev) => [...prev, ...burst]);
    };

    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  // Clean up particles automatically
  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles((prev) => prev.slice(1));
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [particles]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden hidden md:block">
      {/* Main Cursor */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          rotate: isClicking ? 15 : isHovering ? 45 : 0,
          boxShadow: isHovering
            ? "0px 0px 15px var(--color-accent-blue), 2px 2px 0px var(--color-primary)"
            : "2px 2px 0px var(--color-primary)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed top-0 left-0 w-6 h-6 bg-[var(--color-accent-blue)] border-2 border-primary rounded-md flex items-center justify-center mix-blend-difference"
      >
        <div className="w-1.5 h-1.5 bg-white rounded-sm" />
      </motion.div>

      {/* Particles */}
      {particles.map((p) => {
        if (p.type === 'click') {
          return (
            <motion.div
              key={p.id}
              initial={{ x: p.x, y: p.y, opacity: 1, scale: 0 }}
              animate={{
                x: p.x + (p.offsetX || 0),
                y: p.y + (p.offsetY || 0),
                opacity: 0,
                scale: 1.5,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="fixed top-0 left-0 w-3 h-3 bg-[var(--color-accent-yellow)] border border-primary shadow-[1px_1px_0px_var(--color-primary)]"
            />
          );
        } else {
          return (
            <motion.div
              key={p.id}
              initial={{ x: p.x - 4, y: p.y - 4, opacity: 0.8, scale: 1 }}
              animate={{
                y: p.y + 20,
                opacity: 0,
                scale: 0,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full mix-blend-overlay"
            />
          );
        }
      })}
    </div>
  );
}
