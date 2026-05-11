"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* ═══ EMAIL MODAL ═══ */
function EmailModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!name.trim() || !message.trim()) return;
    const subject = encodeURIComponent("Let's Work Together ✨");
    const body = encodeURIComponent(`Hi Soudas,\n\nMy name is ${name}.\n\n${message}\n\nLooking forward to hearing from you!`);
    window.open(`mailto:sursoudas@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
    setTimeout(() => { setSent(false); onClose(); }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 40 }}
        transition={{ type: "spring", bounce: 0.35 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-surface border-4 border-primary rounded-2xl shadow-[8px_8px_0px_var(--color-primary)] overflow-hidden"
      >
        {/* Window bar */}
        <div className="bg-[var(--color-accent-blue)] border-b-4 border-primary px-4 py-2.5 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-primary bg-[var(--color-accent-red)] cursor-pointer" onClick={onClose} />
          <div className="w-3 h-3 rounded-full border-2 border-primary bg-[var(--color-accent-yellow)]" />
          <div className="w-3 h-3 rounded-full border-2 border-primary bg-[var(--color-accent-green)]" />
          <span className="ml-3 font-pixel text-xs text-primary">new-message.exe</span>
        </div>

        <div className="p-6">
          {sent ? (
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="text-center py-8"
            >
              <div className="text-5xl mb-4">🚀</div>
              <p className="font-pixel text-primary text-lg">Message Sent!</p>
              <p className="text-secondary text-sm mt-2 font-semibold">Opening your email client...</p>
            </motion.div>
          ) : (
            <>
              <p className="text-xs font-bold text-secondary mb-4 font-mono">To: sursoudas@gmail.com</p>

              <div className="mb-4">
                <label className="block text-xs font-bold text-primary mb-1">Your Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Designer"
                  className="w-full px-3 py-2 border-2 border-primary rounded-xl text-sm font-semibold bg-white focus:outline-none focus:border-[var(--color-accent-blue)] transition-colors"
                />
              </div>

              <div className="mb-5">
                <label className="block text-xs font-bold text-primary mb-1">Your Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Let's work on something amazing together..."
                  rows={4}
                  className="w-full px-3 py-2 border-2 border-primary rounded-xl text-sm font-semibold bg-white resize-none focus:outline-none focus:border-[var(--color-accent-blue)] transition-colors"
                />
              </div>

              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleSend}
                className="w-full py-3 bg-[var(--color-accent-blue)] border-4 border-primary rounded-xl font-pixel text-primary shadow-[4px_4px_0px_var(--color-primary)] flex items-center justify-center gap-2"
              >
                Send Message <span className="text-lg">✈️</span>
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══ CONTACT CARD ═══ */
function ContactCard({ icon, label, value, href, color }: {
  icon: string; label: string; value: string; href: string; color: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, boxShadow: `6px 6px 0px ${color}`, borderColor: color, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      animate={{ y: [0, -4, 0] }}
      transition={{ y: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" } }}
      className="group flex flex-col items-center gap-2 px-4 py-4 bg-white/10 backdrop-blur-sm border-3 border-white/30 rounded-2xl shadow-[4px_4px_0px_rgba(255,255,255,0.2)] cursor-pointer transition-all duration-300 min-w-[120px]"
    >
      <motion.span
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="text-2xl"
      >{icon}</motion.span>
      <div className="text-center">
        <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-0.5">{label}</div>
        <div className="text-xs font-bold text-white truncate max-w-[120px]">{value}</div>
      </div>
    </motion.a>
  );
}

/* ═══ PIXEL MASCOT WAVE ═══ */
function MascotWave() {
  const [blinking, setBlinking] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-12 h-14 mx-auto"
    >
      <div className="absolute inset-0 bg-white border-4 border-white/60 rounded-t-full overflow-hidden shadow-[3px_3px_0px_rgba(255,255,255,0.3)]">
        <div className="flex justify-center gap-1.5 mt-3">
          <motion.div animate={{ scaleY: blinking ? 0.1 : 1 }} className="w-2 h-2.5 bg-primary rounded-full" />
          <motion.div animate={{ scaleY: blinking ? 0.1 : 1 }} className="w-2 h-2.5 bg-primary rounded-full" />
        </div>
        <div className="flex justify-center gap-4 mt-0.5">
          <div className="w-1.5 h-1 rounded-full bg-[var(--color-accent-red)] opacity-60" />
          <div className="w-1.5 h-1 rounded-full bg-[var(--color-accent-red)] opacity-60" />
        </div>
      </div>
      {/* Waving arm */}
      <motion.div
        animate={{ rotate: [0, 30, 0, 30, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute -right-2 top-4 text-lg"
        style={{ transformOrigin: "bottom left" }}
      >👋</motion.div>
      <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 48 10" fill="none">
        <path d="M0,0 L0,5 Q6,10 12,5 Q18,0 24,5 Q30,10 36,5 Q42,0 48,5 L48,0 Z" fill="white" />
      </svg>
    </motion.div>
  );
}

/* ═══ STAR ═══ */
function Star({ top, left, delay, size }: { top: string; left: string; delay: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white pointer-events-none"
      style={{ top, left, width: size, height: size }}
      animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.3, 1] }}
      transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay }}
    />
  );
}

/* ═══ MAIN FOOTER ═══ */
export default function FooterSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [stars, setStars] = useState<{ top: string; left: string; delay: number; size: number }[]>([]);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const moonY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const cloudX1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const cloudX2 = useTransform(scrollYProgress, [0, 1], [0, 60]);

  useEffect(() => {
    requestAnimationFrame(() => {
      setStars([...Array(40)].map(() => ({
        top: `${Math.random() * 75}%`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 3,
        size: Math.random() * 3 + 1,
      })));
    });
  }, []);

  const contactCards = [
    { icon: "📧", label: "Email", value: "sursoudas@gmail.com", href: "mailto:sursoudas@gmail.com", color: "var(--color-accent-blue)" },
    { icon: "💼", label: "LinkedIn", value: "soudas-sur", href: "https://www.linkedin.com/in/soudas-sur-98476b399/", color: "var(--color-accent-blue)" },
    { icon: "🎨", label: "Behance", value: "soudassur_007", href: "https://www.behance.net/soudassur_007", color: "var(--color-accent-yellow)" },
    { icon: "📍", label: "Location", value: "Kolkata, WB", href: "#", color: "var(--color-accent-green)" },
  ];

  return (
    <>
      <AnimatePresence>{modalOpen && <EmailModal onClose={() => setModalOpen(false)} />}</AnimatePresence>

      <footer
        ref={containerRef}
        className="relative bg-[var(--color-primary)] overflow-hidden min-h-screen flex flex-col items-center justify-center py-24 sm:py-32 px-4 sm:px-6"
      >
        {/* ── Night Sky ── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Gradient sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a] via-[var(--color-primary)] to-[#1a0a2e]" />

          {/* Stars */}
          {stars.map((s, i) => (
            <Star key={i} top={s.top} left={s.left} delay={s.delay} size={s.size} />
          ))}

          {/* Moon */}
          <motion.div
            style={{ y: moonY }}
            className="absolute top-12 sm:top-16 right-[8%] sm:right-[12%]"
          >
            <motion.div
              animate={{ boxShadow: ["0 0 20px rgba(255,249,240,0.4)", "0 0 60px rgba(255,249,240,0.7)", "0 0 20px rgba(255,249,240,0.4)"] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-16 sm:w-24 h-16 sm:h-24 bg-[#FFF9F0] rounded-full relative"
            >
              <div className="absolute top-3 sm:top-5 left-3 sm:left-4 w-3 sm:w-5 h-3 sm:h-5 bg-[#E0D8C8] rounded-full opacity-60" />
              <div className="absolute bottom-3 sm:bottom-4 right-2 sm:right-3 w-4 sm:w-6 h-4 sm:h-6 bg-[#E0D8C8] rounded-full opacity-50" />
            </motion.div>
          </motion.div>

          {/* Clouds */}
          <motion.div style={{ x: cloudX1 }} className="absolute top-20 sm:top-28 left-[5%] w-24 sm:w-36 h-8 sm:h-10 bg-white/8 rounded-full blur-xl" />
          <motion.div style={{ x: cloudX2 }} className="absolute top-32 sm:top-40 right-[20%] w-32 sm:w-48 h-10 sm:h-12 bg-white/5 rounded-full blur-2xl" />

          {/* Pixel city skyline */}
          <div className="absolute bottom-0 left-0 w-full h-24 sm:h-32 flex items-end opacity-15 overflow-hidden">
            {[12, 20, 8, 28, 16, 10, 24, 14, 18, 22, 9, 30, 11, 15, 25, 8, 20].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-white"
                style={{ height: `${h * 3}px`, marginRight: i % 3 === 0 ? "1px" : "0" }}
              />
            ))}
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="relative z-10 text-center max-w-2xl w-full mx-auto">

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <motion.h2
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="font-pixel text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight"
              style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.4), 0 0 40px rgba(108,198,255,0.3)" }}
            >
              LET&apos;S CREATE SOMETHING MEMORABLE
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/70 font-semibold text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            >
              Always open to creative collaborations, freelance opportunities, internships, and meaningful conversations.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10 sm:mb-14"
          >
            {/* Send Message */}
            <motion.button
              whileHover={{ y: -5, scale: 1.04, boxShadow: "0 0 30px var(--color-accent-yellow)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setModalOpen(true)}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-[var(--color-accent-yellow)] text-primary font-pixel text-base sm:text-lg border-4 border-white rounded-2xl shadow-[5px_5px_0px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <span>Send a Message</span>
              <motion.span
                animate={{ x: [0, 3, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >✈️</motion.span>
            </motion.button>

            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/soudas-sur-98476b399/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.04, boxShadow: "0 0 25px var(--color-accent-blue)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-[var(--color-accent-blue)] text-primary font-pixel text-base sm:text-lg border-4 border-white rounded-2xl shadow-[5px_5px_0px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3"
            >
              <span>Connect on LinkedIn</span>
              <span>💼</span>
            </motion.a>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-14"
          >
            {contactCards.map((card, i) => (
              <ContactCard key={i} {...card} />
            ))}
          </motion.div>

          {/* Availability Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            animate={{ y: [0, -5, 0] }}
            className="inline-flex flex-col items-center gap-3 px-5 sm:px-7 py-4 bg-white/10 backdrop-blur-sm border-3 border-white/25 rounded-2xl shadow-[4px_4px_0px_rgba(255,255,255,0.15)] mb-10 sm:mb-14"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-green)]"
                style={{ boxShadow: "0 0 8px var(--color-accent-green)" }}
              />
              <span className="font-pixel text-white text-xs sm:text-sm">Available For:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {["Freelance Projects", "UI/UX Roles", "Internships", "Collaborations"].map((item, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="text-[10px] sm:text-xs font-bold px-2.5 py-1 bg-white/15 border border-white/25 rounded-full text-white/90 cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-4 mb-12 sm:mb-16"
          >
            {[
              { label: "LinkedIn", emoji: "💼", href: "https://www.linkedin.com/in/soudas-sur-98476b399/" },
              { label: "Behance", emoji: "🎨", href: "https://www.behance.net/soudassur_007" },
              { label: "Email", emoji: "📧", href: "mailto:sursoudas@gmail.com" },
            ].map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                whileHover={{ y: -6, scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                animate={{ y: [0, -4, 0] }}
                transition={{ y: { duration: 2 + i * 0.5, repeat: Infinity } }}
                className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-white/15 border-2 border-white/30 rounded-xl text-xl shadow-[3px_3px_0px_rgba(255,255,255,0.15)] backdrop-blur-sm hover:bg-white/25 transition-colors"
                title={s.label}
              >
                {s.emoji}
              </motion.a>
            ))}
          </motion.div>

          {/* Pixel Mascot Goodbye */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center gap-3 mb-8"
          >
            <MascotWave />
            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="font-pixel text-white/60 text-xs sm:text-sm"
            >
              Thanks for visiting! ✨
            </motion.p>
          </motion.div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="absolute bottom-0 left-0 w-full border-t border-white/10 px-4 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 z-10">
          <p className="text-white/40 text-xs font-semibold font-mono">
            © {new Date().getFullYear()} Soudas Sur · Designed with ♥ &amp; Pixels
          </p>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-green)]"
            />
            <span className="text-white/40 text-xs font-semibold">Built with Next.js &amp; Framer Motion</span>
          </div>
        </div>
      </footer>
    </>
  );
}
