"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    id: "clev-flow",
    title: "ClevFlow",
    tagline: "Fintech Dashboard",
    description: "Designing a seamless experience for modern asset management and crypto tracking.",
    color: "var(--color-accent-blue)",
    icon: "💳",
    stats: ["98% Score", "Real-time"]
  },
  {
    id: "travel-app",
    title: "Travel-U",
    tagline: "Leisure Booking",
    description: "A playful interface for discovering hidden gems and local travel experiences.",
    color: "var(--color-accent-green)",
    icon: "✈️",
    stats: ["Mobile-first", "Social"]
  },
  {
    id: "next-bank",
    title: "NextBank",
    tagline: "Digital Banking",
    description: "Reimagining the traditional banking app with a focus on visual storytelling.",
    color: "var(--color-accent-yellow)",
    icon: "🏦",
    stats: ["Fast UI", "High Trust"]
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white/60 backdrop-blur-md border-2 sm:border-3 border-primary rounded-xl sm:rounded-2xl p-1 flex flex-col overflow-hidden shadow-[4px_4px_0px_var(--color-primary)] sm:shadow-[6px_6px_0px_var(--color-primary)] transition-all hover:shadow-[8px_8px_0px_var(--color-primary)]"
    >
      <div className="relative aspect-[4/3] sm:aspect-auto sm:h-[180px] md:h-[200px] lg:h-[220px] bg-surface rounded-[10px] sm:rounded-[18px] overflow-hidden border border-primary/10">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white to-background/50">
          <motion.div animate={{ scale: isHovered ? 1.1 : 1 }} className="text-3xl sm:text-4xl md:text-5xl">{project.icon}</motion.div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)", backgroundSize: "15px 15px" }} />
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }} className="absolute inset-0 bg-primary/80 backdrop-blur-sm p-4 flex flex-col justify-center items-center text-center text-white">
          <p className="text-[10px] font-semibold mb-3 leading-relaxed max-w-[160px]">{project.description}</p>
          <button className="px-3 py-1 bg-white text-primary font-pixel text-[8px] rounded-full border-2 border-primary shadow-[2px_2px_0px_var(--color-primary)] font-bold">VIEW WORK</button>
        </motion.div>
        <div className="absolute top-2 left-2 flex gap-1">
          {project.stats.map((stat, i) => (
             <span key={i} className="px-1.5 py-0.5 bg-white border-2 border-primary rounded-full text-[6px] font-bold shadow-[1.5px_1.5px_0px_var(--color-primary)]">{stat}</span>
          ))}
        </div>
      </div>
      <div className="p-3 flex flex-col">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-pixel text-[10px] sm:text-xs font-bold text-primary truncate uppercase">{project.title}</h3>
          <span className="text-[7px] px-1.5 py-0.5 rounded-full border-2 border-primary font-bold shadow-[1.5px_1.5px_0px_var(--color-primary)]" style={{ backgroundColor: project.color }}>UI</span>
        </div>
        <p className="text-secondary font-bold text-[8px] sm:text-[9px] tracking-tight">{project.tagline}</p>
      </div>
      <div className="mt-auto border-t-2 border-primary/5 p-1.5 flex justify-between items-center bg-white/30">
        <div className="flex -space-x-1">{[1,2].map(i => <div key={i} className="w-3 h-3 rounded-full border border-primary bg-background" />)}</div>
        <motion.div animate={{ x: isHovered ? 2 : 0 }} className="text-primary font-pixel text-[8px] font-bold flex items-center gap-1 cursor-pointer">GO <span className="text-[10px]">→</span></motion.div>
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  return (
    <section id="work" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background relative overflow-hidden">
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-pixel text-fluid-h2 text-primary mb-2">FEATURED WORK</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-secondary font-semibold text-[10px] sm:text-xs max-w-lg mx-auto">A selection of projects where logic meets emotion.</motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 w-full">
          {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </div>
      </div>
    </section>
  );
}
