"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

function TiltButton({
  children,
  primary,
  className = "",
}: {
  children: React.ReactNode;
  primary?: boolean;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 300, damping: 20 });
  const my = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(my, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mx, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05, y: -6, boxShadow: "8px 8px 0px var(--color-pixel-dark)" }}
      whileTap={{ scale: 0.93, scaleX: 1.06, y: 4, boxShadow: "0px 0px 0px var(--color-pixel-dark)" }}
      className={`relative px-6 sm:px-10 py-3 sm:py-5 font-bold font-pixel text-base sm:text-xl border-4 border-primary rounded-2xl flex items-center gap-2 cursor-pointer shadow-[6px_6px_0px_var(--color-pixel-dark)] transition-shadow ${
        primary ? "bg-[var(--color-accent-blue)] text-primary" : "bg-surface text-primary"
      } ${className}`}
    >
      <span style={{ transform: "translateZ(20px)" }} className="flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

/* ── HAMBURGER MOBILE NAV ── */
const navItems = ["Home", "Work", "About", "Playground", "Contact"];

function FloatingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, type: "spring", bounce: 0.4 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto w-[calc(100%-2rem)] max-w-xl"
    >
      <div className="flex items-center justify-between px-3 py-2 bg-surface/90 backdrop-blur-md border-4 border-primary rounded-2xl shadow-[6px_6px_0px_var(--color-pixel-dark)]">
        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1 flex-1">
          {navItems.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.92, y: 2 }}
              className="px-3 py-1.5 text-sm font-bold text-primary rounded-xl hover:bg-white/60 transition-colors cursor-pointer"
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* Mobile: brand + hamburger */}
        <span className="sm:hidden font-pixel text-sm font-bold text-primary">SOUDAS</span>
        <button
          className="sm:hidden p-2 rounded-lg hover:bg-white/60 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1">
            <span className={`block w-5 h-0.5 bg-primary transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block w-5 h-0.5 bg-primary transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-primary transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>

        {/* Status dot — desktop only */}
        <div className="hidden md:flex items-center gap-2 ml-2 pl-3 border-l-2 border-primary/20">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]"
          />
          <span className="text-xs font-bold text-secondary whitespace-nowrap">Currently Designing ✨</span>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="sm:hidden mt-2 bg-surface/95 backdrop-blur-md border-4 border-primary rounded-2xl shadow-[6px_6px_0px_var(--color-pixel-dark)] p-3 flex flex-col gap-1"
          >
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-bold text-primary rounded-xl hover:bg-white/60 transition-colors cursor-pointer"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ── PIXEL MASCOT ── */
const bubbles = ["Hover around ✨", "Explore the playground!", "Welcome :)"];

function PixelMascot() {
  const [bubbleIdx, setBubbleIdx] = useState(-1);
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setBubbleIdx(0), 2500);
    const interval = setInterval(() => { setBubbleIdx((prev) => (prev + 1) % bubbles.length); }, 6000);
    return () => { clearTimeout(t1); clearInterval(interval); };
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 200);
    }, 3500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="absolute bottom-24 sm:bottom-28 right-[5%] sm:right-[12%] pointer-events-auto z-20 hidden sm:block"
    >
      <AnimatePresence mode="wait">
        {bubbleIdx >= 0 && (
          <motion.div
            key={bubbleIdx}
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.8 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 bg-white border-3 border-primary rounded-xl text-xs font-bold text-primary shadow-[3px_3px_0px_var(--color-primary)]"
          >
            {bubbles[bubbleIdx]}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-3 border-b-3 border-primary rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
        className="relative w-14 h-16 cursor-pointer"
      >
        <div className="absolute inset-0 bg-white border-4 border-primary rounded-t-full overflow-hidden shadow-[4px_4px_0px_var(--color-primary)]">
          <div className="flex justify-center gap-2 mt-4">
            <motion.div animate={{ scaleY: blinking ? 0.1 : 1 }} className="w-2.5 h-3 bg-primary rounded-full" />
            <motion.div animate={{ scaleY: blinking ? 0.1 : 1 }} className="w-2.5 h-3 bg-primary rounded-full" />
          </div>
          <div className="flex justify-center gap-5 mt-1">
            <div className="w-2 h-1.5 rounded-full bg-[var(--color-accent-red)] opacity-50" />
            <div className="w-2 h-1.5 rounded-full bg-[var(--color-accent-red)] opacity-50" />
          </div>
        </div>
        <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 56 12" fill="none">
          <path d="M0,0 L0,6 Q7,12 14,6 Q21,0 28,6 Q35,12 42,6 Q49,0 56,6 L56,0 Z" fill="white" stroke="var(--color-primary)" strokeWidth="3.5" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ── RESUME WIDGET ── */
function ResumeWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.4 }}
      className="absolute bottom-24 sm:bottom-28 left-[4%] sm:left-[10%] pointer-events-auto z-20 hidden sm:block"
    >
      <motion.a
        href="/Soudas_Sur_UI_UX_Designer_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        animate={{ y: [0, -5, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.08, y: -8 }}
        whileTap={{ scale: 0.95 }}
        className="group flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-3 bg-surface/90 backdrop-blur-sm border-4 border-primary rounded-2xl shadow-[5px_5px_0px_var(--color-primary)] cursor-pointer"
      >
        <div className="relative">
          <div className="w-10 h-8 bg-[var(--color-accent-yellow)] border-3 border-primary rounded-lg relative">
            <div className="absolute -top-2 left-1 w-5 h-3 bg-[var(--color-accent-yellow)] border-3 border-b-0 border-primary rounded-t-md" />
          </div>
          <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-1 left-1/2 -translate-x-1/2 text-sm">📄</motion.div>
        </div>
        <div>
          <div className="text-sm font-bold text-primary font-pixel">View Resume</div>
          <div className="text-[10px] font-semibold text-secondary">Available for Opportunities</div>
        </div>
      </motion.a>
    </motion.div>
  );
}

/* ── SCROLL INDICATOR ── */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
    >
      <span className="text-xs font-bold text-secondary tracking-wider">Scroll to Explore</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-6 h-10 border-3 border-primary rounded-full flex justify-center pt-2"
      >
        <motion.div
          animate={{ opacity: [1, 0.3, 1], y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1.5 h-3 bg-primary rounded-full"
        />
      </motion.div>
    </motion.div>
  );
}

function Sparkle({ top, left, delay, size = 10 }: { top: string; left: string; delay: number; size?: number }) {
  return (
    <motion.div
      animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: [0, 180] }}
      transition={{ duration: 2.5, repeat: Infinity, delay, ease: "easeInOut" }}
      className="absolute pointer-events-none z-10"
      style={{ top, left, width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" fill="var(--color-accent-yellow)" className="w-full h-full">
        <path d="M12 0l2.5 7.5H22l-6 4.5 2.5 8L12 15l-6.5 5 2.5-8-6-4.5h7.5z" />
      </svg>
    </motion.div>
  );
}

const tags = [
  { label: "UI/UX Designer", color: "var(--color-accent-blue)" },
  { label: "Visual Storyteller", color: "var(--color-accent-yellow)" },
  { label: "Interaction Design", color: "var(--color-accent-green)" },
  { label: "Figma Expert", color: "var(--color-accent-red)" },
  { label: "Creative Thinker", color: "var(--color-accent-blue)" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const title = "SOUDAS SUR";

  const [particles, setParticles] = useState<{ top: string; left: string; xMove: number; duration: number; delay: number }[]>([]);
  const [sparkles, setSparkles] = useState<{ top: string; left: string; delay: number; size: number }[]>([]);

  useEffect(() => {
    requestAnimationFrame(() => {
      setParticles(
        [...Array(18)].map(() => ({
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          xMove: (Math.random() - 0.5) * 40,
          duration: 10 + Math.random() * 10,
          delay: Math.random() * 5,
        }))
      );
      setSparkles(
        [...Array(8)].map(() => ({
          top: `${15 + Math.random() * 70}%`,
          left: `${10 + Math.random() * 80}%`,
          delay: Math.random() * 4,
          size: 8 + Math.random() * 8,
        }))
      );
    });
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const titleX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 100, damping: 20 });
  const titleY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-5, 5]), { stiffness: 100, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const letterVariants = {
    hidden: { opacity: 0, y: 30, rotate: -8 },
    visible: (i: number) => ({
      opacity: 1, y: 0, rotate: 0,
      transition: { delay: 0.4 + i * 0.05, type: "spring" as const, stiffness: 300, damping: 15 },
    }),
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
      style={{ perspective: "1000px" }}
    >
      <FloatingNavbar />

      {/* ═══ CINEMATIC BACKGROUND ═══ */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9F0]/60 via-transparent to-[#F6F1E8]/40" />
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />

        {particles.map((p, i) => (
          <motion.div
            key={`p-${i}`}
            animate={{ y: [0, -80, 0], x: [0, p.xMove, 0], opacity: [0.08, 0.3, 0.08] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{ top: p.top, left: p.left }}
          />
        ))}

        {sparkles.map((s, i) => (
          <Sparkle key={`sp-${i}`} top={s.top} left={s.left} delay={s.delay} size={s.size} />
        ))}

        {/* Pixel clouds — hidden on mobile */}
        <motion.div
          drag dragConstraints={containerRef} whileDrag={{ scale: 1.1 }}
          animate={{ x: [0, 25, 0], y: [0, 8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[8%] w-28 h-10 bg-white/80 rounded-lg border-3 border-primary/20 shadow-[3px_3px_0px_var(--color-accent-blue)/30] cursor-grab pointer-events-auto hidden sm:block"
        />
        <motion.div
          drag dragConstraints={containerRef} whileDrag={{ scale: 1.1 }}
          animate={{ x: [0, -20, 0], y: [0, -6, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[22%] right-[12%] w-36 h-12 bg-white/70 rounded-lg border-3 border-primary/15 shadow-[3px_3px_0px_var(--color-accent-green)/25] cursor-grab pointer-events-auto hidden md:block"
        />

        {/* Floating shapes — hidden on small mobile */}
        <motion.div
          drag dragConstraints={containerRef} whileHover={{ scale: 1.5, rotate: 90 }} whileDrag={{ scale: 1.2 }}
          animate={{ y: [0, -12, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="absolute top-[30%] left-[20%] w-5 h-5 bg-[var(--color-accent-yellow)] rotate-45 border-2 border-primary shadow-[2px_2px_0px_var(--color-primary)] cursor-grab pointer-events-auto hidden sm:block"
        />
        <motion.div
          drag dragConstraints={containerRef} whileHover={{ scale: 1.5, rotate: -90 }} whileDrag={{ scale: 1.2 }}
          animate={{ y: [0, 15, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }}
          className="absolute bottom-[35%] right-[22%] w-6 h-6 bg-[var(--color-accent-red)] rotate-45 border-2 border-primary shadow-[2px_2px_0px_var(--color-primary)] cursor-grab pointer-events-auto hidden sm:block"
        />

        {/* Sticky note */}
        <motion.div
          drag dragConstraints={containerRef} whileHover={{ scale: 1.12, rotate: 5 }}
          animate={{ y: [0, -6, 0], rotate: [-3, 2, -3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[55%] left-[6%] w-14 h-14 bg-[var(--color-accent-yellow)]/60 border-2 border-primary/30 rounded-sm flex items-center justify-center text-[9px] font-bold text-primary/50 cursor-grab pointer-events-auto shadow-[2px_2px_0px_var(--color-primary)/20] hidden lg:flex"
        >
          ✏️ ideas
        </motion.div>

        {/* Floating folder */}
        <motion.div
          drag dragConstraints={containerRef} whileHover={{ scale: 1.12 }}
          animate={{ y: [0, 8, 0], rotate: [2, -2, 2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[40%] right-[7%] pointer-events-auto cursor-grab hidden lg:block"
        >
          <div className="relative w-12 h-9 bg-[var(--color-accent-blue)]/50 border-2 border-primary/30 rounded-lg">
            <div className="absolute -top-2 left-1 w-5 h-3 bg-[var(--color-accent-blue)]/50 border-2 border-b-0 border-primary/30 rounded-t-md" />
          </div>
        </motion.div>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="z-10 flex flex-col items-center text-center max-w-4xl w-full px-4 sm:px-6 mt-20 sm:mt-16 pointer-events-none">
        {/* Title */}
        <motion.div style={{ x: titleX, y: titleY }}>
          <motion.h1
            className="font-pixel text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-primary mb-4 flex flex-wrap justify-center pointer-events-auto cursor-crosshair"
            style={{ textShadow: "4px 4px 0px var(--color-accent-blue), 8px 8px 0px rgba(108,198,255,0.25)" }}
          >
            {title.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -14, color: "var(--color-accent-yellow)", textShadow: "4px 4px 0px var(--color-accent-red), 8px 8px 0px rgba(255,107,107,0.2)", scale: 1.12 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="inline-block"
                style={{ whiteSpace: "pre" }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-sm sm:text-base md:text-xl text-secondary mb-6 sm:mb-8 max-w-xl sm:max-w-2xl leading-relaxed font-semibold px-2"
        >
          Designing thoughtful digital experiences through creativity, storytelling, and playful interactions.
        </motion.p>

        {/* Identity Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 pointer-events-auto"
        >
          {tags.map((tag, i) => (
            <motion.div
              key={tag.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + i * 0.08 }}
              whileHover={{ y: -5, scale: 1.08, boxShadow: `0 0 14px ${tag.color}` }}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold border-2 border-primary rounded-full shadow-[3px_3px_0px_var(--color-primary)] cursor-pointer bg-white/70 backdrop-blur-sm"
              style={{ borderColor: tag.color }}
            >
              {tag.label}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-5 pointer-events-auto w-full sm:w-auto px-4 sm:px-0"
          style={{ perspective: "800px" }}
        >
          <TiltButton primary className="justify-center">
            Explore Projects <span className="text-xl sm:text-2xl">🚀</span>
          </TiltButton>
          <TiltButton className="justify-center">
            Enter Playground <span className="text-xl sm:text-2xl">🎮</span>
          </TiltButton>
        </motion.div>
      </div>

      <ResumeWidget />
      <PixelMascot />
      <ScrollIndicator />
    </section>
  );
}
