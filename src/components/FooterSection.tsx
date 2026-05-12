"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { SiBehance } from "react-icons/si";
import MessageModal from "./MessageModal";

export default function FooterSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer id="contact" className="relative pt-20 pb-10 overflow-hidden bg-[#0A1128]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128] to-[#050A18] z-[-1]" />
      
      <div className="w-full max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="mb-12"
        >
          <motion.h2 className="font-pixel text-4xl md:text-6xl text-white mb-4" style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.3)" }}>LET&apos;S CONNECT</motion.h2>
          <p className="text-white/60 font-bold text-xs md:text-sm max-w-sm mx-auto uppercase tracking-widest">
            Always excited to discuss new projects, creative ideas or opportunities to be part of your visions.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full justify-center items-center">
          <motion.button 
            onClick={() => setIsModalOpen(true)}
            whileHover={{ y: -4 }} 
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-[var(--color-accent-yellow)] border-3 border-primary rounded-xl font-bold font-pixel text-xs sm:text-sm text-primary shadow-[6px_6px_0px_rgba(0,0,0,0.5)] transition-all flex items-center gap-2"
          >
            Message me 📧
          </motion.button>
          
          <motion.a 
            href="https://www.linkedin.com/in/soudas-sur-98476b399/" 
            target="_blank" 
            whileHover={{ y: -4 }} 
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-white border-3 border-primary rounded-xl font-bold font-pixel text-xs sm:text-sm text-primary shadow-[6px_6px_0px_rgba(0,0,0,0.5)] transition-all flex items-center gap-2"
          >
            LinkedIn <FaLinkedin />
          </motion.a>
          
          <motion.a 
            href="https://www.behance.net/soudassur_007" 
            target="_blank" 
            whileHover={{ y: -4 }} 
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-[#053EFF] border-3 border-primary rounded-xl font-bold font-pixel text-xs sm:text-sm text-white shadow-[6px_6px_0px_rgba(0,0,0,0.5)] transition-all flex items-center gap-2"
          >
            Behance <SiBehance />
          </motion.a>
        </div>

        {/* Explicit Email Text */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }}
          className="mb-12"
        >
          <a href="mailto:sursoudas@gmail.com" className="text-white font-medium text-sm md:text-base hover:text-[var(--color-accent-yellow)] transition-colors">
            Email me : sursoudas@gmail.com
          </a>
        </motion.div>

        <div className="w-full pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest font-pixel">© 2025 SOUDAS SUR</p>
          <div className="flex gap-4">
             <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest font-pixel">PIXEL PERFECT DESIGN</span>
          </div>
        </div>
      </div>

      <MessageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
}
