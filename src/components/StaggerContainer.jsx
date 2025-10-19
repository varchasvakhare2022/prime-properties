/**
 * StaggerContainer Component
 * Creates stagger animation effect for child elements
 * Perfect for card grids, lists, and galleries
 */

import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';

const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.1,
  className = ''
}) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Export child item variant for use in child components
export const staggerItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default StaggerContainer;

