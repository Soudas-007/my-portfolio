"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: "curiva",
    title: "CURIVA",
    subheading: "Telemedicine & Healthcare App",
    headline: "Curiva — User-Centered Healthcare Platform.",
    description: "Architected an end-to-end telemedicine solution focused on optimizing doctor discovery and remote consultations. Conducted extensive UX research and wireframing to create intuitive flows that reduce friction in the patient booking experience.",
    techStack: ["Figma", "UX Research", "Wireframing", "User Flows"],
    image: "/curiva.png",
    link: "https://www.behance.net/gallery/246346637/Curiva-Healthcare-App-UIUX-Case-Study",
    color: "var(--color-accent-blue)"
  },
  {
    id: "travelkit",
    title: "TRAVELKIT",
    subheading: "Website Landing Page",
    headline: "Travelkit — Conversion-Optimized Travel Planning.",
    description: "Designed a high-conversion landing page featuring smart trip-planning tools and interactive components. Focused on blending storytelling with functional design to drive user engagement through interactive prototypes.",
    techStack: ["Figma", "Adobe Photoshop", "UI Design", "Prototyping"],
    image: "/travelkit.png",
    link: "https://www.behance.net/gallery/241336681/TravelKit-Website-Landing-Page",
    color: "var(--color-accent-yellow)"
  },
  {
    id: "nexbank",
    title: "NEXBANK",
    subheading: "Mobile Banking App",
    headline: "NexBank — Streamlined Digital Banking Ecosystem.",
    description: "Engineered a low-cognitive-load mobile banking interface focused on intuitive financial user journeys. Developed streamlined navigation patterns and a clean UI to simplify complex transactions.",
    techStack: ["Figma", "UI Design", "User Flows", "Prototyping"],
    image: "/nexbank.png",
    link: "https://www.behance.net/gallery/241059653/NexBank-A-Mobile-Banking-App-UXUI-Case-Study",
    color: "var(--color-accent-green)"
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col md:flex-row items-stretch bg-white border-3 border-primary rounded-[20px] overflow-hidden shadow-[8px_8px_0px_var(--color-pixel-dark)] hover:shadow-[12px_12px_0px_var(--color-pixel-dark)] transition-all cursor-pointer mb-12"
    >
      {/* Left: Illustration Hook */}
      <div className="relative w-full md:w-2/5 min-h-[250px] md:min-h-full bg-surface border-b-3 md:border-b-0 md:border-r-3 border-primary overflow-hidden">
        <div className="absolute inset-0 p-6 flex items-center justify-center">
          <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
            <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              className="object-contain drop-shadow-[10px_10px_0px_rgba(0,0,0,0.1)]"
            />
          </div>
        </div>
        {/* Decorative corner tag */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-white border-2 border-primary rounded-full text-[10px] font-bold shadow-[3px_3px_0px_var(--color-primary)] z-10">
          CASE STUDY
        </div>
      </div>

      {/* Right: Details */}
      <div className="flex-1 p-6 md:p-10 flex flex-col justify-center bg-white relative">
        <div className="mb-4">
          <span className="font-pixel text-[10px] sm:text-xs font-bold text-secondary uppercase tracking-widest block mb-1">
            {project.subheading}
          </span>
          <h3 className="font-pixel text-2xl md:text-3xl font-bold text-primary mb-3">
            {project.headline}
          </h3>
          <p className="text-secondary font-medium text-sm md:text-base leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.map((tech) => (
            <span 
              key={tech} 
              className="px-3 py-1 bg-primary text-white text-[10px] md:text-xs font-bold rounded-full tracking-wide uppercase"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* View on Behance Link/Icon */}
        <div className="flex items-center gap-3 text-primary font-pixel text-xs md:text-sm font-bold group/link">
          <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center bg-[var(--color-accent-blue)]/20 group-hover/link:bg-[var(--color-accent-blue)] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </div>
          VIEW FULL CASE STUDY ON BEHANCE
        </div>
      </div>
    </motion.a>
  );
}

export default function CaseStudies() {
  return (
    <section id="work" className="py-20 md:py-32 px-4 sm:px-6 relative bg-background overflow-hidden">
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-pixel text-4xl md:text-6xl text-primary mb-4"
          >
            PROJECTS
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            className="h-1.5 bg-primary mx-auto mb-6 rounded-full"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-secondary font-bold text-sm md:text-lg max-w-2xl mx-auto uppercase tracking-wider"
          >
            Selected digital works focusing on User Experience and Visual Storytelling.
          </motion.p>
        </div>

        <div className="flex flex-col gap-8 md:gap-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
