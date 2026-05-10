"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ════════════════════════════════════════════════════
   SPARKLE
   ════════════════════════════════════════════════════ */
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

/* ════════════════════════════════════════════════════
   TILT CARD WRAPPER — 3D perspective on hover
   ════════════════════════════════════════════════════ */
function TiltCard({
  children,
  color,
  className = "",
}: {
  children: React.ReactNode;
  color: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 260, damping: 20 });
  const my = useSpring(y, { stiffness: 260, damping: 20 });
  const rotateX = useTransform(my, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mx, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", bounce: 0.35 }}
      whileHover={{
        y: -14,
        boxShadow: `12px 12px 0px ${color}`,
        borderColor: color,
      }}
      whileTap={{ scale: 0.96 }}
      className={`group relative bg-white/50 backdrop-blur-sm border-4 border-primary rounded-2xl overflow-hidden cursor-pointer shadow-[6px_6px_0px_var(--color-primary)] transition-colors duration-300 ${className}`}
    >
      {/* Window Dots */}
      <div className="absolute top-3 right-3 flex gap-1.5 z-20">
        <div className="w-2.5 h-2.5 rounded-full border border-primary bg-[var(--color-accent-red)]" />
        <div className="w-2.5 h-2.5 rounded-full border border-primary bg-[var(--color-accent-yellow)]" />
        <div className="w-2.5 h-2.5 rounded-full border border-primary bg-[var(--color-accent-green)]" />
      </div>

      {/* Hover glow */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[-1]"
        style={{ boxShadow: `0 0 30px ${color}, 0 0 60px ${color}40` }}
      />

      {/* Pixel particle bursts on hover */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`burst-${i}`}
          className="absolute w-2 h-2 border border-primary rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ backgroundColor: color, top: "50%", left: "50%" }}
          animate={{
            x: [0, (i % 2 === 0 ? 35 : -35)],
            y: [0, i === 1 ? -30 : 20],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0],
          }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25, ease: "easeOut" }}
        />
      ))}

      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════
   FLOATING THEME ICONS — appear on hover
   ════════════════════════════════════════════════════ */
