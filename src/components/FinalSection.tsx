import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Infinity as InfinityIcon } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const FinalSection: React.FC = () => {
  const final = siteConfig.finalSection;

  return (
    <section className="relative py-32 px-6 max-w-4xl mx-auto text-center pb-44">
      {/* Oversized Centered Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden border border-rose-500/30"
      >
        {/* Soft radial ambient illumination behind content */}
        <div className="absolute inset-0 bg-radial from-rose-500/10 via-champagne-400/5 to-transparent pointer-events-none" />

        {/* Floating Heart / Infinity Icon Header */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500/30 to-peach-500/20 border border-rose-400/40 flex items-center justify-center mx-auto mb-8 shadow-glow-rose"
        >
          <InfinityIcon size={32} className="text-rose-400" />
        </motion.div>

        {/* Emotional Headings */}
        <h2 className="font-cursive text-6xl md:text-8xl text-cream-100 mb-2 leading-none">
          {final.heading}
        </h2>
        <h3 className="font-serif italic text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-champagne-300 via-rose-400 to-peach-500 mb-8 leading-tight">
          {final.subheading}
        </h3>

        {/* Personalized closing message */}
        <p className="font-serif italic text-lg md:text-2xl text-cream-200/90 max-w-2xl mx-auto leading-relaxed mb-10">
          &ldquo;{final.body}&rdquo;
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-4 my-8 max-w-xs mx-auto">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-rose-400/50" />
          <Heart size={16} className="fill-rose-500 text-rose-500 animate-pulse" />
          <Sparkles size={14} className="text-champagne-300" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-rose-400/50" />
        </div>

        {/* Footer Details */}
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-muted-text font-medium">
          {final.footerText}
        </p>
      </motion.div>
    </section>
  );
};
