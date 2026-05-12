"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MessageModal({ isOpen, onClose }: MessageModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:sursoudas@gmail.com?subject=New Message from ${formData.name}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = mailtoLink;
    onClose();
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
              <h3 className="font-pixel text-white text-lg tracking-wider">MESSAGE ME</h3>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center bg-white border-2 border-primary rounded-lg shadow-[2px_2px_0px_var(--color-pixel-dark)] hover:translate-y-0.5 hover:shadow-none transition-all"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                className="w-full py-4 bg-[var(--color-accent-yellow)] border-3 border-primary rounded-xl font-pixel text-primary font-bold shadow-[4px_4px_0px_var(--color-primary)] hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2"
              >
                SEND MESSAGE 🚀
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
