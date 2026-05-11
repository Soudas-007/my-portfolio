"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

/* ── HELPERS ── */


/* ── TILT BUTTON ── */
function TiltButton({
  children,
  primary,
  className = "",
  onClick,
  href,
}: {
  children: React.ReactNode;
  primary?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 300, damping: 25 });
  const my = useSpring(y, { stiffness: 300, damping: 25 });
  const rotateX = useTransform(my, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mx, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const buttonContent = (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4.5 font-bold font-pixel text-[10px] sm:text-xs md:text-sm lg:text-base border-2 sm:border-3 border-primary rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_var(--color-pixel-dark)] sm:shadow-[4px_4px_0px_var(--color-pixel-dark)] lg:shadow-[5px_5px_0px_var(--color-pixel-dark)] transition-all ${
        primary ? "bg-[var(--color-accent-blue)] text-primary" : "bg-surface text-primary"
      } ${className}`}
    >
      <span style={{ transform: "translateZ(15px)" }} className="flex items-center gap-2 whitespace-nowrap">
        {children}
      </span>
    </motion.div>
  );

  const wrapperProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileHover: { scale: 1.02, y: -4 },
    whileTap: { scale: 0.96, y: 2 },
  };

  if (href) {
    return (
      <motion.a href={href} {...wrapperProps} className="block w-full sm:w-auto">
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button {...wrapperProps} onClick={onClick} className="w-full sm:w-auto">
      {buttonContent}
    </motion.button>
  );
}

/* ── NAV BAR ── */
const navItems = ["Home", "Work", "About", "Contact"];

function FloatingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 sm:top-6 left-0 right-0 z-50 pointer-events-none px-4"
    >
      <div className="w-full max-w-6xl mx-auto flex items-center justify-center relative">
        <nav className="flex items-center justify-between px-3 py-1.5 bg-surface/90 backdrop-blur-md border-2 md:border-3 border-primary rounded-xl md:rounded-2xl shadow-[4px_4px_0px_var(--color-pixel-dark)] pointer-events-auto">
          <div className="hidden lg:flex items-center gap-0.5 md:gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.4)" }}
                className="px-3 py-1.5 text-[10px] md:text-xs font-bold text-primary rounded-lg transition-colors cursor-pointer"
              >
                {item}
              </motion.a>
            ))}
          </div>
          <span className="lg:hidden font-pixel text-[10px] font-bold text-primary px-2">SOUDAS</span>
          <button className="lg:hidden p-1.5" onClick={() => setMenuOpen((v) => !v)}>
            <div className="flex flex-col gap-1">
              <span className={`block w-4 h-0.5 bg-primary transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block w-4 h-0.5 bg-primary transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-4 h-0.5 bg-primary transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </nav>

        <div className="hidden lg:block absolute right-0 pointer-events-auto">
          <motion.a
            href="/Soudas_Sur_UI_UX_Designer_Resume.pdf"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2.5 bg-[var(--color-accent-yellow)] border-2 md:border-3 border-primary rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs text-primary shadow-[4px_4px_0px_var(--color-pixel-dark)] transition-all flex items-center justify-center"
          >
            View Resume 📄
          </motion.a>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-14 left-0 right-0 bg-surface border-3 border-primary rounded-xl p-2 flex flex-col gap-1 shadow-xl pointer-events-auto lg:hidden"
            >
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="px-4 py-2 text-xs font-bold text-primary rounded-lg hover:bg-black/5">
                  {item}
                </a>
              ))}
              <div className="border-t-2 border-primary/10 mt-1 pt-1">
                <a 
                  href="/Soudas_Sur_UI_UX_Designer_Resume.pdf" 
                  target="_blank" 
                  className="px-4 py-2 text-xs font-bold text-primary rounded-lg bg-[var(--color-accent-yellow)]/20 flex justify-between items-center"
                >
                  View Resume 📄
                  <span className="text-[10px]">→</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* Old components removed as mascot is now the focus */

/* ── HERO COMPONENT ── */
const tags = [
  { label: "UI/UX Designer", color: "var(--color-accent-blue)" },
  { label: "Visual Storyteller", color: "var(--color-accent-yellow)" },
  { label: "Interaction Design", color: "var(--color-accent-green)" },
  { label: "Figma Expert", color: "var(--color-accent-red)" },
  { label: "Vibe Coding", color: "var(--color-accent-blue)" },
];

export default function HeroSection() {
  const titleText = "SOUDAS SUR";
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden px-4 py-20"
    >
      <FloatingNavbar />

      {/* ── BACKGROUND AMBIENCE ── */}
      <div className="absolute inset-0 z-[-1] pointer-events-none bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9F0]/30 to-transparent" />
      </div>

      {/* ── CENTRAL CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto pointer-events-none">
        
        {/* Title with enhanced pop-out interaction */}
        <div className="mb-6 lg:mb-8 pointer-events-auto w-full max-w-[100vw] overflow-hidden px-2">
          <h1 className="font-pixel font-bold text-primary flex flex-wrap justify-center leading-[1.05] text-fluid-h1 transition-all duration-300">
            {titleText.split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 200 }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.2,
                  rotate: [0, -5, 5, 0],
                  color: "var(--color-accent-yellow)" 
                }}
                className="inline-block cursor-default"
                style={{ 
                  whiteSpace: letter === " " ? "pre" : "normal",
                  textShadow: "4px 4px 0px var(--color-accent-blue)"
                }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-secondary font-semibold max-w-lg lg:max-w-xl mx-auto leading-relaxed mb-10 lg:mb-16 px-4"
          style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.25rem)" }}
        >
          Designing thoughtful digital experiences through creativity, storytelling, and playful interactions.
        </motion.p>

        {/* Identity Tags - Hardened responsiveness */}
        <div className="flex flex-row flex-wrap justify-center gap-2 md:gap-3 mb-10 lg:mb-14 pointer-events-auto w-full max-w-[100vw] px-6">
          {tags.map((tag, i) => (
            <motion.div
              key={tag.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + i * 0.08 }}
              whileHover={{ y: -2, scale: 1.05 }}
              className="px-3.5 sm:px-4 py-1.5 md:py-2 text-[9px] sm:text-[10px] md:text-xs font-bold border-2 border-primary rounded-full bg-white/80 backdrop-blur-sm shadow-[2px_2px_0px_var(--color-primary)] cursor-pointer"
              style={{ borderColor: tag.color }}
            >
              {tag.label}
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <div className="relative flex flex-col sm:flex-row items-center gap-4 lg:gap-6 pointer-events-auto w-full sm:w-auto px-8 sm:px-0">
          <TiltButton primary href="#work" className="w-full sm:w-auto max-w-full">
            Explore Projects 🚀
          </TiltButton>
          <TiltButton href="#contact" className="w-full sm:w-auto max-w-full">
            Connect 🤝
          </TiltButton>
        </div>

        {/* Lower tags removed as requested */}
      </div>

      {/* Scroll indicator - anchored to bottom */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none hidden sm:flex"
      >
        <span className="text-[10px] font-bold text-secondary uppercase tracking-widest opacity-50">Scroll</span>
        <div className="w-5 h-8 border-2 border-primary/20 rounded-full flex justify-center pt-1.5">
          <motion.div 
            animate={{ y: [0, 4, 0], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-primary/20 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