function FloatingIcons({ icons }: { icons: string[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 overflow-hidden">
      {icons.map((icon, i) => (
        <motion.div
          key={i}
          animate={{
            y: [8, -16, 8],
            x: [0, i % 2 === 0 ? 10 : -10, 0],
            rotate: [0, i % 2 === 0 ? 12 : -12, 0],
          }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
          className="absolute text-2xl"
          style={{ top: `${15 + i * 20}%`, right: `${8 + i * 6}%` }}
        >
          {icon}
        </motion.div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════
   TOOL DATA
   ════════════════════════════════════════════════════ */
const tools = [
  {
    name: "Figma",
    tagline: "Collaborative Design",
    color: "var(--color-accent-blue)",
    emoji: "🎨",
    description: "Wireframing, prototyping, and collaborative design systems — where ideas become interfaces.",
    hoverIcons: ["🖼️", "📐", "🧩", "🖱️"],
    miniItems: [
      { label: "Auto Layout", icon: "⬡" },
      { label: "Components", icon: "◆" },
      { label: "Prototypes", icon: "▶" },
    ],
    // themed decorations rendered inside the card
    theme: "figma" as const,
  },
  {
    name: "Photoshop",
    tagline: "Creative Editing",
    color: "var(--color-accent-red)",
    emoji: "🖌️",
    description: "Image manipulation, compositing, and creative retouching for pixel-perfect visuals.",
    hoverIcons: ["🎭", "🖼️", "✨", "🔲"],
    miniItems: [
      { label: "Layers", icon: "◧" },
      { label: "Brushes", icon: "⬡" },
      { label: "Masks", icon: "◑" },
    ],
    theme: "photoshop" as const,
  },
  {
    name: "Illustrator",
    tagline: "Vector Playground",
    color: "var(--color-accent-yellow)",
    emoji: "✏️",
    description: "Vector illustration, iconography, and scalable graphics that bring ideas to life at any size.",
    hoverIcons: ["📏", "🔺", "⬟", "🔷"],
    miniItems: [
      { label: "Pen Tool", icon: "✒" },
      { label: "Vectors", icon: "◇" },
      { label: "Shapes", icon: "⬠" },
    ],
    theme: "illustrator" as const,
  },
  {
    name: "Notion",
    tagline: "Organized Creativity",
    color: "var(--color-accent-green)",
    emoji: "📝",
    description: "Research databases, project wikis, and creative documentation — my second brain.",
    hoverIcons: ["📋", "✅", "📂", "🗂️"],
    miniItems: [
      { label: "Databases", icon: "▦" },
      { label: "Wikis", icon: "📖" },
      { label: "Tasks", icon: "☑" },
    ],
    theme: "notion" as const,
  },
  {
    name: "Stitch",
    tagline: "AI Experimentation",
    color: "var(--color-accent-blue)",
    emoji: "🤖",
    description: "AI-powered design generation, rapid experimentation, and futuristic creative workflows.",
    hoverIcons: ["⚡", "🧠", "🔮", "💡"],
    miniItems: [
      { label: "AI Gen", icon: "✦" },
      { label: "Nodes", icon: "◎" },
      { label: "Iterate", icon: "↻" },
    ],
    theme: "stitch" as const,
  },
];

/* ════════════════════════════════════════════════════
   THEMED DECORATION per card
   ════════════════════════════════════════════════════ */
function ThemedDecor({ theme, color }: { theme: string; color: string }) {
  if (theme === "figma") {
    return (
      <>
        {/* floating wireframe blocks */}
        <motion.div
          animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-8 left-4 w-10 h-6 border-2 border-dashed border-primary/30 rounded-md"
        />
        <motion.div
          animate={{ y: [0, 4, 0], x: [0, -3, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
          className="absolute top-20 left-6 w-6 h-6 border-2 border-dashed border-primary/20 rounded"
        />
        {/* cursor trail */}
        <motion.div
          animate={{ x: [0, 30, 60, 30, 0], y: [0, -10, 5, 15, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-10 w-4 h-5 pointer-events-none z-0"
        >
          <svg viewBox="0 0 16 20" fill={color} className="w-full h-full">
            <path d="M0,0 L0,16 L4,12 L8,18 L10,17 L6,11 L12,10 Z" stroke="var(--color-primary)" strokeWidth="1" />
          </svg>
        </motion.div>
        {/* sticky note */}
        <motion.div
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-6 right-6 w-10 h-10 bg-[var(--color-accent-yellow)]/40 border border-primary/30 rounded-sm rotate-6 flex items-center justify-center text-[8px] font-bold text-primary/50"
        >
          TODO
        </motion.div>
      </>
    );
  }
  if (theme === "photoshop") {
    return (
      <>
        {/* floating layers */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -4 + i * 2, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
            className="absolute border border-primary/20 rounded"
            style={{
              width: 28 - i * 4,
              height: 18 - i * 2,
              top: 10 + i * 14,
              left: 6 + i * 8,
              backgroundColor: `color-mix(in srgb, ${color} ${20 + i * 10}%, transparent)`,
            }}
          />
        ))}
        {/* brush stroke */}
        <motion.div
          animate={{ scaleX: [0, 1, 1, 0], originX: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-6 w-16 h-1 rounded-full"
          style={{ backgroundColor: color }}
        />
        {/* selection box */}
        <motion.div
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-14 right-6 w-8 h-8 border-2 border-dashed rounded"
          style={{ borderColor: color }}
        />
      </>
    );
  }
  if (theme === "illustrator") {
    return (
      <>
        {/* bezier curve */}
        <svg className="absolute top-6 left-4 w-20 h-16 pointer-events-none" viewBox="0 0 80 60" fill="none">
          <motion.path
            d="M5,50 C20,5 60,5 75,50"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="5" cy="50" r="3" fill="var(--color-primary)" opacity={0.4} />
          <circle cx="75" cy="50" r="3" fill="var(--color-primary)" opacity={0.4} />
        </svg>
        {/* floating shapes */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-8 right-8 w-6 h-6 border-2 rounded-sm opacity-30"
          style={{ borderColor: color }}
        />
        <motion.div
          animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-14 left-8 w-0 h-0 opacity-30"
          style={{
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderBottom: `10px solid ${color}`,
          }}
        />
      </>
    );
  }
  if (theme === "notion") {
    return (
      <>
        {/* checklist */}
        <div className="absolute top-8 left-4 flex flex-col gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={i < 2 ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              className="flex items-center gap-1"
            >
              <div
                className={`w-3 h-3 border border-primary/30 rounded-sm ${
                  i < 2 ? "bg-[var(--color-accent-green)]/40" : ""
                }`}
              />
              <div className="w-8 h-1 bg-primary/15 rounded-full" />
            </motion.div>
          ))}
        </div>
        {/* floating note */}
        <motion.div
          animate={{ y: [0, -4, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-8 right-6 w-12 h-8 bg-surface border border-primary/20 rounded-sm p-1"
        >
          <div className="w-full h-1 bg-primary/15 rounded-full mb-1" />
          <div className="w-3/4 h-1 bg-primary/10 rounded-full" />
        </motion.div>
      </>
    );
  }
  // stitch
  return (
    <>
      {/* AI node network */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" fill="none">
        <motion.line
          x1="20" y1="25" x2="50" y2="50"
          stroke={color}
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.line
          x1="80" y1="30" x2="50" y2="50"
          stroke={color}
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
        <motion.line
          x1="50" y1="50" x2="35" y2="80"
          stroke={color}
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        <motion.circle cx="20" cy="25" r="3" fill={color} animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="80" cy="30" r="3" fill={color} animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} />
        <motion.circle cx="50" cy="50" r="4" fill={color} animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }} />
        <motion.circle cx="35" cy="80" r="3" fill={color} animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.8 }} />
      </svg>
      {/* glowing center pulse */}
      <motion.div
        animate={{ scale: [1, 1.8, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full pointer-events-none"
        style={{ backgroundColor: color }}
      />
    </>
  );
}

/* ════════════════════════════════════════════════════
   MAIN SECTION
   ════════════════════════════════════════════════════ */
export default function ToolboxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sparkles, setSparkles] = useState<{ top: string; left: string; delay: number }[]>([]);

  useEffect(() => {
    setSparkles(
      [...Array(10)].map(() => ({
        top: `${8 + Math.random() * 84}%`,
        left: `${4 + Math.random() * 92}%`,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-32 px-6 bg-surface relative overflow-hidden border-t-4 border-primary"
    >
      {/* ── sparkles ── */}
      {sparkles.map((s, i) => (
        <Sparkle key={`sp-${i}`} style={{ top: s.top, left: s.left }} delay={s.delay} />
      ))}

      {/* ── ambient particles ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            animate={{
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 12 : -12, 0],
              opacity: [0.1, 0.35, 0.1],
            }}
            transition={{ duration: 7 + i, repeat: Infinity, delay: i * 0.7 }}
            className="absolute w-1.5 h-1.5 bg-primary/15 rounded-full"
            style={{ top: `${12 + i * 10}%`, left: `${8 + i * 11}%` }}
          />
        ))}
      </div>

      {/* ── floating draggable stars ── */}
      <motion.div
        drag
        dragConstraints={containerRef}
        whileDrag={{ scale: 1.15, cursor: "grabbing" }}
        whileHover={{ scale: 1.4, rotate: 90 }}
        animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-20 right-[12%] w-6 h-6 bg-[var(--color-accent-yellow)] rotate-45 border-2 border-primary shadow-[2px_2px_0px_var(--color-primary)] cursor-grab pointer-events-auto z-10"
      />
      <motion.div
        drag
        dragConstraints={containerRef}
        whileDrag={{ scale: 1.15, cursor: "grabbing" }}
        whileHover={{ scale: 1.4, rotate: -90 }}
        animate={{ y: [0, 12, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute bottom-28 left-[8%] w-7 h-7 bg-[var(--color-accent-red)] rotate-45 border-2 border-primary shadow-[2px_2px_0px_var(--color-primary)] cursor-grab pointer-events-auto z-10"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 className="font-pixel text-5xl md:text-6xl text-primary mb-4 drop-shadow-[4px_4px_0px_#E0D8C8]">
            CREATIVE TOOLBOX
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-secondary font-semibold text-lg max-w-lg mx-auto"
          >
            The digital tools behind my ideas, experiments, and creative workflows.
          </motion.p>

          {/* decorative tool icons */}
          <div className="flex justify-center gap-3 mt-6">
            {["🎨", "🖌️", "✏️", "📝", "🤖"].map((e, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -5, 0], rotate: [0, i % 2 === 0 ? 8 : -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                className="w-9 h-9 flex items-center justify-center border-2 border-primary rounded-lg bg-white/60 shadow-[2px_2px_0px_var(--color-primary)] text-lg"
              >
                {e}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── Tool Cards Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <TiltCard
              key={tool.name}
              color={tool.color}
              className={`p-6 min-h-[320px] flex flex-col justify-end ${
                /* last 2 cards: center in a 2-col subgrid on lg */
                index === 3 ? "lg:col-start-1 lg:justify-self-end lg:ml-auto" : ""
              }${index === 4 ? "lg:col-start-2 lg:col-end-3" : ""}`}
            >
              {/* Themed background decorations */}
              <ThemedDecor theme={tool.theme} color={tool.color} />

              {/* Floating hover icons */}
              <FloatingIcons icons={tool.hoverIcons} />

              {/* Soft color wash on hover */}
              <motion.div
                animate={{ opacity: [0.03, 0.1, 0.03] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 mix-blend-overlay rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: tool.color }}
              />

              {/* Card Content */}
              <div className="relative z-10 mt-auto">
                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    animate={{ y: [0, -3, 0], rotate: [0, 4, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-12 h-12 flex items-center justify-center border-4 border-primary rounded-xl text-2xl shadow-[3px_3px_0px_var(--color-primary)]"
                    style={{ backgroundColor: tool.color }}
                  >
                    {tool.emoji}
                  </motion.div>
                  <div>
                    <h3 className="font-pixel text-xl text-primary leading-tight">{tool.name}</h3>
                    <span className="text-xs font-bold text-secondary">{tool.tagline}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-secondary font-semibold text-sm leading-relaxed mb-4">
                  {tool.description}
                </p>

                {/* Mini feature pills */}
                <div className="flex flex-wrap gap-2">
                  {tool.miniItems.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      whileHover={{ y: -3, scale: 1.08, rotate: i % 2 === 0 ? 2 : -2 }}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold border-2 border-primary rounded-lg shadow-[2px_2px_0px_var(--color-primary)] bg-surface cursor-pointer"
                    >
                      <span className="opacity-60">{item.icon}</span> {item.label}
                    </motion.div>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
