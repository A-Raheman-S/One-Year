import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Coffee, Compass, Moon } from 'lucide-react';
import { useRelationshipTimer } from '../hooks/useRelationshipTimer';
import { siteConfig } from '../data/siteConfig';

const iconMap: Record<string, React.ComponentType<{ size: number; className?: string }>> = {
  Smile,
  Coffee,
  Compass,
  Moon,
};

export const RelationshipCounter: React.FC = () => {
  const { elapsed } = useRelationshipTimer(siteConfig.relationshipStartDate);

  const counterUnits: { label: string; value: number }[] = [
    { label: 'Years', value: elapsed.years },
    { label: 'Months', value: elapsed.months },
    { label: 'Days', value: elapsed.days },
    { label: 'Hours', value: elapsed.hours },
    { label: 'Minutes', value: elapsed.minutes },
    { label: 'Seconds', value: elapsed.seconds },
  ];

  return (
    <section id="relationship-counter" className="relative py-28 px-6 max-w-6xl mx-auto text-center">
      {/* Section Header */}
      <div className="mb-16">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.35em] text-rose-400 font-semibold block mb-3"
        >
          AND COUNTING, EVERY SINGLE SECOND
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cursive text-6xl md:text-7xl lg:text-8xl text-cream-100"
        >
          Married For
        </motion.h2>
      </div>

      {/* 6 Glass Counter Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 mb-16">
        {counterUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.08 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group relative rounded-2xl glass-panel p-5 md:p-6 flex flex-col items-center justify-center transition-all duration-300 shadow-glass hover:shadow-glow-rose hover:border-rose-400/40"
          >
            {/* Soft inner glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />

            <div className="relative z-10">
              <span className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-cream-100 via-champagne-300 to-rose-400 tabular-nums leading-tight">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="block mt-2 text-xs uppercase tracking-[0.25em] text-muted-text font-medium group-hover:text-champagne-300 transition-colors">
                {unit.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4 Smaller Relationship Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {siteConfig.stats.map((stat, i) => {
          const Icon = iconMap[stat.icon] || Smile;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-panel-subtle rounded-2xl p-6 text-left border border-white/10 hover:border-champagne-400/30 transition-all duration-300 shadow-lg group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-wine-700/60 border border-rose-500/20 flex items-center justify-center text-champagne-300 group-hover:text-rose-400 group-hover:border-rose-400/40 transition-colors">
                  <Icon size={20} />
                </div>
                <span className="font-serif text-2xl font-bold text-cream-100 tabular-nums">
                  {stat.value}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-cream-200 tracking-wide mb-1">
                {stat.label}
              </h3>
              <p className="text-xs text-muted-text">
                {stat.sublabel}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
