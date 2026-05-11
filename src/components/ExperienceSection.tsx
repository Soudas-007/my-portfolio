"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function PixelCreature({ emoji, className, seed = 0 }: { emoji: string; className: string; seed?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0], x: [0, 6, -6, 0] }}
      transition={{ duration: 4 + seed * 0.5, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute text-xl sm:text-2xl pointer-events-none select-none z-0 ${className}`}
    >
      {emoji}
    </motion.div>
  );
}

function Sparkle({ style, delay }: { style: React.CSSProperties; delay: number }) {
  return (
    <motion.div
      animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: [0, 180] }}
      transition={{ duration: 2.5, repeat: Infinity, delay, ease: "easeInOut" }}
      className="absolute w-3 h-3 pointer-events-none z-0"
      style={style}
    >
      <svg viewBox="0 0 24 24" fill="var(--color-accent-yellow)" className="w-full h-full">
        <path d="M12 0l3 9h9l-7.5 5.5L19.5 24 12 18l-7.5 6 3-9.5L0 9h9z" />
      </svg>
    </motion.div>
  );
}

function PathConnector({ flip }: { flip?: boolean }) {
  return (
    <div className={`relative w-full h-16 sm:h-24 hidden sm:flex items-center justify-center pointer-events-none ${flip ? "scale-x-[-1]" : ""}`}>
      <svg viewBox="0 0 400 80" className="w-48 sm:w-80 h-12 sm:h-20" fill="none">
        <motion.path
          d="M10,10 C100,10 100,70 200,70 C300,70 300,10 390,10"
          stroke="var(--color-primary)" strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.3 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
      <motion.div
        animate={{ x: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute right-[calc(50%-140px)] top-0 text-lg"
      >➤</motion.div>
    </div>
  );
}

const experiences = [
  {
    role: "UI/UX Design Intern",
    company: "Plum Stays",
    duration: "2025 – Present",
    description: "Worked on UI/UX design tasks, user-centered interfaces, visual layouts, design systems, and collaborative creative workflows.",
    color: "var(--color-accent-blue)",
    emoji: "🎨",
    themeIcons: ["🖌️", "📐", "🗂️", "📝"],
    decorItems: [
      { text: "UX Research", bg: "bg-[var(--color-accent-blue)]/30" },
      { text: "Wireframing", bg: "bg-[var(--color-accent-green)]/30" },
      { text: "User Flows", bg: "bg-[var(--color-accent-yellow)]/30" },
      { text: "UI Design", bg: "bg-[var(--color-accent-red)]/30" },
      { text: "Prototyping", bg: "bg-[var(--color-accent-blue)]/30" },
    ],
  },
  {
    role: "Creative Coordination & Admin",
    company: "",
    duration: "2024 – 2025",
    description: "Handled communication, coordination, organization, workflow management, and operational responsibilities while maintaining creative problem-solving approaches.",
    color: "var(--color-accent-green)",
    emoji: "📋",
    themeIcons: ["📂", "✅", "📎", "🗓️"],
    decorItems: [
      { text: "Scheduling", bg: "bg-[var(--color-accent-green)]/30" },
      { text: "Documentation", bg: "bg-[var(--color-accent-blue)]/30" },
      { text: "Communication", bg: "bg-[var(--color-accent-yellow)]/30" },
      { text: "Workflow", bg: "bg-[var(--color-accent-red)]/30" },
    ],
  },
  {
    role: "Freelance 3D Designer",
    company: "",
    duration: "2022 – 2024",
    description: "Worked on freelance 3D visual projects, creative modeling concepts, motion experiments, and digital visual storytelling.",
    color: "var(--color-accent-yellow)",
    emoji: "🧊",
    themeIcons: ["🔷", "🔶", "🔻", "⬡"],
    decorItems: [
      { text: "3D Modelling", bg: "bg-[var(--color-accent-yellow)]/30" },
      { text: "Textures", bg: "bg-[var(--color-accent-red)]/30" },
    ],
  },
];

export default function ExperienceSection() {
  const [sparkles, setSparkles] = useState<{ top: string; left: string; delay: number }[]>([]);

  useEffect(() => {
    requestAnimationFrame(() => {
      setSparkles(
        [...Array(12)].map(() => ({
          top: `${10 + Math.random() * 80}%`,
          left: `${5 + Math.random() * 90}%`,
          delay: Math.random() * 4,
        }))
      );
    });
  }, []);

  return (
    <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 bg-background relative overflow-hidden border-t-4 border-primary">
      {sparkles.map((s, i) => (
        <Sparkle key={`sparkle-${i}`} style={{ top: s.top, left: s.left }} delay={s.delay} />
      ))}

      {/* Pixel creatures — only md+ */}
      <PixelCreature emoji="🐾" className="top-24 left-[8%] hidden md:block" seed={1} />
      <PixelCreature emoji="🌟" className="top-[45%] right-[6%] hidden md:block" seed={2} />
      <PixelCreature emoji="🎮" className="bottom-32 left-[12%] hidden lg:block" seed={3} />
      <PixelCreature emoji="🚀" className="bottom-48 right-[10%] hidden lg:block" seed={4} />

      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            animate={{ y: [0, -40, 0], x: [0, (i % 2 === 0 ? 15 : -15), 0], opacity: [0.15, 0.45, 0.15] }}
            transition={{ duration: 8 + i * 1.2, repeat: Infinity, delay: i * 0.6 }}
            className="absolute w-1.5 h-1.5 bg-primary/20 rounded-full"
            style={{ top: `${10 + i * 8}%`, left: `${5 + i * 9}%` }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <motion.h2 className="font-pixel text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary mb-4 drop-shadow-[4px_4px_0px_#E0D8C8]">
            JOURNEY SO FAR
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-secondary font-semibold text-base sm:text-lg max-w-lg mx-auto"
          >
            Creative experiences, collaborations, and digital adventures.
          </motion.p>
          <div className="flex justify-center gap-2 mt-6">
            {["var(--color-accent-blue)", "var(--color-accent-yellow)", "var(--color-accent-green)", "var(--color-accent-red)"].map((c, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="w-3 h-3 rounded-full border-2 border-primary"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </motion.div>

        {/* Adventure Path */}
        <div className="flex flex-col items-center gap-0">
          {experiences.map((exp, index) => (
            <div key={index} className="w-full flex flex-col items-center">
              {index > 0 && <PathConnector flip={index % 2 === 0} />}

              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: 0.1, type: "spring", bounce: 0.35 }}
                whileHover={{
                  y: -12,
                  rotateX: 3,
                  rotateY: index % 2 === 0 ? -3 : 3,
                  boxShadow: `12px 12px 0px ${exp.color}`,
                  borderColor: exp.color,
                }}
                whileTap={{ scale: 0.97 }}
                className={`
                  group relative w-full max-w-2xl
                  bg-white/50 backdrop-blur-sm
                  border-4 border-primary rounded-2xl
                  p-5 sm:p-8 overflow-hidden cursor-pointer
                  shadow-[6px_6px_0px_var(--color-primary)]
                  transition-colors duration-300
                  ${index % 2 === 0 ? "sm:self-start" : "sm:self-end"}
                `}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Window Dots */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-1.5 sm:gap-2 z-10">
                  <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full border border-primary bg-[var(--color-accent-red)]" />
                  <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full border border-primary bg-[var(--color-accent-yellow)]" />
                  <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full border border-primary bg-[var(--color-accent-green)]" />
                </div>

                {/* Theme icons on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 overflow-hidden">
                  {exp.themeIcons.map((icon, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [10, -20, 10], x: [0, (i % 2 === 0 ? 12 : -12), 0], rotate: [0, i % 2 === 0 ? 15 : -15, 0] }}
                      transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                      className="absolute text-2xl sm:text-3xl"
                      style={{ top: `${20 + i * 18}%`, left: `${65 + i * 8}%` }}
                    >
                      {icon}
                    </motion.div>
                  ))}
                  <motion.div
                    animate={{ opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 mix-blend-overlay rounded-2xl"
                    style={{ backgroundColor: exp.color }}
                  />
                </div>

                {/* Card Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <motion.div
                      animate={{ y: [0, -3, 0], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="w-11 sm:w-14 h-11 sm:h-14 flex items-center justify-center border-4 border-primary rounded-xl text-2xl sm:text-3xl shadow-[3px_3px_0px_var(--color-primary)] flex-shrink-0"
                      style={{ backgroundColor: exp.color }}
                    >
                      {exp.emoji}
                    </motion.div>
                    <div>
                      <h3 className="font-pixel text-base sm:text-xl md:text-2xl text-primary leading-tight">{exp.role}</h3>
                      {exp.company && <span className="text-xs sm:text-sm font-bold text-secondary">@ {exp.company}</span>}
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-bold border-2 border-primary rounded-full mb-3 sm:mb-4 shadow-[2px_2px_0px_var(--color-primary)] bg-surface"
                  >
                    🗓️ {exp.duration}
                  </motion.div>

                  <p className="text-secondary font-semibold text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">{exp.description}</p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {exp.decorItems.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        whileHover={{ y: -4, rotate: i % 2 === 0 ? 2 : -2, scale: 1.08 }}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-bold border-2 border-primary rounded-lg shadow-[2px_2px_0px_var(--color-primary)] cursor-pointer ${item.bg} backdrop-blur-sm`}
                      >
                        {item.text}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Hover glow */}
                <motion.div
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[-1]"
                  style={{ boxShadow: `0 0 30px ${exp.color}, 0 0 60px ${exp.color}40` }}
                />

                {/* Particle burst */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`burst-${i}`}
                    className="absolute w-2 h-2 border border-primary rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: exp.color }}
                    animate={{ x: [0, (i % 2 === 0 ? 30 : -30) + i * 5], y: [0, (i < 2 ? -25 : 25)], opacity: [0, 0.8, 0], scale: [0.5, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeOut" }}
                  />
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* End marker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="flex flex-col items-center mt-10 sm:mt-16 gap-3"
        >
          <PathConnector />
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            whileHover={{ scale: 1.2, rotate: 15 }}
            className="w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center bg-[var(--color-accent-yellow)] border-4 border-primary rounded-2xl shadow-[6px_6px_0px_var(--color-primary)] text-3xl sm:text-4xl cursor-pointer"
          >
            🏁
          </motion.div>
          <span className="font-pixel text-primary text-sm sm:text-lg mt-2 text-center px-4">...and the adventure continues!</span>
        </motion.div>
      </div>
    </section>
  );
}
