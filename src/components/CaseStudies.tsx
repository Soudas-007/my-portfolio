"use client";

import { motion } from "framer-motion";

export default function CaseStudies() {
  const projects = [
    {
      title: "Curiva",
      category: "Healthcare App",
      color: "var(--color-accent-blue)",
      description: "A digital healthcare platform integrating doctor consultations, emergency services, medicine delivery, and lab testing.",
      theme: "healthcare"
    },
    {
      title: "Travelkit",
      category: "Travel Platform",
      color: "var(--color-accent-green)",
      description: "A comprehensive travel planning platform designed to reduce pre-trip anxiety by simplifying planning, managing travel documents, and smart checklists.",
      theme: "travel"
    },
    {
      title: "NexBank",
      category: "Fintech Dashboard",
      color: "var(--color-accent-yellow)",
      description: "A mobile banking app designed to make everyday banking clear, intuitive, and approachable for all users.",
      theme: "banking"
    }
  ];

  return (
    <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 bg-surface relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-pixel text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary mb-10 sm:mb-16 text-center drop-shadow-[4px_4px_0px_#E0D8C8]"
        >
          FEATURED WORK
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -15,
                rotateX: 5,
                rotateY: -5,
                boxShadow: `12px 12px 0px ${project.color}`,
                borderColor: project.color
              }}
              whileTap={{ scale: 0.97 }}
              className="group relative bg-white/50 backdrop-blur-sm border-4 border-primary rounded-2xl p-5 sm:p-6 min-h-[280px] sm:h-96 flex flex-col justify-end overflow-hidden cursor-pointer shadow-[6px_6px_0px_var(--color-primary)] transition-colors duration-300"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Background Thematic Hover Effects */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
                {project.theme === "healthcare" && (
                  <>
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 bg-[var(--color-accent-blue)] mix-blend-overlay" />
                    <motion.div initial={{ y: 50, opacity: 0 }} whileHover={{ y: -50, opacity: 1 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/4 text-4xl">💊</motion.div>
                    <motion.div initial={{ y: 50, opacity: 0 }} whileHover={{ y: -80, opacity: 1 }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }} className="absolute top-1/3 right-1/4 text-4xl text-[var(--color-accent-red)] font-bold">+</motion.div>
                  </>
                )}
                {project.theme === "travel" && (
                  <>
                    <motion.div animate={{ x: [-20, 20, -20] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 left-10 w-20 h-8 bg-white/80 rounded-full blur-md" />
                    <motion.div initial={{ x: -50, y: 50, opacity: 0 }} whileHover={{ x: 300, y: -100, opacity: 1 }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-0 text-5xl">✈️</motion.div>
                  </>
                )}
                {project.theme === "banking" && (
                  <>
                    <motion.div animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-[var(--color-accent-yellow)] mix-blend-overlay" />
                    <svg className="absolute bottom-10 left-0 w-full h-24" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <motion.path d="M0,20 L20,15 L40,18 L60,5 L80,10 L100,2" fill="none" stroke="var(--color-primary)" strokeWidth="2" initial={{ pathLength: 0 }} whileHover={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                    </svg>
                    <motion.div initial={{ y: 50, opacity: 0 }} whileHover={{ y: -50, opacity: 1 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute top-1/3 left-1/2 text-4xl">🪙</motion.div>
                  </>
                )}
              </div>

              {/* Window Buttons */}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <div className="w-3 h-3 rounded-full border border-primary bg-[var(--color-accent-red)]" />
                <div className="w-3 h-3 rounded-full border border-primary bg-[var(--color-accent-yellow)]" />
                <div className="w-3 h-3 rounded-full border border-primary bg-[var(--color-accent-green)]" />
              </div>

              {/* Card Content */}
              <div className="bg-white border-2 border-primary rounded-xl p-3 sm:p-4 group-hover:-translate-y-2 transition-transform duration-300 z-10 relative">
                <div
                  className="inline-block px-3 py-1 text-xs font-bold border-2 border-primary rounded-full mb-2 sm:mb-3 shadow-[2px_2px_0px_var(--color-primary)]"
                  style={{ backgroundColor: project.color }}
                >
                  {project.category}
                </div>
                <h3 className="font-pixel text-xl sm:text-2xl text-primary font-bold mb-1 sm:mb-2">{project.title}</h3>
                <p className="text-secondary text-xs sm:text-sm font-semibold">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
