/**
 * PageTransition Component
 * Wraps page content with smooth fade-in/fade-out animations
 * Uses framer-motion for premium luxury page transitions
 */

import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94], // Premium easing
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    filter: 'blur(5px)',
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Gold shimmer overlay for page transitions
const overlayVariants = {
  initial: {
    scaleX: 0,
    transformOrigin: 'left',
  },
  animate: {
    scaleX: 0,
    transformOrigin: 'left',
  },
  exit: {
    scaleX: [0, 1, 1, 0],
    transformOrigin: ['left', 'left', 'right', 'right'],
    transition: {
      duration: 0.8,
      times: [0, 0.3, 0.7, 1],
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

const PageTransition = ({ children }) => {
  return (
    <>
      {/* Premium Gold Overlay */}
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-r from-primary via-secondary to-primary pointer-events-none"
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      />
      
      {/* Page Content */}
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;

