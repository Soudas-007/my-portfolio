"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    id: 1,
    role: "UI/UX DESIGN INTERN",
    company: "PLUM STAYS",
    period: "2025 - 2026",
    desc: "Created modern UI screens and high-fidelity prototypes for web, tablet, and app interfaces. Visualized user flows and collaborated with teams to refine outputs.",
    icon: "🖥️",
    tags: ["FIGMA", "UI DESIGN", "PROTOTYPING"]
  },
  {
    id: 2,
    role: "ADMINISTRATIVE ASSISTANT",
    company: "ELEGANT INTERIOR",
    period: "2024 - 2025",
    desc: "Managed scheduling, documentation, and coordinated communication across internal teams and external stakeholders to significantly improve workflow efficiency.",
    icon: "📁",
    tags: ["MANAGEMENT", "COMMUNICATION", "WORKFLOW"]
  },
  {
    id: 3,
    role: "FREELANCE 3D DESIGNER",
    company: "SELF-EMPLOYED",
    period: "2022 - 2024",
    desc: "Delivered end-to-end 3D client projects, managing timelines and revisions independently. Collaborated with developers to integrate visual assets into production environments.",
    icon: "🧊",
    tags: ["3D DESIGN", "ASSET INTEGRATION"]
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-32 px-4 sm:px-6 bg-[#FDFBF7] relative overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(var(--color-primary) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      
      <div className="w-full max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-pixel text-4xl md:text-6xl text-primary mb-4"
          >
            JOURNEY SO FAR
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-secondary font-bold text-sm md:text-lg max-w-2xl mx-auto uppercase tracking-widest"
          >
            Professional milestones and collaborations.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical Progress Line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-1.5 bg-primary/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full bg-primary"
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-16">
            {experiences.map((exp, i) => (
              <motion.div 
                key={exp.id} 
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`relative flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center md:items-start`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-4 w-6 h-6 rounded-full border-4 border-primary bg-white z-20 shadow-[0px_0px_0px_6px_rgba(0,0,0,0.05)]" />

                {/* Content Card */}
                <div className={`w-full md:w-[45%] ml-12 md:ml-0 ${i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                  <div className="bg-white border-3 border-primary rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_var(--color-primary)] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_var(--color-primary)] transition-all">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 shrink-0 bg-surface border-3 border-primary rounded-xl flex items-center justify-center text-3xl shadow-[3px_3px_0px_var(--color-primary)]">
                        {exp.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-pixel text-lg md:text-xl font-bold text-primary mb-1">
                              {exp.role}
                            </h3>
                            <p className="text-sm font-bold text-secondary uppercase tracking-wider">
                              {exp.company}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-surface border-2 border-primary rounded-full text-[10px] font-bold text-primary shadow-[2px_2px_0px_var(--color-primary)]">
                            {exp.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-secondary font-medium text-sm md:text-base leading-relaxed mb-6">
                      {exp.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2.5 py-1 bg-white border-2 border-primary rounded-lg text-[9px] md:text-[10px] font-bold uppercase shadow-[2px_2px_0px_var(--color-primary)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
