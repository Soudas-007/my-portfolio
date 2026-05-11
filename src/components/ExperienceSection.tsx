"use client";

import { motion } from "framer-motion";

const experiences = [
  { id: 1, role: "UI/UX Design Intern", company: "Stark Design Lab", period: "2023 - Pres.", desc: "Leading the design for a series of Web3 dashboards.", color: "var(--color-accent-blue)", tags: ["Figma", "Web3"], icon: "🔬" },
  { id: 2, role: "Freelance Designer", company: "Various Clients", period: "2022 - 2023", desc: "Crafted visual identities and landing pages.", color: "var(--color-accent-yellow)", tags: ["Branding", "AI"], icon: "🎨" },
  { id: 3, role: "Product Designer", company: "Innovate Hub", period: "2021 - 2022", desc: "Built internal tools for data visualization.", color: "var(--color-accent-green)", tags: ["Product", "SaaS"], icon: "🏗️" }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-pixel text-fluid-h2 text-primary mb-2">JOURNEY SO FAR</motion.h2>
          <p className="text-secondary font-semibold text-[10px] sm:text-xs">Creative milestones and collaborations.</p>
        </div>

        <div className="flex flex-col gap-6 sm:gap-10 relative">
          <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-primary/10 hidden sm:block" />
          {experiences.map((exp, i) => (
            <motion.div key={exp.id} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative bg-surface border-2 sm:border-3 border-primary rounded-xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 shadow-[4px_4px_0px_var(--color-primary)] hover:translate-y-[-2px] transition-transform"
            >
              <div className="w-10 h-10 shrink-0 bg-white border-2 border-primary rounded-lg flex items-center justify-center text-xl shadow-[2px_2px_0px_var(--color-primary)]">{exp.icon}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <div><h3 className="font-pixel text-[10px] sm:text-xs font-bold text-primary uppercase">{exp.role}</h3><p className="text-[8px] sm:text-[9px] font-bold text-secondary uppercase">{exp.company}</p></div>
                  <span className="px-2 py-0.5 bg-primary/5 border border-primary rounded-full text-[7px] sm:text-[8px] font-bold">{exp.period}</span>
                </div>
                <p className="text-secondary font-semibold text-[9px] sm:text-[10px] md:text-xs leading-relaxed mb-3">{exp.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => <span key={tag} className="px-1.5 py-0.5 bg-white border border-primary rounded text-[6px] sm:text-[7px] font-bold uppercase shadow-[1px_1px_0px_var(--color-primary)]">{tag}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
