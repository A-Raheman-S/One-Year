import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';
import { useRelationshipTimer } from '../hooks/useRelationshipTimer';
import { siteConfig } from '../data/siteConfig';

export const AnniversaryCountdown: React.FC = () => {
  const { countdown } = useRelationshipTimer(siteConfig.relationshipStartDate);

  const countdownUnits = [
    { label: 'Days', value: countdown.days },
    { label: 'Hours', value: countdown.hours },
    { label: 'Minutes', value: countdown.minutes },
    { label: 'Seconds', value: countdown.seconds },
  ];

  const formattedTargetDate = countdown.targetDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

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
          MARK THE CALENDAR — A CELEBRATION IS COMING
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cursive text-6xl md:text-7xl lg:text-8xl text-cream-100"
        >
          Next Anniversary
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 flex items-center justify-center gap-2 text-xs font-serif italic text-champagne-300 tracking-wider"
        >
          <Calendar size={14} className="text-rose-400" />
          <span>Counting down to {formattedTargetDate}</span>
          <Sparkles size={14} className="text-peach-500" />
        </motion.div>
      </div>

      {/* 4 Countdown Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
        {countdownUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group relative rounded-3xl glass-panel p-6 md:p-8 flex flex-col items-center justify-center shadow-glass hover:shadow-glow-champagne hover:border-champagne-400/40 transition-all duration-300"
          >
            {/* Subtle card lighting reflection */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.07] to-transparent pointer-events-none" />

            <div className="relative z-10">
              <span className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-br from-cream-100 via-champagne-300 to-rose-400 tabular-nums leading-tight">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="block mt-2 text-xs uppercase tracking-[0.3em] text-muted-text font-medium group-hover:text-champagne-300 transition-colors">
                {unit.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
