import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Disc3, Volume2 } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const MusicSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

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
          PRESS PLAY, CLOSE YOUR EYES
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cursive text-6xl md:text-7xl lg:text-8xl text-cream-100"
        >
          The Song That Feels Like Us
        </motion.h2>
      </div>

      {/* Main Glassmorphism Music Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-panel rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden max-w-3xl mx-auto border border-rose-500/25"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Vinyl Record Display */}
          <div className="relative flex-shrink-0">
            <div
              className={`w-40 h-40 md:w-48 md:h-48 rounded-full bg-stone-950 border-4 border-stone-800 shadow-[0_0_30px_rgba(0,0,0,0.8)] flex items-center justify-center relative ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
            >
              {/* Concentric vinyl grooves */}
              <div className="absolute inset-2 rounded-full border border-stone-800/80" />
              <div className="absolute inset-5 rounded-full border border-stone-800/60" />
              <div className="absolute inset-8 rounded-full border border-stone-800/50" />
              <div className="absolute inset-11 rounded-full border border-stone-800/40" />

              {/* Vinyl center label */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-peach-500 flex items-center justify-center border-2 border-stone-900 shadow-inner">
                <Disc3 size={24} className="text-white" />
              </div>
            </div>

            {/* Glowing tone arm / needle accent */}
            <div className="absolute -top-3 -right-2 text-rose-400">
              <Music size={22} className="fill-rose-400/40 animate-pulse" />
            </div>
          </div>

          {/* Song Metadata & Controls */}
          <div className="text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-2 text-rose-400 mb-2">
              <Volume2 size={16} />
              <span className="text-xs uppercase tracking-widest font-semibold">
                Our Anthem
              </span>
            </div>

            <h3 className="font-serif text-3xl md:text-4xl font-bold text-cream-100 mb-1">
              {siteConfig.songTitle}
            </h3>
            <p className="font-sans text-sm text-champagne-300 tracking-wider mb-4">
              {siteConfig.songArtist}
            </p>

            <p className="font-serif italic text-muted-text text-sm md:text-base leading-relaxed mb-6">
              &ldquo;{siteConfig.songDedication}&rdquo;
            </p>

            {/* Simulated / Reactive Sound Equalizer */}
            <div className="flex items-end justify-center md:justify-start gap-1 h-8 mb-6">
              {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65].map((height, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-full bg-gradient-to-t from-rose-500 to-peach-400 transition-all duration-300"
                  style={{
                    height: isPlaying ? `${height}%` : '20%',
                    opacity: isPlaying ? 0.9 : 0.35,
                    animation: isPlaying ? `pulseSubtle ${1 + (i % 3) * 0.4}s ease-in-out infinite alternate` : 'none',
                  }}
                />
              ))}
            </div>

            {/* Play / Pause Toggle Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-peach-500 text-cream-100 font-semibold text-xs tracking-[0.2em] uppercase shadow-glow-rose hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <div className="w-4 h-4 flex items-center justify-center gap-1">
                    <span className="w-1.5 h-3.5 bg-white rounded-xs" />
                    <span className="w-1.5 h-3.5 bg-white rounded-xs" />
                  </div>
                  <span>Hide Player</span>
                </>
              ) : (
                <>
                  <Play size={16} className="fill-white" />
                  <span>Play Our Song</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Embedded YouTube Player on user click */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 pt-8 border-t border-white/10"
          >
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-rose-500/30">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${siteConfig.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title={`${siteConfig.songTitle} - ${siteConfig.songArtist}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
