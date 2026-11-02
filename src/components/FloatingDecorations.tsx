import React from 'react';
import { Heart, Sparkles, Star, Camera } from 'lucide-react';

interface FloatingItem {
  id: number;
  type: 'heart' | 'sparkle' | 'star' | 'camera';
  top: string;
  left: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  rotation: number;
}

const DECORATIONS: FloatingItem[] = [
  { id: 1, type: 'heart', top: '12%', left: '8%', size: 18, opacity: 0.22, duration: 9, delay: 0, rotation: -12 },
  { id: 2, type: 'sparkle', top: '24%', left: '88%', size: 16, opacity: 0.28, duration: 11, delay: 1.5, rotation: 15 },
  { id: 3, type: 'star', top: '35%', left: '6%', size: 14, opacity: 0.2, duration: 8, delay: 0.8, rotation: 8 },
  { id: 4, type: 'heart', top: '48%', left: '92%', size: 22, opacity: 0.18, duration: 12, delay: 2, rotation: -15 },
  { id: 5, type: 'camera', top: '60%', left: '5%', size: 16, opacity: 0.18, duration: 10, delay: 3, rotation: -6 },
  { id: 6, type: 'sparkle', top: '72%', left: '90%', size: 20, opacity: 0.25, duration: 9.5, delay: 1, rotation: 20 },
  { id: 7, type: 'heart', top: '82%', left: '10%', size: 16, opacity: 0.2, duration: 13, delay: 2.5, rotation: 12 },
  { id: 8, type: 'star', top: '94%', left: '85%', size: 15, opacity: 0.22, duration: 8.5, delay: 0.5, rotation: -10 },
  { id: 9, type: 'sparkle', top: '6%', left: '75%', size: 18, opacity: 0.3, duration: 10, delay: 1.2, rotation: 5 },
  { id: 10, type: 'heart', top: '55%', left: '82%', size: 14, opacity: 0.2, duration: 11, delay: 3.2, rotation: 14 },
];

export const FloatingDecorations: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {DECORATIONS.map((item) => {
        const IconComponent =
          item.type === 'heart'
            ? Heart
            : item.type === 'sparkle'
            ? Sparkles
            : item.type === 'star'
            ? Star
            : Camera;

        return (
          <div
            key={item.id}
            className="absolute text-rose-400"
            style={{
              top: item.top,
              left: item.left,
              opacity: item.opacity,
              animation: `float ${item.duration}s ease-in-out ${item.delay}s infinite alternate`,
              transform: `rotate(${item.rotation}deg)`,
            }}
          >
            <IconComponent
              size={item.size}
              className={item.type === 'heart' ? 'fill-rose-400/40 text-rose-400' : 'text-champagne-300'}
            />
          </div>
        );
      })}
    </div>
  );
};
