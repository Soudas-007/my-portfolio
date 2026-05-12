"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { HiXMark, HiCheckCircle, HiExclamationTriangle, HiPaperAirplane } from "react-icons/hi2";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function MessageModal({ isOpen, onClose }: MessageModalProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    _gotcha: "", // Honeypot field for anti-spam
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", email: "", subject: "", message: "", _gotcha: "" });
        setErrors({});
      }, 300);
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData._gotcha) return; // Silent fail for bots
    if (!validate()) return;

    setStatus("loading");

    try {
      // Switching to FormSubmit.co for a more direct connection to sursoudas@gmail.com
      // The first time you submit, you will receive a confirmation email to activate the form.
      const response = await fetch("https://formsubmit.co/ajax/sursoudas@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _subject: `Portfolio: ${formData.subject || "New Message"} from ${formData.name}`,
          _template: "table",
          _honey: formData._gotcha, // Honeypot field
        }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClasses = (fieldName: string) => `
    w-full px-4 py-3 bg-white border-3 border-primary rounded-xl font-bold text-sm 
    focus:outline-none focus:ring-4 focus:ring-[var(--color-accent-blue)]/20 transition-all 
    shadow-[4px_4px_0px_rgba(0,0,0,0.05)] placeholder:text-secondary/40
    ${errors[fieldName] ? "border-red-500 shadow-[4px_4px_0px_#ef444433]" : "border-primary"}
  `;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0A1128]/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-xl bg-surface border-4 border-primary rounded-[2rem] shadow-[12px_12px_0px_var(--color-primary)] overflow-hidden z-10 my-auto"
          >
            {/* Header */}
            <div className="bg-primary p-5 sm:p-6 flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-full bg-white/5 skew-x-[-20deg] translate-x-12" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-[var(--color-accent-yellow)] rounded-xl border-2 border-white flex items-center justify-center shadow-sm">
                  <HiPaperAirplane className="text-primary text-xl -rotate-12" />
                </div>
                <div>
                  <h3 className="font-pixel text-white text-lg sm:text-xl tracking-wider leading-none">LET&apos;S CHAT</h3>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">Direct message system</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-white border-3 border-primary rounded-xl shadow-[3px_3px_0px_var(--color-pixel-dark)] hover:translate-y-0.5 hover:shadow-none transition-all z-10"
              >
                <HiXMark className="text-xl text-primary" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 flex flex-col items-center text-center space-y-5"
                  >
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-24 h-24 bg-[var(--color-accent-green)]/20 rounded-full flex items-center justify-center border-4 border-[var(--color-accent-green)]"
                    >
                      <HiCheckCircle className="text-5xl text-[var(--color-accent-green)]" />
                    </motion.div>
                    <div className="space-y-2">
                      <h4 className="font-pixel text-primary text-2xl uppercase tracking-tight">MESSAGE DELIVERED! ✨</h4>
                      <p className="text-secondary font-bold text-sm max-w-xs mx-auto">
                        Thanks for reaching out! I&apos;ll get back to you soon. 🚀
                      </p>
                    </div>
                    <button 
                      onClick={onClose}
                      className="px-8 py-3 bg-primary text-white font-pixel text-xs rounded-xl hover:scale-105 transition-transform"
                    >
                      CLOSE WINDOW
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot field */}
                    <input type="text" name="_gotcha" value={formData._gotcha} onChange={(e) => setFormData({...formData, _gotcha: e.target.value})} className="hidden" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="font-pixel text-[10px] font-bold text-primary block uppercase tracking-wider">Full Name *</label>
                        <input
                          required
                          type="text"
                          placeholder="Jane Doe"
                          className={inputClasses("name")}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.name && <p className="text-[9px] text-red-500 font-bold uppercase">{errors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="font-pixel text-[10px] font-bold text-primary block uppercase tracking-wider">Email Address *</label>
                        <input
                          required
                          type="email"
                          placeholder="jane@example.com"
                          className={inputClasses("email")}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <p className="text-[9px] text-red-500 font-bold uppercase">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-pixel text-[10px] font-bold text-primary block uppercase tracking-wider">Subject</label>
                      <input
                        type="text"
                        placeholder="Collaboration Opportunity"
                        className={inputClasses("subject")}
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-pixel text-[10px] font-bold text-primary block uppercase tracking-wider">Your Message *</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Hi Soudas, I'd love to discuss..."
                        className={inputClasses("message")}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                      {errors.message && <p className="text-[9px] text-red-500 font-bold uppercase">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group relative w-full py-4 bg-[var(--color-accent-yellow)] border-4 border-primary rounded-2xl font-pixel text-primary font-bold text-base shadow-[6px_6px_0px_var(--color-primary)] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-wait"
                    >
                      {status === "loading" ? (
                        <>
                          <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-3 border-primary border-t-transparent rounded-full"
                          />
                          <span>SENDING...</span>
                        </>
                      ) : (
                        <>
                          <span>SEND MESSAGE</span>
                          <HiPaperAirplane className="text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </>
                      )}
                    </button>

                    {status === "error" && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-2"
                      >
                        <HiExclamationTriangle className="text-red-500 flex-shrink-0" />
                        <p className="text-[10px] text-red-600 font-bold uppercase">Something went wrong. Please try again or reach out directly via LinkedIn.</p>
                      </motion.div>
                    )}
                  </form>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="bg-primary/5 p-4 border-t-2 border-primary/10 flex justify-center">
              <p className="text-[9px] font-bold text-primary/40 uppercase tracking-widest font-pixel flex items-center gap-2">
                <span className="w-1 h-1 bg-primary/20 rounded-full" />
                Trusted by 50+ clients worldwide
                <span className="w-1 h-1 bg-primary/20 rounded-full" />
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
