"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

/* ── HELPERS ── */
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
}

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

/* ── ADAPTIVE DRAGGABLE ── */
function DraggableUI({
  children,
  className = "",
  constraintsRef,
  initialPos = { x: 0, y: 0 },
  scale = 1
}: {
  children: React.ReactNode;
  className?: string;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  initialPos?: { x: number; y: number };
  scale?: number;
}) {
  const x = useMotionValue(initialPos.x);
  const y = useMotionValue(initialPos.y);

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.05}
      style={{ x, y, scale }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale }}
      whileHover={{ scale: scale * 1.05, zIndex: 50 }}
      whileDrag={{ scale: scale * 1.1, cursor: "grabbing" }}
      className={`absolute pointer-events-auto cursor-grab active:cursor-grabbing ${className}`}
    >
      {children}
    </motion.div>
  );
}

function MiniWindow({ title, children, colorClass }: { title: string; children: React.ReactNode; colorClass: string }) {
  return (
    <div className={`w-32 md:w-40 lg:w-48 bg-white border-2 border-primary rounded-lg overflow-hidden shadow-[3px_3px_0px_var(--color-primary)]`}>
      <div className={`${colorClass} border-b-2 border-primary px-2 py-1 flex items-center justify-between`}>
        <span className="text-[6px] md:text-[8px] font-bold font-pixel text-primary truncate">{title}</span>
        <div className="flex gap-0.5">
          <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full border border-primary bg-red-400" />
          <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full border border-primary bg-yellow-400" />
          <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full border border-primary bg-green-400" />
        </div>
      </div>
      <div className="p-2 md:p-3 bg-white/40">{children}</div>
    </div>
  );
}

function WireframeCard() {
  return (
    <div className="w-24 md:w-32 h-32 md:h-40 bg-white/90 border-2 border-primary border-dashed rounded-lg flex flex-col p-2 gap-2">
      <div className="w-full h-1/2 bg-primary/5 border border-primary/10 rounded" />
      <div className="w-3/4 h-1.5 bg-primary/10 rounded" />
      <div className="w-full h-1 bg-primary/10 rounded" />
      <div className="w-2/3 h-1 bg-primary/10 rounded" />
    </div>
  );
}

/* ── PIXEL MASCOT ── */
const bubbles = ["Vibe Coding... ✨", "Prototype Ready!", "UX Flow Updated"];

function PixelMascot({ className = "" }: { className?: string }) {
  const [bubbleIdx, setBubbleIdx] = useState(-1);
  useEffect(() => {
    const t1 = setTimeout(() => setBubbleIdx(0), 3000);
    const interval = setInterval(() => setBubbleIdx((p) => (p + 1) % bubbles.length), 7000);
    return () => { clearTimeout(t1); clearInterval(interval); };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {bubbleIdx >= 0 && (
          <motion.div
            key={bubbleIdx}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 bg-white border-2 border-primary rounded-xl text-[8px] md:text-[10px] font-bold text-primary shadow-[3px_3px_0px_var(--color-primary)] z-20"
          >
            {bubbles[bubbleIdx]}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-primary rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-10 h-14 md:w-14 md:h-18 bg-white border-3 border-primary rounded-t-full shadow-[4px_4px_0px_var(--color-primary)] flex flex-col items-center pt-4 md:pt-6">
        <div className="flex gap-1 md:gap-1.5">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full" />
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}

/* ── HERO COMPONENT ── */
const tags = [
  { label: "UI/UX Designer", color: "var(--color-accent-blue)" },
  { label: "Visual Storyteller", color: "var(--color-accent-yellow)" },
  { label: "Interaction Design", color: "var(--color-accent-green)" },
  { label: "Figma Expert", color: "var(--color-accent-red)" },
  { label: "Vibe Coding", color: "var(--color-accent-blue)" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleText = "SOUDAS SUR";
  const { width } = useWindowSize();
  const isLaptop = width > 1024 && width < 1536;

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-background px-4 py-20"
    >
      <FloatingNavbar />

      {/* ── BACKGROUND AMBIENCE ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9F0]/30 to-transparent" />
        
        {/* Floating cards repositioned to stay away from center */}
        <DraggableUI 
          className="top-[15%] left-[2%] xl:left-[8%] hidden md:block" 
          constraintsRef={containerRef}
          scale={isLaptop ? 0.8 : 1}
        >
          <MiniWindow title="case_study_v1.fig" colorClass="bg-[var(--color-accent-blue)]/20">
            <div className="w-full h-12 bg-primary/5 rounded flex items-center justify-center text-[10px] opacity-20">FIGMA</div>
          </MiniWindow>
        </DraggableUI>

        <DraggableUI 
          className="top-[12%] right-[2%] xl:right-[8%] hidden md:block" 
          constraintsRef={containerRef}
          scale={isLaptop ? 0.8 : 1}
        >
          <MiniWindow title="prototype_v2.fig" colorClass="bg-[var(--color-accent-yellow)]/20">
            <div className="w-full h-10 bg-primary/5 rounded" />
          </MiniWindow>
        </DraggableUI>

        <DraggableUI 
          className="bottom-[18%] left-[2%] xl:left-[10%] hidden xl:block" 
          constraintsRef={containerRef}
          scale={isLaptop ? 0.75 : 0.9}
        >
          <WireframeCard />
        </DraggableUI>

        <DraggableUI 
          className="bottom-[15%] right-[2%] xl:right-[12%] hidden lg:block" 
          constraintsRef={containerRef}
          scale={isLaptop ? 0.75 : 0.9}
        >
          <PixelMascot />
        </DraggableUI>

        {/* Decorative badge blobs */}
        <motion.div 
          animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-[35%] left-[2%] xl:left-[12%] px-3 py-1 bg-white border-2 border-[var(--color-accent-green)] rounded-full text-[8px] font-bold text-primary shadow-[2px_2px_0px_var(--color-accent-green)] hidden xl:block"
        >
          ● UX Flow
        </motion.div>
        
        <motion.div 
          animate={{ x: [0, -8, 0], y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-[30%] right-[3%] xl:right-[15%] px-3 py-1 bg-white border-2 border-[var(--color-accent-blue)] rounded-full text-[8px] font-bold text-primary shadow-[2px_2px_0px_var(--color-accent-blue)] hidden xl:block"
        >
          ● Visuals
        </motion.div>
      </div>

      {/* ── CENTRAL CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto pointer-events-none">
        
        {/* Title with fluid responsive clamp */}
        <div className="mb-6 lg:mb-8 pointer-events-auto w-full max-w-[100vw] overflow-hidden px-2">
          <h1 className="font-pixel font-bold text-primary flex flex-wrap justify-center leading-[1.05] text-fluid-h1 transition-all duration-300">
            {titleText.split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 200 }}
                whileHover={{ y: -8, color: "var(--color-accent-yellow)" }}
                className="inline-block"
                style={{ 
                  whiteSpace: letter === " " ? "pre" : "normal",
                  textShadow: "2px 2px 0px var(--color-accent-blue)"
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
          className="text-secondary font-semibold max-w-lg lg:max-w-xl mx-auto leading-relaxed mb-8 lg:mb-10 px-4"
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6 pointer-events-auto w-full sm:w-auto px-8 sm:px-0"
        >
          <TiltButton primary href="#work" className="w-full sm:w-auto max-w-full">
            Explore Projects 🚀
          </TiltButton>
          <TiltButton href="#contact" className="w-full sm:w-auto max-w-full">
            Connect 🤝
          </TiltButton>
        </motion.div>
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
