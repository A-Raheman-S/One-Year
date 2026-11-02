import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 1: heart pulse + intro quote
    const timer1 = setTimeout(() => setStage(1), 700);
    // Stage 2: names reveal
    const timer2 = setTimeout(() => setStage(2), 1700);
    // Stage 3: finish & fade out
    const timer3 = setTimeout(() => onComplete(), 2700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1B0811] px-6 text-center select-none"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] } }}
      >
        {/* Soft background ambient glow */}
        <div className="absolute inset-0 bg-radial from-rose-500/15 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-lg">
          {/* Glowing animated heart */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: [0.9, 1.15, 1], opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut', repeat: Infinity, repeatType: 'reverse' }}
            className="mb-6 relative"
          >
            <div className="absolute -inset-4 rounded-full bg-rose-500/20 blur-xl animate-pulse" />
            <Heart size={44} className="fill-rose-500 text-rose-400 drop-shadow-[0_0_15px_#EF6389]" />
            <Sparkles size={18} className="absolute -top-1 -right-2 text-champagne-300 animate-spin-slow" />
          </motion.div>

          {/* Subtitle / Intro phrase */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 15 }}
            transition={{ duration: 0.8 }}
            className="font-serif italic text-xl md:text-2xl text-cream-200/90 tracking-wide mb-3"
          >
            A story written in the stars...
          </motion.p>

          {/* Couple names */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: stage >= 2 ? 1 : 0, scale: stage >= 2 ? 1 : 0.9 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-cursive text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-champagne-300 via-rose-400 to-peach-500 py-1"
          >
            {siteConfig.personOne} &amp; {siteConfig.personTwo}
          </motion.h1>

          {/* Badge */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 2 ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-xs uppercase tracking-[0.35em] text-muted-text font-medium"
          >
            {siteConfig.anniversaryYearsBadge}
          </motion.span>
        </div>

        {/* Skip button for immediate entry */}
        <button
          onClick={onComplete}
          className="absolute bottom-10 px-5 py-2 rounded-full border border-rose-500/30 bg-wine-800/40 text-xs tracking-widest uppercase text-cream-200/70 hover:text-cream-100 hover:border-rose-400/60 hover:bg-wine-700/50 transition-all duration-300"
        >
          Enter Story &rarr;
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
