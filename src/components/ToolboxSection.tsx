"use client";

import { motion } from "framer-motion";
import { SiFigma, SiNotion, SiBlender } from "react-icons/si";
import { DiPhotoshop, DiIllustrator } from "react-icons/di";

const tools = [
  { name: "Figma", icon: SiFigma, desc: "Primary for UI/UX", color: "text-[#F24E1E]", bg: "hover:bg-[#F24E1E]/5" },
  { name: "Photoshop", icon: DiPhotoshop, desc: "Visual Design", color: "text-[#31A8FF]", bg: "hover:bg-[#31A8FF]/5" },
  { name: "Illustrator", icon: DiIllustrator, desc: "Vector Design", color: "text-[#FF9A00]", bg: "hover:bg-[#FF9A00]/5" },
  { name: "Notion", icon: SiNotion, desc: "Documentation", color: "text-primary", bg: "hover:bg-primary/5" },
  { name: "Blender", icon: SiBlender, desc: "3D Visuals", color: "text-[#EA7711]", bg: "hover:bg-[#EA7711]/5" },
];

export default function ToolboxSection() {
  return (
    <section id="toolbox" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-8 sm:mb-10">
          <motion.h2 className="font-pixel text-fluid-h2 text-primary mb-2">CREATIVE TOOLBOX 💻</motion.h2>
          <p className="text-secondary font-semibold text-[10px] sm:text-xs max-w-lg mx-auto">Instruments I use to bring digital experiences to life.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
          {tools.map((tool, index) => (
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
