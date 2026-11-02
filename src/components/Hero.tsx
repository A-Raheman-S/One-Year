import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronDown } from 'lucide-react';
import { gsap } from '../animations/gsapConfig';
import { siteConfig } from '../data/siteConfig';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !bgImageRef.current || !contentRef.current) return;

    // Cinematic slow zoom & parallax on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    tl.to(bgImageRef.current, {
      scale: 1.15,
      yPercent: 15,
      ease: 'none',
    }, 0);

    tl.to(contentRef.current, {
      yPercent: -20,
      opacity: 0.3,
      ease: 'none',
    }, 0);
  }, []);

  const scrollToContent = () => {
    const nextSection = document.getElementById('relationship-counter');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image Container with Ken Burns effect and Parallax */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out will-change-transform"
        style={{
          backgroundImage: `url(${siteConfig.heroImage})`,
          transform: 'scale(1.05)',
        }}
      >
        {/* Cinematic dark burgundy / wine multi-gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#250D17]/80 via-[#35111E]/75 to-[#250D17] mix-blend-multiply" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#250D17]/50 to-[#1A080F]/90" />
      </div>

      {/* Hero Center Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center select-none"
      >
        {/* Anniversary Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-block px-5 py-1.5 rounded-full border border-champagne-400/35 bg-wine-900/60 backdrop-blur-md text-champagne-300 text-xs md:text-sm font-medium tracking-[0.3em] uppercase shadow-lg">
            [ {siteConfig.anniversaryYearsBadge} ]
          </span>
        </motion.div>

        {/* Couple Names separated by glowing heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-6"
        >
          <span className="font-cursive text-6xl md:text-8xl lg:text-9xl text-cream-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
            {siteConfig.personOne}
          </span>
          <motion.div
            animate={{ scale: [1, 1.25, 1], filter: ['drop-shadow(0 0 8px #EF6389)', 'drop-shadow(0 0 20px #EF6389)', 'drop-shadow(0 0 8px #EF6389)'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center text-rose-500 mx-2"
          >
            <Heart size={36} className="fill-rose-500 md:w-12 md:h-12" />
          </motion.div>
          <span className="font-cursive text-6xl md:text-8xl lg:text-9xl text-cream-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
            {siteConfig.personTwo}
          </span>
        </motion.div>

        {/* Personalized Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-serif italic text-lg md:text-2xl text-cream-200/90 max-w-2xl leading-relaxed tracking-wide mb-12 drop-shadow"
        >
          &ldquo;{siteConfig.heroSubtitle}&rdquo;
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
        aria-label="Scroll to relive our story"
      >
        <span className="text-[11px] uppercase tracking-[0.3em] text-muted-text font-semibold group-hover:text-champagne-300 transition-colors">
          {siteConfig.scrollIndicatorText}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-8 rounded-full border border-champagne-400/30 flex items-center justify-center bg-wine-900/40 backdrop-blur-sm group-hover:border-champagne-400/60"
        >
          <ChevronDown size={18} className="text-champagne-300" />
        </motion.div>
      </motion.button>
    </section>
  );
};
