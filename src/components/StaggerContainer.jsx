/**
 * StaggerContainer Component
 * Creates stagger animation effect for child elements
 * Perfect for card grids, lists, and galleries
 */

import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';

const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.08,
  className = '',
  variant = 'default' // default, luxury, slide
}) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.05 });

  const variants = {
    default: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    luxury: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.2,
          when: "beforeChildren",
          ease: [0.43, 0.13, 0.23, 0.96],
        },
      },
    },
    slide: {
      hidden: { opacity: 0, x: -30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.1,
          ease: [0.43, 0.13, 0.23, 0.96],
        },
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Export child item variants for use in child components
export const staggerItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95,
    filter: 'blur(5px)',
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Luxury variant with more dramatic effect
export const luxuryItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.9,
    rotateX: 30,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

export default StaggerContainer;

