import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { promises } from '../data/promises';

export const PromiseSection: React.FC = () => {
  const [unlockedIds, setUnlockedIds] = useState<number[]>([]);

  const handleUnlock = (id: number) => {
    if (unlockedIds.includes(id)) return;

    // Small celebratory confetti burst for breaking the seal
    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#EF6389', '#E9BC91', '#F2A16F', '#ffffff'],
        disableForReducedMotion: true,
      });
    } catch {
      // safe fallback
    }

    setUnlockedIds((prev) => [...prev, id]);
  };

  const unlockedCount = unlockedIds.length;

  return (
    <section className="relative py-28 px-6 max-w-5xl mx-auto text-center">
      {/* Section Header */}
      <div className="mb-16">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.35em] text-rose-400 font-semibold block mb-3"
        >
          Break each seal, one at a time...
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cursive text-6xl md:text-7xl lg:text-8xl text-cream-100"
        >
          My Promises To You
        </motion.h2>

        {/* Counter of Remaining Seals */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/30 bg-wine-900/60 backdrop-blur-md text-xs font-semibold uppercase tracking-widest text-champagne-300">
          <Sparkles size={14} className="text-rose-400" />
          <span>
            {unlockedCount} of {promises.length} Promises Unlocked
          </span>
        </div>
      </div>

      {/* Row of 6 Heart Wax Seals */}
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-16">
        {promises.map((item) => {
          const isUnlocked = unlockedIds.includes(item.id);

          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleUnlock(item.id)}
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                isUnlocked
                  ? 'bg-rose-500/20 border-2 border-rose-400 shadow-[0_0_15px_rgba(239,99,137,0.4)]'
                  : 'bg-gradient-to-br from-rose-600 via-rose-700 to-wine-800 border-2 border-champagne-300/60 shadow-[0_4px_18px_rgba(239,99,137,0.5)] hover:shadow-glow-rose'
              }`}
              aria-label={`Unlock promise ${item.sealNumber}`}
            >
              {isUnlocked ? (
                <>
                  <Check size={20} className="text-rose-400 mb-0.5" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-cream-200">
                    {item.sealNumber}
                  </span>
                </>
              ) : (
                <>
                  <Heart size={24} className="fill-cream-100 text-cream-100 mb-0.5" />
                  <span className="text-[9px] uppercase font-bold tracking-widest text-champagne-300">
                    SEAL {item.sealNumber}
                  </span>
                </>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Revealed Promise Notes Container (Vertical Stack) */}
      <div className="space-y-6 max-w-3xl mx-auto text-left">
        <AnimatePresence>
          {promises
            .filter((p) => unlockedIds.includes(p.id))
            .map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-[#FAF5EE] rounded-2xl p-6 md:p-8 text-stone-800 shadow-xl paper-card border border-stone-200/80"
              >
                {/* Decorative Tape Strip */}
                <div className="absolute -top-3 left-8 w-24 h-5 tape-strip rounded-sm transform -rotate-2" />

                <div className="flex items-center justify-between mb-3 pt-1">
                  <span className="text-xs uppercase tracking-widest font-bold text-rose-600 flex items-center gap-1.5">
                    <Heart size={14} className="fill-rose-500" />
                    PROMISE {item.sealNumber} • {item.shortTitle}
                  </span>
                  <span className="text-xs font-serif italic text-stone-400">
                    Sealed in Heart
                  </span>
                </div>

                <h3 className="font-serif text-xl md:text-2xl font-bold text-stone-900 mb-2 leading-snug">
                  &ldquo;{item.promise}&rdquo;
                </h3>

                <p className="font-serif italic text-stone-600 text-sm md:text-base leading-relaxed">
                  {item.revealedQuote}
                </p>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Concluding sentence beneath cards */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-16 font-serif italic text-lg md:text-xl text-cream-200/80 max-w-xl mx-auto leading-relaxed"
      >
        &ldquo;Every promise written here is not just words on a page — it is etched into the very beat of my heart, forever.&rdquo;
      </motion.p>
    </section>
  );
};
