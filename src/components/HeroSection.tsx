"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

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
      className={`relative px-6 py-4 font-bold font-pixel text-fluid-small border-3 border-primary rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-[5px_5px_0px_var(--color-primary)] transition-all ${
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
      className="fixed top-6 left-0 right-0 z-50 pointer-events-none px-4"
    >
      <div className="w-full max-w-6xl mx-auto flex items-center justify-center relative">
        <nav className="flex items-center justify-between px-4 py-2 bg-surface/90 backdrop-blur-md border-3 border-primary rounded-2xl shadow-[4px_4px_0px_var(--color-primary)] pointer-events-auto">
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ y: -2, backgroundColor: "rgba(0,0,0,0.05)" }}
                className="px-3 py-1.5 text-fluid-small font-bold text-primary rounded-lg transition-colors cursor-pointer"
              >
                {item}
              </motion.a>
            ))}
          </div>
          <span className="lg:hidden font-pixel text-fluid-small font-bold text-primary px-2">SOUDAS</span>
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
            className="px-5 py-3 bg-[var(--color-accent-yellow)] border-3 border-primary rounded-2xl font-bold text-fluid-small text-primary shadow-[4px_4px_0px_var(--color-primary)] transition-all flex items-center justify-center"
          >
            Resume 📄
          </motion.a>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 left-0 right-0 bg-surface border-3 border-primary rounded-xl p-2 flex flex-col gap-1 shadow-xl pointer-events-auto lg:hidden"
            >
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="px-4 py-2 text-xs font-bold text-primary rounded-lg hover:bg-black/5">
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── ATMOSPHERIC ELEMENTS ── */
function Atmosphere() {
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Pixel Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      
      {/* Flow Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
        <motion.path
          d="M-100,200 Q200,150 500,400 T1200,300"
          stroke="var(--color-primary)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M1400,600 Q1000,700 600,400 T-200,500"
          stroke="var(--color-primary)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        />
      </svg>
      
      {/* Floating Indicators */}
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/3 left-10 w-20 h-20 opacity-[0.05]">
        <div className="w-full h-full border-2 border-primary rotate-45 flex items-center justify-center">
           <div className="w-1 h-full bg-primary" />
           <div className="h-1 w-full bg-primary absolute" />
        </div>
      </motion.div>
    </div>
  );
}

/* ── PROTOTYPE WINDOW ── */
function PrototypeWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 60 }}
      whileHover={{ y: -10, rotate: 1, scale: 1.02 }}
      className="hidden lg:block absolute -right-12 top-1/4 w-[340px] xl:w-[400px] bg-white border-3 border-primary rounded-3xl shadow-[12px_12px_0px_var(--color-primary)] overflow-hidden pointer-events-auto"
    >
      <div className="bg-primary/5 border-b-2 border-primary px-5 py-3 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-red border border-primary/20" />
          <div className="w-3 h-3 rounded-full bg-accent-yellow border border-primary/20" />
          <div className="w-3 h-3 rounded-full bg-accent-green border border-primary/20" />
        </div>
        <span className="text-[10px] font-bold text-primary/30 uppercase tracking-widest">clevflow_main.fig</span>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="h-40 bg-background rounded-2xl border-2 border-primary/5 flex items-center justify-center overflow-hidden">
             <div className="w-16 h-16 rounded-full border-4 border-accent-blue/30 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-accent-blue/20" />
             </div>
          </div>
          <div className="h-40 bg-background rounded-2xl border-2 border-primary/5 p-4 space-y-3">
             <div className="w-full h-2 bg-primary/10 rounded-full" />
             <div className="w-2/3 h-2 bg-primary/10 rounded-full" />
             <div className="w-full h-16 bg-accent-yellow/10 rounded-xl mt-4" />
          </div>
        </div>
        <div className="flex items-center gap-3 bg-primary/5 p-3 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-white border border-primary/10" />
          <div className="flex-1 space-y-1.5">
            <div className="w-full h-1.5 bg-primary/10 rounded-full" />
            <div className="w-1/2 h-1.5 bg-primary/10 rounded-full" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── HERO COMPONENT ── */
const tags = [
  { label: "UI/UX Designer", color: "var(--color-accent-blue)" },
  { label: "Visual Storyteller", color: "var(--color-accent-yellow)" },
  { label: "Interaction", color: "var(--color-accent-green)" },
  { label: "Figma", color: "var(--color-accent-red)" },
];

export default function HeroSection() {
  const titleText = "SOUDAS SUR";
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-fluid-section"
    >
      <FloatingNavbar />
      <Atmosphere />

      {/* ── CENTRAL CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-6xl mx-auto pointer-events-none">
        
        {/* Dominant Prototype Window */}
        <PrototypeWindow />

        {/* Title with improved composition */}
        <div className="mb-8 pointer-events-auto">
          <h1 className="font-pixel font-bold text-primary flex flex-wrap justify-center leading-none text-fluid-h1">
            {titleText.split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 150 }}
                whileHover={{ 
                  y: -20, 
                  scale: 1.15,
                  color: "var(--color-accent-yellow)" 
                }}
                className="inline-block cursor-default"
                style={{ 
                  whiteSpace: letter === " " ? "pre" : "normal",
                  textShadow: "6px 6px 0px var(--color-accent-blue)"
                }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subtitle - Fluid & Balanced */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-secondary font-semibold max-w-2xl mx-auto leading-relaxed mb-12 text-fluid-body px-4"
        >
          Architecting high-fidelity digital experiences where precision meets playfulness. Focused on interaction design and visual storytelling.
        </motion.p>

        {/* Tags - Premium Presentation */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 pointer-events-auto">
          {tags.map((tag, i) => (
            <motion.div
              key={tag.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + i * 0.08 }}
              whileHover={{ y: -3, scale: 1.05 }}
              className="px-5 py-2 text-fluid-small font-bold border-3 border-primary rounded-full bg-white/90 backdrop-blur-sm shadow-[3px_3px_0px_var(--color-primary)] cursor-pointer"
              style={{ borderColor: tag.color }}
            >
              {tag.label}
            </motion.div>
          ))}
        </div>

        {/* CTAs - Balanced Rhythm */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pointer-events-auto">
          <TiltButton primary href="#work">
            View Projects 🚀
          </TiltButton>
          <TiltButton href="#contact">
            Let&apos;s Talk 🤝
          </TiltButton>
        </div>
      </div>

      {/* Scroll indicator - Refined */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none hidden sm:flex"
      >
        <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em] opacity-40">Explore</span>
        <div className="w-6 h-10 border-3 border-primary/20 rounded-full flex justify-center pt-2">
          <motion.div 
            animate={{ y: [0, 6, 0], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-2.5 bg-primary/30 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
