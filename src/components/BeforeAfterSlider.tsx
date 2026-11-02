import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <section className="relative py-28 px-6 max-w-5xl mx-auto text-center select-none">
      {/* Section Header */}
      <div className="mb-16">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.35em] text-rose-400 font-semibold block mb-3"
        >
          SAME SMILE, DEEPER LOVE
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cursive text-6xl md:text-7xl lg:text-8xl text-cream-100"
        >
          Then &amp; Now
        </motion.h2>
      </div>

      {/* Before / After Draggable Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-rose-500/30 shadow-2xl shadow-black/60 cursor-ew-resize touch-none bg-stone-950"
        style={{ height: '520px' }}
        ref={containerRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        {/* ── NOW (AFTER) image — sits on the bottom, full width ── */}
        <div className="absolute inset-0">
          {/* blurred fill */}
          <img
            src={siteConfig.afterImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-30 pointer-events-none"
          />
          {/* crisp main image */}
          <img
            src={siteConfig.afterImage}
            alt="Now"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <span className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-rose-400/30 text-[11px] font-bold tracking-[0.25em] uppercase text-champagne-300">
            NOW ✦ 1 YEAR
          </span>
        </div>

        {/* ── THEN (BEFORE) image — sits on top, clipped from the right ── */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          {/* blurred fill */}
          <img
            src={siteConfig.beforeImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-30 pointer-events-none"
          />
          {/* crisp main image */}
          <img
            src={siteConfig.beforeImage}
            alt="Then"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-rose-400/30 text-[11px] font-bold tracking-[0.25em] uppercase text-champagne-300">
            THEN ✦ DAY ONE
          </span>
        </div>

        {/* ── Vertical Divider Line ── */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-champagne-300 via-rose-400 to-peach-500 pointer-events-none z-30 shadow-[0_0_10px_#EF6389]"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Circular drag handle */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#250D17] border-2 border-rose-400 shadow-[0_0_15px_rgba(239,99,137,0.6)] flex items-center justify-center transition-transform duration-150 ${
              isDragging ? 'scale-110' : 'scale-100'
            }`}
          >
            <ChevronsLeftRight size={20} className="text-champagne-300" />
          </div>
        </div>
      </motion.div>

      {/* Helper caption */}
      <p className="mt-6 text-xs uppercase tracking-widest text-muted-text font-medium">
        Drag slider left or right to compare
      </p>
    </section>
  );
};
