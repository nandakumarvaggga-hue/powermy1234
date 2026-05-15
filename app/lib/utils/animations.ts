// Smooth animation presets for consistent feel across the app
export const ANIMATION_PRESETS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  slideUp: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  slideDown: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  slideRight: {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  pulse: {
    animate: { opacity: [0.5, 1, 0.5] },
    transition: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
  },
  subtle: {
    initial: { opacity: 0.8 },
    animate: { opacity: 1 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  bounce: {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', damping: 10, stiffness: 100 },
  },
} as const;

// Hover transition values for smooth interactions
export const SMOOTH_TRANSITIONS = {
  fast: 'transition-all duration-200 ease-out',
  normal: 'transition-all duration-300 ease-out',
  smooth: 'transition-all duration-500 ease-out',
} as const;

// Easing functions for custom animations
export const EASING = {
  smooth: [0.16, 1, 0.3, 1],
  bounce: [0.34, 1.56, 0.64, 1],
  sharp: [0.25, 0.46, 0.45, 0.94],
} as const;
