"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    id: "clev-flow",
    category: "Fintech • Dashboard",
    title: "ClevFlow",
    tagline: "High-fidelity crypto management system.",
    uxFocus: "Data Visualization & Accessibility",
    tools: ["Figma", "React", "D3.js"],
    description: "Designing a seamless experience for modern asset management and crypto tracking with complex data layers.",
    color: "var(--color-accent-blue)",
    icon: "💳",
    stats: ["98% Efficiency", "Real-time Sync"]
  },
  {
    id: "travel-app",
    category: "Leisure • Mobile App",
    title: "Travel-U",
    tagline: "Social travel discovery platform.",
    uxFocus: "Interaction Design & Storytelling",
    tools: ["Figma", "Framer", "SwiftUI"],
    description: "A playful interface for discovering hidden gems and local travel experiences through community-driven content.",
    color: "var(--color-accent-green)",
    icon: "✈️",
    stats: ["iOS & Android", "4.9★ Store"]
  },
  {
    id: "next-bank",
    category: "Banking • Brand Identity",
    title: "NextBank",
    tagline: "Reimagining trust in digital banking.",
    uxFocus: "Visual Hierarchy & Trust Systems",
    tools: ["Adobe CC", "Figma", "Next.js"],
    description: "Architecting a secure, transparent, and visually engaging banking experience for the next generation of users.",
    color: "var(--color-accent-yellow)",
    icon: "🏦",
    stats: ["Secure UI", "Global Core"]
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col h-full"
    >
      {/* Premium Card Container */}
      <div className="relative bg-white border-3 border-primary rounded-3xl overflow-hidden shadow-[8px_8px_0px_var(--color-primary)] transition-all duration-500 group-hover:shadow-[12px_12px_0px_var(--color-primary)] group-hover:-translate-y-2 flex flex-col h-full">
        
        {/* Mockup / Visual Area */}
        <div className="relative h-64 sm:h-72 bg-surface overflow-hidden border-b-3 border-primary flex items-center justify-center">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          
          <motion.div 
            animate={{ 
              scale: isHovered ? 1.05 : 1,
              rotate: isHovered ? [0, -1, 1, 0] : 0 
            }}
            transition={{ duration: 0.5 }}
            className="text-7xl sm:text-8xl drop-shadow-2xl relative z-10"
          >
            {project.icon}
          </motion.div>

          {/* Floating Category Tag */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-primary text-white text-[9px] font-bold rounded-full uppercase tracking-widest">
              {project.category}
            </span>
          </div>

          {/* Stats Badges */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            {project.stats.map((stat, i) => (
              <span key={i} className="px-2 py-1 bg-white border-2 border-primary rounded-lg text-[8px] font-bold shadow-[3px_3px_0px_var(--color-primary)]">
                {stat}
              </span>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col">
          <div className="mb-4">
            <h3 className="font-pixel text-fluid-h2 text-primary mb-1">{project.title}</h3>
            <p className="text-secondary font-bold text-xs uppercase tracking-tight">{project.tagline}</p>
          </div>

          <p className="text-primary/70 text-sm font-medium leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="mt-auto space-y-4">
            {/* UX Focus Detail */}
            <div className="p-3 bg-primary/5 rounded-xl border border-primary/5">
              <span className="text-[9px] font-bold text-primary/40 uppercase block mb-1">UX Focus</span>
              <span className="text-[10px] font-bold text-primary">{project.uxFocus}</span>
            </div>

            {/* Tools Stack */}
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="px-2.5 py-1 bg-background border-2 border-primary rounded-md text-[9px] font-bold">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="border-t-3 border-primary/5 px-8 py-5 bg-primary/[0.02] flex justify-between items-center group/btn cursor-pointer">
          <span className="font-pixel text-xs font-bold text-primary group-hover/btn:text-accent-blue transition-colors">EXPLORE CASE STUDY</span>
          <motion.div 
            animate={{ x: isHovered ? 5 : 0 }}
            className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center bg-white shadow-[2px_2px_0px_var(--color-primary)]"
          >
            <span className="text-xs font-bold">→</span>
          </motion.div>
        </div>
      </div>
      
      {/* Interaction Particles on Hover */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute w-20 h-20 bg-accent-blue rounded-full blur-2xl"
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  top: `${Math.random() * 100}%` 
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CaseStudies() {
  return (
    <section id="work" className="py-fluid-section px-6 relative overflow-hidden bg-background">
      {/* Background Storytelling Details */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.02] select-none">
        <span className="absolute top-1/4 -left-10 text-[15rem] font-bold rotate-90">PROJECTS</span>
        <span className="absolute bottom-1/4 -right-10 text-[15rem] font-bold -rotate-90">STUDIES</span>
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="mb-16 sm:mb-24">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-pixel text-fluid-h1 text-primary mb-4"
          >
            FEATURED WORK
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-secondary font-semibold text-fluid-body max-w-xl"
          >
            A curated selection of digital products where logic meets emotion. Each case study explores a unique challenge in the UI/UX landscape.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-14">
          {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </div>

        {/* Cinematic Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <a href="#contact" className="inline-flex items-center gap-4 group">
            <span className="text-secondary font-bold text-fluid-body border-b-2 border-transparent group-hover:border-primary transition-all">Want to see more? Let&apos;s connect</span>
            <div className="w-12 h-12 rounded-full border-3 border-primary flex items-center justify-center bg-accent-yellow shadow-[4px_4px_0px_var(--color-primary)]">
              <span className="text-xl">🤝</span>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
