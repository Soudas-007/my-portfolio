"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ── Software SVG Icons ── */
function FigmaIcon() {
  return (
    <svg viewBox="0 0 38 57" fill="none" className="w-full h-full">
      <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5z" fill="#1ABCFE"/>
      <path d="M9.5 47.5A9.5 9.5 0 0 1 19 38v9.5a9.5 9.5 0 0 1-9.5 9.5z" fill="#0ACF83"/>
      <path d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z" fill="#A259FF"/>
      <path d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" fill="#F24E1E"/>
      <path d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19z" fill="#FF7262"/>
    </svg>
  );
}

function PhotoshopIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" rx="18" fill="#001E36"/>
      <text x="50" y="68" textAnchor="middle" fill="#31A8FF" fontFamily="Arial" fontWeight="900" fontSize="48">Ps</text>
    </svg>
  );
}

function IllustratorIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" rx="18" fill="#310000"/>
      <text x="50" y="68" textAnchor="middle" fill="#FF9A00" fontFamily="Arial" fontWeight="900" fontSize="48">Ai</text>
    </svg>
  );
}

function NotionIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" rx="18" fill="#FFFFFF"/>
      <rect width="100" height="100" rx="18" fill="none" stroke="#000" strokeWidth="4"/>
      <text x="50" y="68" textAnchor="middle" fill="#000000" fontFamily="Arial" fontWeight="900" fontSize="52">N</text>
    </svg>
  );
}

function StitchIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" rx="18" fill="#4285F4"/>
      <text x="50" y="62" textAnchor="middle" fill="white" fontFamily="Arial" fontWeight="900" fontSize="36">AI</text>
      <text x="50" y="82" textAnchor="middle" fill="white" fontFamily="Arial" fontSize="14">Stitch</text>
    </svg>
  );
}

/* ── Tilt Card ── */
function TiltCard({ children, color, className = "" }: { children: React.ReactNode; color: string; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 200, damping: 20 });
  const my = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(my, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mx, [-0.5, 0.5], ["-8deg", "8deg"]);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ y: -8, boxShadow: `8px 8px 0px ${color}`, borderColor: color, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative bg-white/60 backdrop-blur-sm border-4 border-primary rounded-2xl shadow-[5px_5px_0px_var(--color-primary)] transition-colors duration-300 overflow-hidden cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Sparkle({ style, delay }: { style: React.CSSProperties; delay: number }) {
  return (
    <motion.div
      animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: [0, 180] }}
      transition={{ duration: 2.5, repeat: Infinity, delay }}
      className="absolute w-3 h-3 pointer-events-none z-0"
      style={style}
    >
      <svg viewBox="0 0 24 24" fill="var(--color-accent-yellow)" className="w-full h-full">
        <path d="M12 0l3 9h9l-7.5 5.5L19.5 24 12 18l-7.5 6 3-9.5L0 9h9z" />
      </svg>
    </motion.div>
  );
}

const tools = [
  {
    name: "Figma",
    tagline: "UI Design",
    color: "var(--color-accent-blue)",
    Icon: FigmaIcon,
    description: "Wireframing, prototyping & design systems.",
    miniItems: ["Auto Layout", "Components", "Prototypes"],
  },
  {
    name: "Photoshop",
    tagline: "Photo Editing",
    color: "var(--color-accent-red)",
    Icon: PhotoshopIcon,
    description: "Image editing, compositing & pixel-perfect visuals.",
    miniItems: ["Layers", "Brushes", "Masks"],
  },
  {
    name: "Illustrator",
    tagline: "Vector Art",
    color: "var(--color-accent-yellow)",
    Icon: IllustratorIcon,
    description: "Vector illustration & scalable graphics.",
    miniItems: ["Pen Tool", "Vectors", "Shapes"],
  },
  {
    name: "Notion",
    tagline: "Organization",
    color: "var(--color-accent-green)",
    Icon: NotionIcon,
    description: "Research, project wikis & documentation.",
    miniItems: ["Databases", "Wikis", "Tasks"],
  },
  {
    name: "Stitch",
    tagline: "AI Design",
    color: "var(--color-accent-blue)",
    Icon: StitchIcon,
    description: "AI-powered design generation & workflows.",
    miniItems: ["AI Gen", "Nodes", "Iterate"],
  },
];

export default function ToolboxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sparkles, setSparkles] = useState<{ top: string; left: string; delay: number }[]>([]);

  useEffect(() => {
    requestAnimationFrame(() => {
      setSparkles([...Array(8)].map(() => ({
        top: `${8 + Math.random() * 84}%`,
        left: `${4 + Math.random() * 92}%`,
        delay: Math.random() * 4,
      })));
    });
  }, []);

  return (
    <section ref={containerRef} className="py-20 sm:py-28 px-4 sm:px-6 bg-surface relative overflow-hidden">
      {sparkles.map((s, i) => (
        <Sparkle key={i} style={{ top: s.top, left: s.left }} delay={s.delay} />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.h2 className="font-pixel text-3xl sm:text-4xl md:text-5xl text-primary mb-3 drop-shadow-[4px_4px_0px_#E0D8C8]">
            CREATIVE TOOLBOX
          </motion.h2>
          <p className="text-secondary font-semibold text-sm sm:text-base max-w-lg mx-auto">
            The digital tools behind my ideas, experiments, and creative workflows.
          </p>
        </motion.div>

        {/* Single-row 5-card grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {tools.map((tool, index) => (
            <TiltCard key={tool.name} color={tool.color} className="p-4 sm:p-5">
              {/* Soft color wash on hover */}
              <motion.div
                animate={{ opacity: [0.03, 0.08, 0.03] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 mix-blend-overlay rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: tool.color }}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2.5 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-10 h-10 sm:w-12 sm:h-12 mb-3 flex-shrink-0"
                >
                  <tool.Icon />
                </motion.div>

                {/* Name & tagline */}
                <h3 className="font-pixel text-sm sm:text-base text-primary leading-tight mb-0.5">{tool.name}</h3>
                <span className="text-[10px] sm:text-xs font-bold text-secondary mb-2 sm:mb-3">{tool.tagline}</span>

                {/* Description */}
                <p className="text-secondary font-semibold text-[10px] sm:text-xs leading-relaxed mb-2 sm:mb-3 hidden sm:block">{tool.description}</p>

                {/* Mini pills */}
                <div className="flex flex-col gap-1 mt-auto">
                  {tool.miniItems.map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 3, scale: 1.04 }}
                      className="px-2 py-0.5 text-[9px] sm:text-[10px] font-bold border border-primary rounded-md bg-white/70 w-fit"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 rounded-b-2xl" style={{ backgroundColor: tool.color }} />
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
