"use client";

import { motion } from "framer-motion";
import { SiGoogle, SiAnthropic } from "react-icons/si";
import { HiSparkles, HiCpuChip, HiCursorArrowRipple } from "react-icons/hi2";

const aiTools = [
  { name: "Stitch", icon: HiSparkles, desc: "Design Orchestration", color: "text-[#6366F1]", bg: "hover:bg-[#6366F1]/5" },
  { name: "Visly", icon: HiCursorArrowRipple, desc: "Visual Component Logic", color: "text-[#EC4899]", bg: "hover:bg-[#EC4899]/5" },
  { name: "Gemini", icon: SiGoogle, desc: "Creative Reasoning", color: "text-[#4285F4]", bg: "hover:bg-[#4285F4]/5" },
  { name: "Antigravity", icon: HiCpuChip, desc: "Agentic Coding", color: "text-[#8B5CF6]", bg: "hover:bg-[#8B5CF6]/5" },
  { name: "Claude", icon: SiAnthropic, desc: "Nuanced Generation", color: "text-[#D97706]", bg: "hover:bg-[#D97706]/5" },
  { name: "Flow", icon: HiSparkles, desc: "Motion Synthesis", color: "text-[#10B981]", bg: "hover:bg-[#10B981]/5" },
];

export default function AIToolboxSection() {
  return (
    <section id="ai-toolbox" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden -mt-10">
      <div className="absolute inset-0 z-[-1] bg-background" />
      <div className="w-full max-w-6xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-8 sm:mb-10">
          <motion.h2 className="font-pixel text-fluid-h2 text-primary mb-2">AI TOOLBOX 🤖</motion.h2>
          <p className="text-secondary font-semibold text-[10px] sm:text-xs max-w-lg mx-auto uppercase tracking-widest">Next-gen intelligence enhancing my workflow.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 w-full">
          {aiTools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`p-3 sm:p-4 md:p-5 bg-surface border-2 sm:border-3 border-primary rounded-xl shadow-[3px_3px_0px_var(--color-primary)] sm:shadow-[4px_4px_0px_var(--color-primary)] transition-all cursor-pointer ${tool.bg}`}
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3 mx-auto ${tool.color} transition-transform group-hover:scale-110`}>
                <tool.icon size="100%" />
              </div>
              <h3 className="font-pixel text-[9px] sm:text-[10px] md:text-xs font-bold text-primary mb-1 uppercase">{tool.name}</h3>
              <p className="text-[7px] sm:text-[8px] md:text-[9px] text-secondary font-bold">{tool.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
