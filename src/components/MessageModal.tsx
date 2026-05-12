"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MessageModal({ isOpen, onClose }: MessageModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Using Formspree for automatic email handling
      // You can replace 'mqakvjwn' with your own Formspree ID
      const response = await fetch("https://formspree.io/f/xpwzyqjr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Portfolio Message from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          onClose();
          setStatus("idle");
        }, 2500);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-surface border-4 border-primary rounded-2xl shadow-[8px_8px_0px_var(--color-primary)] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex justify-between items-center">
              <h3 className="font-pixel text-white text-lg tracking-wider">
                {status === "success" ? "MESSAGE SENT!" : "MESSAGE ME"}
              </h3>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center bg-white border-2 border-primary rounded-lg shadow-[2px_2px_0px_var(--color-pixel-dark)] hover:translate-y-0.5 hover:shadow-none transition-all"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <div className="p-6">
              {status === "success" ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="text-6xl">🚀</div>
                  <h4 className="font-pixel text-primary text-xl">SUCCESS!</h4>
                  <p className="text-secondary font-bold text-sm">Your message is flying to my inbox.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="font-pixel text-[10px] font-bold text-primary block uppercase">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Soudas Sur"
                      className="w-full px-4 py-3 bg-white border-3 border-primary rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-blue)]/50 transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.05)]"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-pixel text-[10px] font-bold text-primary block uppercase">Your Email</label>
                    <input
                      required
                      type="email"
                      placeholder="hello@example.com"
                      className="w-full px-4 py-3 bg-white border-3 border-primary rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-blue)]/50 transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.05)]"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-pixel text-[10px] font-bold text-primary block uppercase">Your Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Hey! I love your work..."
                      className="w-full px-4 py-3 bg-white border-3 border-primary rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-blue)]/50 transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.05)] resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 bg-[var(--color-accent-yellow)] border-3 border-primary rounded-xl font-pixel text-primary font-bold shadow-[4px_4px_0px_var(--color-primary)] hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "SENDING..." : "SEND MESSAGE 🚀"}
                  </button>
                  {status === "error" && (
                    <p className="text-red-500 font-bold text-[10px] text-center uppercase">Something went wrong. Please try again.</p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
