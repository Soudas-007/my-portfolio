"use client";

import { motion } from "framer-motion";
import { SiFigma, SiNotion, SiBlender } from "react-icons/si";
import { DiPhotoshop, DiIllustrator } from "react-icons/di";

const tools = [
  { name: "Figma", icon: SiFigma, desc: "Interface Design", color: "#F24E1E", bg: "rgba(242, 78, 30, 0.05)" },
  { name: "Photoshop", icon: DiPhotoshop, desc: "Visual Effects", color: "#31A8FF", bg: "rgba(49, 168, 255, 0.05)" },
  { name: "Illustrator", icon: DiIllustrator, desc: "Vector Assets", color: "#FF9A00", bg: "rgba(255, 154, 0, 0.05)" },
  { name: "Notion", icon: SiNotion, desc: "Workflow Ops", color: "#000000", bg: "rgba(0, 0, 0, 0.05)" },
  { name: "Blender", icon: SiBlender, desc: "3D Modeling", color: "#EA7711", bg: "rgba(234, 119, 17, 0.05)" },
];

export default function ToolboxSection() {
  return (
    <section id="toolbox" className="py-fluid-section px-6 relative overflow-hidden bg-surface/10">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(var(--color-primary) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <span className="text-[10px] font-bold text-accent-blue uppercase tracking-[0.4em] mb-4 block">System Core</span>
            <h2 className="font-pixel text-fluid-h1 text-primary mb-4 uppercase">CREATIVE STACK</h2>
            <p className="text-secondary font-semibold text-fluid-body leading-relaxed">
              A curated selection of instruments used to architect, prototype, and refine digital experiences. Focused on precision and speed.
            </p>
          </motion.div>

          {/* System Status Detail */}
          <div className="hidden lg:flex items-center gap-6 px-6 py-3 bg-white border-3 border-primary rounded-2xl shadow-[5px_5px_0px_var(--color-primary)]">
             <div className="flex flex-col">
                <span className="text-[8px] font-bold text-primary/40 uppercase tracking-tighter">Stack Status</span>
                <span className="text-[10px] font-pixel text-primary uppercase">Fully Optimized</span>
             </div>
             <div className="w-px h-8 bg-primary/10" />
             <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent-green border border-primary/20" />)}
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div 
                className="p-8 sm:p-10 bg-white border-3 border-primary rounded-[2rem] shadow-[8px_8px_0px_var(--color-primary)] transition-all flex flex-col items-center text-center group-hover:shadow-[12px_12px_0px_var(--color-primary)] overflow-hidden"
              >
                {/* Tool Backdrop Bloom */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: tool.bg }}
                />

                <div 
                  className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                  style={{ color: tool.color }}
                >
                  <tool.icon size="100%" className="drop-shadow-xl" />
                </div>

                <div className="relative z-10">
                  <h3 className="font-pixel text-fluid-h2 text-primary mb-2 uppercase tracking-tight">{tool.name}</h3>
                  <p className="text-[10px] sm:text-xs text-secondary font-bold uppercase tracking-widest opacity-60">{tool.desc}</p>
                </div>

                {/* Decorative Serial Tag */}
                <div className="absolute top-4 right-4 text-[7px] font-bold text-primary/20 uppercase font-mono">
                  USR_STCK_00{index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
