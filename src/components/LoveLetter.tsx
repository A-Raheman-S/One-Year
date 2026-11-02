import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Feather } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const letter = siteConfig.loveLetter;

  return (
    <section className="relative py-28 px-6 max-w-4xl mx-auto text-center">
      {/* Section Header */}
      <div className="mb-16">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.35em] text-rose-400 font-semibold block mb-3"
        >
          WRITTEN JUST FOR YOU
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cursive text-6xl md:text-7xl lg:text-8xl text-cream-100"
        >
          A Letter, From My Heart
        </motion.h2>
      </div>

      {/* Sealed Envelope / Unfolded Letter Container */}
      <div className="relative mx-auto max-w-3xl">
        {!isOpen ? (
          /* Sealed Envelope View */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setIsOpen(true)}
            className="group cursor-pointer rounded-3xl bg-gradient-to-br from-[#FAF0E6] via-[#F4E4D4] to-[#EBD5C1] p-10 md:p-14 shadow-2xl shadow-black/50 border border-champagne-300/40 relative overflow-hidden transition-all duration-300"
          >
            {/* Top flap decorative border */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-rose-400/20" />

            <div className="flex flex-col items-center justify-center">
              {/* Wax Seal */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-600 to-wine-800 border-2 border-champagne-300/60 shadow-[0_4px_20px_rgba(239,99,137,0.5)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart size={32} className="fill-cream-100 text-cream-100" />
              </div>

              <div className="flex items-center gap-2 text-stone-700 mb-2">
                <Mail size={18} className="text-rose-500" />
                <span className="text-xs uppercase tracking-[0.3em] font-semibold">
                  Personal &amp; Confidential
                </span>
              </div>

              <h3 className="font-serif italic text-2xl md:text-3xl font-semibold text-stone-900 mb-2">
                For {siteConfig.personTwo}
              </h3>
              <p className="font-sans text-xs text-stone-600 tracking-wider">
                Tap to open and read your letter
              </p>
            </div>
          </motion.div>
        ) : (
          /* Unfolded Cream Letter */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl bg-[#FAF5EE] text-stone-800 p-8 md:p-14 shadow-2xl shadow-black/60 border border-champagne-300/40 text-left paper-card"
            >
              {/* Floating Decorative Heart Accent */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-6 right-6 text-rose-400/30"
              >
                <Heart size={36} className="fill-rose-400/20" />
              </motion.div>

              {/* Date & Feather Header */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-200">
                <span className="flex items-center gap-2 text-xs font-serif italic text-stone-500 tracking-wider">
                  <Feather size={14} className="text-rose-500" />
                  {letter.date}
                </span>
                <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold">
                  Anniversary Note
                </span>
              </div>

              {/* Greeting */}
              <h3 className="font-serif italic text-3xl md:text-4xl font-bold text-stone-900 mb-6">
                {letter.greeting}
              </h3>

              {/* Paragraphs */}
              <div className="space-y-5 font-serif text-lg md:text-xl text-stone-700 leading-relaxed">
                {letter.paragraphs.map((p, i) => (
                  <p key={i}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Closing & Signature */}
              <div className="mt-10 pt-6 border-t border-stone-200/80 flex flex-col items-end">
                <span className="font-serif italic text-lg text-stone-600 mb-1">
                  {letter.closing}
                </span>
                <span className="font-cursive text-5xl md:text-6xl text-rose-600 drop-shadow-sm">
                  {letter.signature}
                </span>
              </div>

              {/* Re-fold button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs uppercase tracking-widest text-stone-500 hover:text-rose-600 transition-colors"
                >
                  &larr; Fold back into envelope
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};
