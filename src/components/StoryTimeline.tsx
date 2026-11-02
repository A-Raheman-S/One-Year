import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar } from 'lucide-react';
import { gsap } from '../animations/gsapConfig';
import { memories } from '../data/memories';

export const StoryTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lineProgressRef.current) return;

    // Progressively draw the central timeline line based on scroll
    gsap.fromTo(
      lineProgressRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 85%',
          scrub: 0.5,
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 max-w-5xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-24">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.35em] text-rose-400 font-semibold block mb-3"
        >
          Scroll slowly — this is how we happened.
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cursive text-6xl md:text-7xl lg:text-8xl text-cream-100"
        >
          The Story of Us
        </motion.h2>
      </div>

      {/* Central Timeline Stem */}
      <div className="relative">
        {/* Background track line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-wine-700/40 hidden md:block" />

        {/* Dynamic scroll-drawn pink glowing line */}
        <div
          ref={lineProgressRef}
          className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-rose-500 via-peach-500 to-rose-400 origin-top shadow-[0_0_12px_#EF6389] hidden md:block"
        />

        {/* Timeline Items */}
        <div className="space-y-20 md:space-y-28">
          {memories.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Central glowing node (Desktop) */}
                <div className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    className="w-10 h-10 rounded-full bg-wine-900 border-2 border-rose-400 flex items-center justify-center shadow-[0_0_15px_#EF6389]"
                  >
                    <Heart size={16} className="fill-rose-500 text-rose-400" />
                  </motion.div>
                </div>

                {/* Polaroid Memory Card */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50, rotate: isEven ? -4 : 4 }}
                  whileInView={{ opacity: 1, x: 0, rotate: isEven ? -1 : 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`w-full md:w-[45%] ${isEven ? 'md:pr-8' : 'md:pl-8'}`}
                >
                  <div className="relative group bg-[#F5EFE6] rounded-xl p-4 shadow-2xl transition-transform duration-500 hover:scale-[1.02] hover:-rotate-0">
                    {/* Decorative tape on top of Polaroid */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 tape-strip rounded-sm transform -rotate-1" />

                    {/* Photograph Container */}
                    <div className="relative aspect-[4/3] sm:aspect-[4/4.2] w-full overflow-hidden rounded-lg bg-stone-950 mb-4 flex items-center justify-center">
                      {/* Ambient background blur for vertical/screenshot photos */}
                      <img
                        src={item.image}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-lg opacity-30 scale-110 pointer-events-none"
                      />
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="relative z-10 w-full h-full object-contain max-h-[360px] transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-md"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />
                      
                      {/* Chapter Badge */}
                      <span className="absolute bottom-3 left-3 z-20 px-3 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-champagne-300 border border-white/10 shadow-sm">
                        {item.chapter}
                      </span>
                    </div>

                    {/* Handwritten style caption & details */}
                    <div className="px-2 pt-1 pb-2 text-stone-800">
                      <div className="flex items-center justify-between text-xs text-stone-500 uppercase tracking-widest mb-1.5 font-sans font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} className="text-rose-500" />
                          {item.date}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl md:text-2xl font-bold text-stone-900 mb-2 leading-snug">
                        {item.title}
                      </h3>

                      <p className="font-serif italic text-stone-700 text-sm md:text-base leading-relaxed">
                        &ldquo;{item.caption}&rdquo;
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Empty side for layout symmetry on desktop */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
