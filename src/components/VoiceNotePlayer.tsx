import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, Mic, Disc3 } from 'lucide-react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { siteConfig } from '../data/siteConfig';

export const VoiceNotePlayer: React.FC = () => {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    waveformData,
    togglePlay,
    replay,
    seek,
    changeVolume,
  } = useAudioPlayer(siteConfig.voiceNoteAudioUrl, siteConfig.voiceNoteDurationSec);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

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
          TAP TO HEAR MY VOICE
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cursive text-6xl md:text-7xl lg:text-8xl text-cream-100 uppercase"
        >
         Voice Note
        </motion.h2>
      </div>

      {/* Large Rounded Translucent Audio Deck */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-panel rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-rose-500/25 max-w-3xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          {/* Animated Vinyl Record Illustration */}
          <div className="relative flex-shrink-0">
            <div
              className={`w-36 h-36 md:w-44 md:h-44 rounded-full bg-stone-950 border-4 border-stone-800 flex items-center justify-center shadow-2xl transition-transform duration-300 ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
            >
              {/* Concentric rings */}
              <div className="absolute inset-2 rounded-full border border-stone-800" />
              <div className="absolute inset-5 rounded-full border border-stone-800/60" />
              <div className="absolute inset-8 rounded-full border border-stone-800/40" />

              {/* Center badge */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-peach-500 flex items-center justify-center border-2 border-stone-900 shadow-inner">
                <Mic size={20} className="text-white" />
              </div>
            </div>

            {/* Glowing active indicator */}
            {isPlaying && (
              <span className="absolute top-1 right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
              </span>
            )}
          </div>

          {/* Details & Waveform */}
          <div className="w-full text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-rose-400 mb-1">
              <Disc3 size={16} className={isPlaying ? 'animate-spin' : ''} />
              <span className="text-xs uppercase tracking-widest font-semibold">
                Voice Audio Recording
              </span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-cream-100 mb-1">
              &ldquo;A message from my soul to yours&rdquo;
            </h3>
            <p className="text-xs text-muted-text uppercase tracking-widest mb-6">
              Recorded by {siteConfig.voiceNoteSender} • {Math.round(duration)} seconds of pure love
            </p>

            {/* Real Audio Waveform Visualization */}
            <div className="flex items-end justify-center md:justify-start gap-1 h-14 bg-wine-900/60 p-3 rounded-2xl border border-white/5 mb-4">
              {waveformData.map((height, idx) => (
                <div
                  key={idx}
                  className="w-1.5 md:w-2 rounded-full bg-gradient-to-t from-rose-500 via-peach-400 to-champagne-300 transition-all duration-150"
                  style={{
                    height: `${height}%`,
                    opacity: isPlaying ? 0.95 : 0.35,
                  }}
                />
              ))}
            </div>

            {/* Time stamps & Progress Bar */}
            <div className="space-y-1">
              <div
                className="relative h-2 w-full bg-wine-900 rounded-full overflow-hidden cursor-pointer group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newTime = (clickX / rect.width) * duration;
                  seek(newTime);
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-peach-400 rounded-full transition-all duration-100"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-mono text-muted-text pt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-rose-500 to-peach-500 flex items-center justify-center text-white shadow-glow-rose hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              aria-label={isPlaying ? 'Pause voice note' : 'Play voice note'}
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-1 fill-white" />}
            </button>

            {/* Replay */}
            <button
              onClick={replay}
              className="w-11 h-11 rounded-full border border-champagne-400/30 bg-wine-800/40 flex items-center justify-center text-champagne-300 hover:border-champagne-400/60 hover:text-white transition-all duration-300 cursor-pointer"
              aria-label="Replay voice note"
            >
              <RotateCcw size={18} />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <Volume2 size={18} className="text-muted-text" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
              className="w-24 md:w-32 accent-rose-500 cursor-pointer"
              aria-label="Volume slider"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
