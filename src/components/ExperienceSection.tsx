"use client";

import { motion } from "framer-motion";

const experiences = [
  { 
    id: 1, 
    role: "UI/UX Design Intern", 
    company: "Stark Design Lab", 
    period: "2023 - Pres.", 
    desc: "Leading the design for a series of Web3 dashboards, focusing on data visualization and complex user flows.", 
    color: "var(--color-accent-blue)", 
    tags: ["Figma", "Web3", "Dashboards"], 
    icon: "🔬" 
  },
  { 
    id: 2, 
    role: "Freelance Designer", 
    company: "Various Clients", 
    period: "2022 - 2023", 
    desc: "Crafted visual identities, motion graphics, and high-converting landing pages for emerging startups.", 
    color: "var(--color-accent-yellow)", 
    tags: ["Branding", "AI", "Motion"], 
    icon: "🎨" 
  },
  { 
    id: 3, 
    role: "Product Designer", 
    company: "Innovate Hub", 
    period: "2021 - 2022", 
    desc: "Built internal tools and design systems to streamline cross-functional collaboration and prototyping.", 
    color: "var(--color-accent-green)", 
    tags: ["SaaS", "Systems"], 
    icon: "🏗️" 
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-fluid-section px-6 relative overflow-hidden bg-surface/30">
      {/* Handcrafted Detail - Drawn Path */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full">
          <motion.path
            d="M50% 0 L50% 100%"
            stroke="var(--color-primary)"
            strokeWidth="40"
            strokeDasharray="100 100"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
        </svg>
      </div>

      <div className="w-full max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 sm:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-pixel text-fluid-h1 text-primary mb-4"
          >
            JOURNEY
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-secondary font-bold text-fluid-body uppercase tracking-widest"
          >
            Milestones & Collaborations
          </motion.p>
        </div>

        <div className="relative flex flex-col gap-12 lg:gap-20">
          {/* Central Line - Mobile logic handled via absolute positioning */}
          <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-primary/10" />

          {experiences.map((exp, i) => (
            <motion.div 
              key={exp.id} 
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 80 }}
              className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
            >
              {/* Connector Point */}
              <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-4 border-primary rounded-full z-20 shadow-[0_0_0_8px_rgba(0,0,0,0.03)]" />

              {/* Card Container */}
              <div className={`w-full lg:w-[45%] pl-16 lg:pl-0 ${i % 2 === 0 ? "lg:pr-12 text-left lg:text-right" : "lg:pl-12 text-left"}`}>
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white border-3 border-primary rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_var(--color-primary)] hover:shadow-[12px_12px_0px_var(--color-primary)] transition-all flex flex-col gap-4 relative overflow-hidden"
                >
                  {/* Icon Badge */}
                  <div className={`w-14 h-14 shrink-0 bg-background border-2 border-primary rounded-2xl flex items-center justify-center text-3xl shadow-[4px_4px_0px_var(--color-primary)] ${i % 2 === 0 ? "lg:self-end" : "lg:self-start"}`}>
                    {exp.icon}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-accent-blue uppercase tracking-widest bg-accent-blue/5 px-2 py-1 rounded-md">{exp.period}</span>
                    <h3 className="font-pixel text-fluid-h2 text-primary pt-2 uppercase">{exp.role}</h3>
                    <p className="text-secondary font-bold text-sm uppercase tracking-tighter opacity-60">{exp.company}</p>
                  </div>

                  <p className="text-primary/70 text-sm font-medium leading-relaxed">
                    {exp.desc}
                  </p>

                  {/* Tool Badges */}
                  <div className={`flex flex-wrap gap-2 pt-2 ${i % 2 === 0 ? "lg:justify-end" : "lg:justify-start"}`}>
                    {exp.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-surface border-2 border-primary rounded-lg text-[10px] font-bold shadow-[2px_2px_0px_var(--color-primary)]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Accent Highlight */}
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.05] pointer-events-none rotate-45 translate-x-12 -translate-y-12 bg-primary" />
                </motion.div>
              </div>
              
              {/* Spacer for reverse layout alignment */}
              <div className="hidden lg:block lg:w-[45%]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
