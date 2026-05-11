"use client";

import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { SiBehance } from "react-icons/si";

export default function FooterSection() {
  return (
    <footer id="contact" className="relative pt-12 sm:pt-16 pb-6 bg-[#0B0F1A] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A] via-[#141B2D] to-[#1C253D] z-0" />
      <div className="w-full max-w-3xl mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
          <motion.h2 className="font-pixel text-fluid-h2 text-white mb-3" style={{ textShadow: "2px 2px 0px var(--color-primary)" }}>LET&apos;S CONNECT</motion.h2>
          <p className="text-white/60 font-semibold text-[10px] sm:text-xs max-w-sm mx-auto">Open to collaborations, freelance, or just a chat about pixels.</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 mb-10 w-full justify-center">
          <motion.a href="mailto:soudassur.design@gmail.com" whileHover={{ y: -2 }} className="px-4 py-2.5 bg-[var(--color-accent-yellow)] border-2 border-primary rounded-xl font-bold font-pixel text-[10px] sm:text-xs text-primary shadow-[2px_2px_0px_var(--color-pixel-dark)]">Message 📧</motion.a>
          <motion.a href="https://linkedin.com/in/soudas-sur-8a5814216/" target="_blank" whileHover={{ y: -2 }} className="px-4 py-2.5 bg-[var(--color-accent-blue)] border-2 border-primary rounded-xl font-bold font-pixel text-[10px] sm:text-xs text-white shadow-[2px_2px_0px_var(--color-pixel-dark)] flex items-center gap-1.5">LinkedIn <FaLinkedin /></motion.a>
          <motion.a href="https://behance.net/soudas_sur" target="_blank" whileHover={{ y: -2 }} className="px-4 py-2.5 bg-[var(--color-accent-red)] border-2 border-primary rounded-xl font-bold font-pixel text-[10px] sm:text-xs text-white shadow-[2px_2px_0px_var(--color-pixel-dark)] flex items-center gap-1.5">Behance <SiBehance /></motion.a>
        </div>

        <div className="w-full pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[7px] font-bold text-white/20 uppercase">© 2024 SOUDAS SUR</p>
          <p className="text-[7px] font-bold text-white/20 uppercase tracking-widest">BUILT WITH PASSION</p>
        </div>
      </div>
    </footer>
  );
}
