"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

/* ── PROJECT CARD COMPONENT ── */
interface Project {
  title: string;
  category: string;
  color: string;
  description: string;
  theme: "healthcare" | "travel" | "banking";
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.15, type: "spring", stiffness: 100, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative bg-white/60 backdrop-blur-md border-4 border-primary rounded-3xl p-1 sm:p-2 h-[450px] flex flex-col overflow-hidden cursor-pointer shadow-[8px_8px_0px_var(--color-primary)] transition-all duration-500 hover:shadow-[16px_16px_0px_var(--color-primary)] hover:border-[var(--color-accent-blue)]"
    >
      {/* Dynamic Border Glow */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ 
              boxShadow: `inset 0 0 30px ${project.color}33`,
              borderRadius: "24px"
            }}
          />
        )}
      </AnimatePresence>

      {/* ── CARD TOP: INTERACTIVE DEMO ── */}
      <div className="relative flex-1 bg-[#1A1A1A] rounded-2xl m-2 overflow-hidden border-2 border-primary/20 flex items-center justify-center group-hover:border-primary/50 transition-colors">
        {/* CRT Overlay */}
        <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,1)_2px,rgba(255,255,255,1)_4px)]" />
        
        {/* Background Particles (Hover only) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 pointer-events-none"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [-10, -100], 
                    x: [(Math.random()-0.5)*40, (Math.random()-0.5)*60],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: i * 0.3 }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{ 
                    backgroundColor: project.color, 
                    bottom: "20%", 
                    left: `${20 + i * 15}%`,
                    filter: `blur(2px)` 
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ THEMATIC VISUALS ══ */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
          
          {/* HEALTHCARE (CURIVA) */}
          {project.theme === "healthcare" && (
            <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
              {/* Pulsing Heartbeat */}
              <svg className="w-full h-24 overflow-visible" viewBox="0 0 200 60">
                <motion.path
                  d="M0,30 L60,30 L70,10 L80,50 L90,30 L110,30 L120,0 L130,60 L140,30 L200,30"
                  fill="none"
                  stroke="var(--color-accent-blue)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.3 }}
                  animate={{ pathLength: 1, opacity: isHovered ? 1 : 0.4 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle
                   cx="0" cy="30" r="4" fill="var(--color-accent-blue)"
                   animate={{ cx: [0, 200] }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </svg>
              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex gap-4"
              >
                <div className="w-12 h-16 bg-white/10 border border-white/20 rounded-lg flex flex-col p-1.5 gap-1">
                  <div className="w-full h-1/2 bg-white/5 rounded" />
                  <div className="w-full h-1 bg-white/20 rounded" />
                  <div className="w-2/3 h-1 bg-white/20 rounded" />
                </div>
                <div className="w-16 h-20 bg-[var(--color-accent-blue)]/20 border border-[var(--color-accent-blue)]/40 rounded-xl flex items-center justify-center text-2xl">
                  ❤️
                </div>
                <div className="w-12 h-16 bg-white/10 border border-white/20 rounded-lg flex flex-col p-1.5 gap-1">
                  <div className="w-full h-1/2 bg-white/5 rounded" />
                  <div className="w-full h-1 bg-white/20 rounded" />
                  <div className="w-2/3 h-1 bg-white/20 rounded" />
                </div>
              </motion.div>
              <div className="text-[10px] font-pixel text-[var(--color-accent-blue)]/60 uppercase tracking-widest mt-2">
                Live Heartbeat Tracking
              </div>
            </div>
          )}

          {/* TRAVEL (TRAVELKIT) */}
          {project.theme === "travel" && (
            <div className="relative w-full h-full flex items-center justify-center">
               {/* Parallax Clouds */}
               <motion.div 
                 animate={{ x: isHovered ? [-20, 20, -20] : 0 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                 className="absolute top-10 left-10 text-3xl opacity-30"
               >☁️</motion.div>
               <motion.div 
                 animate={{ x: isHovered ? [20, -20, 20] : 0 }}
                 transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                 className="absolute bottom-10 right-10 text-4xl opacity-20"
               >☁️</motion.div>

               {/* Flying Plane Path */}
               <div className="relative w-48 h-32">
                 <svg className="w-full h-full" viewBox="0 0 200 100">
                    <motion.path 
                      d="M0,80 Q50,0 100,50 T200,20" 
                      fill="none" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeDasharray="6 6"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                 </svg>
                 <motion.div
                   animate={{ 
                     offsetDistance: isHovered ? ["0%", "100%"] : "0%",
                     rotate: isHovered ? [20, -20, 20] : 0
                   }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className="absolute top-0 left-0 text-3xl"
                   style={{ offsetPath: "path('M0,80 Q50,0 100,50 T200,20')" }}
                 >
                   ✈️
                 </motion.div>
               </div>
               
               {/* Map Markers */}
               <motion.div 
                 animate={{ scale: [1, 1.2, 1] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute top-4 left-1/4 text-xl"
               >📍</motion.div>
               <motion.div 
                 animate={{ scale: [1, 1.2, 1] }}
                 transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                 className="absolute bottom-10 right-1/4 text-xl"
               >📍</motion.div>
            </div>
          )}

          {/* BANKING (NEXBANK) */}
          {project.theme === "banking" && (
            <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
              {/* Financial Bars */}
              <div className="flex items-end gap-2 h-20">
                {[40, 70, 50, 90, 60, 80].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: "20%" }}
                    animate={{ height: isHovered ? `${h}%` : "30%" }}
                    transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
                    className="w-3 bg-gradient-to-t from-[var(--color-accent-yellow)] to-white/40 rounded-t-sm"
                  />
                ))}
              </div>
              
              {/* Floating Coins */}
              <div className="flex gap-8 relative">
                 <motion.div
                   animate={{ 
                     y: isHovered ? [0, -30, 0] : 0,
                     rotate: isHovered ? [0, 360] : 0
                   }}
                   transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                   className="text-4xl filter drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                 >🪙</motion.div>
                 <motion.div
                   animate={{ 
                     y: isHovered ? [0, -20, 0] : 0,
                     rotate: isHovered ? [0, -360] : 0
                   }}
                   transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                   className="text-3xl filter drop-shadow-[0_0_10px_rgba(255,215,0,0.3)] opacity-70"
                 >🪙</motion.div>
              </div>

              {/* Data Pulse */}
              <motion.div 
                 animate={{ opacity: [0.3, 1, 0.3], scale: [0.95, 1.05, 0.95] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="px-3 py-1 border border-[var(--color-accent-yellow)]/40 rounded-full text-[8px] font-pixel text-[var(--color-accent-yellow)]"
              >
                SYSTEM SECURE • ENCRYPTED
              </motion.div>
            </div>
          )}

        </div>

        {/* Floating UI Detail Labels (Subtle) */}
        <div className="absolute top-4 left-4 z-30 opacity-40 flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
          <span className="text-[7px] text-white font-mono uppercase tracking-tighter">Interaction_Active</span>
        </div>
      </div>

      {/* ── CARD BOTTOM: INFO ── */}
      <div className="p-5 sm:p-6 bg-white relative z-10 transition-colors group-hover:bg-[#FFFDF9]">
        <div className="flex justify-between items-start mb-3">
          <motion.div
            animate={{ x: isHovered ? 5 : 0 }}
            className="inline-block px-3 py-1 text-[10px] font-bold border-2 border-primary rounded-full shadow-[3px_3px_0px_var(--color-primary)] uppercase tracking-wider"
            style={{ backgroundColor: project.color }}
          >
            {project.category}
          </motion.div>
          <div className="flex gap-1.5 opacity-40">
             <div className="w-1.5 h-1.5 rounded-full bg-primary" />
             <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
        </div>

        <h3 className="font-pixel text-2xl text-primary font-bold mb-2 group-hover:text-[var(--color-accent-blue)] transition-colors">
          {project.title}
        </h3>
        
        <p className="text-secondary text-xs sm:text-sm font-semibold leading-relaxed mb-4 line-clamp-2 group-hover:text-primary transition-colors">
          {project.description}
        </p>

        {/* Interactive "View Project" prompt */}
        <div className="flex items-center gap-2 mt-auto pt-2 border-t border-primary/5">
          <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest font-pixel">Explore Case Study</span>
          <motion.div 
            animate={{ x: isHovered ? [0, 5, 0] : 0 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-lg"
          >
            →
          </motion.div>
        </div>
      </div>

      {/* Corner UI Details */}
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-primary/20 rounded-br-lg" />
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-primary/20 rounded-tl-lg" />
    </motion.div>
  );
}

/* ── MAIN SECTION ── */
export default function CaseStudies() {
  const projects: Project[] = [
    {
      title: "Curiva",
      category: "Healthcare App",
      color: "var(--color-accent-blue)",
      description: "A digital healthcare platform integrating doctor consultations, medicine delivery, and emergency services.",
      theme: "healthcare"
    },
    {
      title: "Travelkit",
      category: "Travel Platform",
      color: "var(--color-accent-green)",
      description: "A comprehensive travel planning platform designed to simplify trip logistics and reduce traveler anxiety.",
      theme: "travel"
    },
    {
      title: "NexBank",
      category: "Fintech Dashboard",
      color: "var(--color-accent-yellow)",
      description: "A premium mobile banking experience designed for clarity, security, and approachable finance.",
      theme: "banking"
    }
  ];

  return (
    <section id="work" className="py-24 sm:py-32 px-4 sm:px-6 bg-surface relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16 sm:mb-24"
        >
          <h2 className="font-pixel text-4xl sm:text-5xl md:text-6xl text-primary mb-4 drop-shadow-[4px_4px_0px_#E0D8C8]">
            FEATURED WORK
          </h2>
          <p className="text-secondary font-semibold text-sm sm:text-base max-w-lg mx-auto">
             A selection of projects where logic meets emotion. Crafted with precision, driven by user needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Section Decorative Footer */}
        <div className="mt-20 flex justify-center items-center gap-6 opacity-20 pointer-events-none">
           <div className="h-[2px] w-12 sm:w-24 bg-primary" />
           <div className="font-pixel text-[10px] text-primary">SCROLL TO SEE MORE</div>
           <div className="h-[2px] w-12 sm:w-24 bg-primary" />
        </div>
      </div>
    </section>
  );
}
