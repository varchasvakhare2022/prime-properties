/**
 * Luxury Animation Utilities
 * Professional animation configurations for high-end real estate platform
 */

// Smooth easing curves for luxury feel
export const easings = {
  smooth: [0.43, 0.13, 0.23, 0.96],
  luxury: [0.25, 0.46, 0.45, 0.94],
  elastic: [0.68, -0.55, 0.265, 1.55],
  silk: [0.4, 0.0, 0.2, 1],
};

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.luxury,
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.4,
      ease: easings.smooth,
    }
  }
};

// Stagger container for lists/grids
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    }
  }
};

// Stagger item variants
export const staggerItem = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easings.luxury,
    }
  }
};

// Fade in up with scale
export const fadeInUp = {
  initial: { opacity: 0, y: 40, scale: 0.9 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.7,
      ease: easings.luxury,
    }
  }
};

// Fade in from sides
export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: easings.smooth,
    }
  }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: easings.smooth,
    }
  }
};

// Luxury hover effect for cards
export const luxuryCardHover = {
  rest: { 
    scale: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
  },
  hover: { 
    scale: 1.02,
    y: -12,
    transition: {
      duration: 0.4,
      ease: easings.luxury,
    }
  },
  tap: { 
    scale: 0.98,
    transition: {
      duration: 0.2,
    }
  }
};

// Button press animation
export const buttonPress = {
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.3, ease: easings.smooth }
  },
  whileTap: { 
    scale: 0.97,
    transition: { duration: 0.15 }
  }
};

// Magnetic effect configuration
export const magneticConfig = {
  strength: 0.3, // How much the element moves toward cursor
  threshold: 80, // Distance threshold for magnetic effect
};

// Smooth rotate on hover
export const rotateOnHover = {
  whileHover: {
    rotate: [0, -5, 5, -3, 3, 0],
    transition: {
      duration: 0.5,
      ease: easings.elastic,
    }
  }
};

// Gold shimmer effect
export const goldShimmer = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear',
    }
  }
};

// Floating animation
export const float = {
  animate: {
    y: [-8, 8, -8],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: easings.silk,
    }
  }
};

// Pulse glow effect
export const pulseGlow = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(212, 175, 55, 0.3)',
      '0 0 40px rgba(212, 175, 55, 0.6)',
      '0 0 20px rgba(212, 175, 55, 0.3)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easings.silk,
    }
  }
};

// Reveal from blur
export const revealFromBlur = {
  initial: { opacity: 0, filter: 'blur(10px)', y: 20 },
  animate: { 
    opacity: 1, 
    filter: 'blur(0px)', 
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.luxury,
    }
  }
};

// Scale in with rotation
export const scaleRotateIn = {
  initial: { opacity: 0, scale: 0.5, rotate: -10 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: easings.elastic,
    }
  }
};

// Text reveal character by character
export const textReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: easings.luxury,
    }
  })
};

// Expand width animation
export const expandWidth = {
  initial: { width: 0, opacity: 0 },
  animate: { 
    width: '100%', 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easings.smooth,
    }
  }
};

// Ripple effect configuration
export const rippleEffect = {
  scale: [0, 2.5],
  opacity: [0.6, 0],
  transition: {
    duration: 0.8,
    ease: easings.smooth,
  }
};

