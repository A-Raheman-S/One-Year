import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw } from 'lucide-react';
import { reasons } from '../data/reasons';

export const ReasonsCards: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="relative py-28 px-6 max-w-6xl mx-auto text-center">
      {/* Section Header */}
      <div className="mb-20">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.35em] text-rose-400 font-semibold block mb-3"
        >
          Flip each note — they're all true.
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cursive text-6xl md:text-7xl lg:text-8xl text-cream-100"
        >
          Kyu aapse itni muhabbat hai mujhe...kuch reasons...
        </motion.h2>
      </div>

      {/* 2-Column Desktop Grid for 6 Pastel Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto perspective-1200">
        {reasons.map((card, index) => {
          const isFlipped = !!flippedCards[card.id];

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`relative h-[280px] w-full cursor-pointer select-none transition-transform duration-300 hover:scale-[1.02] ${card.rotationClass}`}
              onClick={() => toggleFlip(card.id)}
            >
              <div
                className="relative w-full h-full transition-transform duration-700 transform-style-3d shadow-2xl rounded-2xl"
                style={{
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* FRONT FACE OF CARD */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl p-7 flex flex-col justify-between backface-hidden paper-card ${card.pastelBg} ${card.textColor}`}
                >
                  {/* Decorative Tape Strip */}
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 rounded-sm shadow-sm"
                    style={{ backgroundColor: card.tapeColor }}
                  />

                  {/* Top: Card Number & Heart */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-serif font-bold text-lg opacity-60 tracking-wider">
                      REASON #{card.number}
                    </span>
                    <Heart size={20} className="fill-rose-500 text-rose-500/80" />
                  </div>

                  {/* Center Content */}
                  <div className="my-auto text-left">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold leading-tight mb-2">
                      {card.frontTitle}
                    </h3>
                    <p className="font-sans text-sm md:text-base opacity-85 leading-relaxed">
                    </p>
                  </div>

                  {/* Bottom: Click to flip prompt */}
                  <div className="flex items-center justify-between pt-2 border-t border-black/10 text-xs font-semibold uppercase tracking-wider opacity-60">
                    <span>Tap to reveal note</span>
                    <RotateCcw size={14} />
                  </div>
                </div>

                {/* BACK FACE OF CARD */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl p-7 flex flex-col justify-between backface-hidden rotate-y-180 paper-card bg-[#FFFDF9] ${card.textColor}`}
                >
                  {/* Decorative Tape Strip */}
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 rounded-sm shadow-sm"
                    style={{ backgroundColor: card.tapeColor }}
                  />

                  {/* Top: Heading */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-serif text-lg font-bold text-rose-600 tracking-wide">
                    </span>
                    <Heart size={18} className="fill-rose-500 text-rose-500" />
                  </div>

                  {/* Full Heartfelt Message */}
                  <div className="my-auto text-left">
                    <p className="font-serif italic text-base md:text-lg text-stone-800 leading-relaxed">
                      &ldquo;{card.backMessage}&rdquo;
                    </p>
                  </div>

                  {/* Bottom: Return indicator */}
                  <div className="flex items-center justify-between pt-2 border-t border-black/10 text-xs font-semibold uppercase tracking-wider opacity-60">
                    <span>Tap to flip back</span>
                    <RotateCcw size={14} className="rotate-180" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
