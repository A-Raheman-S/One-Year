import type { Variants } from 'framer-motion';

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const cardHoverSpring = {
  scale: 1.02,
  y: -5,
  transition: { type: 'spring', stiffness: 300, damping: 20 }
};

export const magneticSpring = {
  type: 'spring',
  stiffness: 150,
  damping: 15,
  mass: 0.1
};
