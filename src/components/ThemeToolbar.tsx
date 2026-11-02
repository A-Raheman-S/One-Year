import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Palette } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../hooks/useTheme';

export const ThemeToolbar: React.FC = () => {
  const { theme, selectTheme, themes } = useTheme();

  const handleSendLove = () => {
    // Launch a romantic burst of confetti and heart celebration
    confetti({
      particleCount: 75,
      spread: 90,
      origin: { y: 0.85 },
      colors: ['#EF6389', '#F2A16F', '#E9BC91', '#ffffff'],
      disableForReducedMotion: true,
    });
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[95vw]">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-2.5 rounded-full bg-[#1B0811]/85 backdrop-blur-xl border border-rose-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.7)]"
      >
        {/* Theme Selector Preview */}
        <div className="flex items-center gap-1.5 sm:gap-2 pr-2 sm:pr-3 border-r border-white/10">
          <Palette size={15} className="text-muted-text hidden sm:block" />
          <span className="text-[10px] uppercase tracking-widest text-muted-text font-semibold hidden md:block">
            Theme
          </span>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {themes.map((t) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => selectTheme(t.id)}
                  title={t.name}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 relative cursor-pointer ${
                    isSelected
                      ? 'scale-115 ring-2 ring-white/80 ring-offset-2 ring-offset-[#1B0811]'
                      : 'opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                  style={{ backgroundColor: t.previewColor }}
                  aria-label={`Select ${t.name} theme`}
                >
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Prominent Peach Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSendLove}
          className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-peach-500 via-rose-500 to-rose-600 text-white font-semibold text-xs tracking-wider uppercase shadow-glow-peach hover:shadow-glow-rose transition-all cursor-pointer whitespace-nowrap"
        >
          <Heart size={14} className="fill-white" />
          <span>Send Love</span>
          <Sparkles size={13} className="hidden sm:inline" />
        </motion.button>
      </motion.div>
    </div>
  );
};
