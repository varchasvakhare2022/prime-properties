/**
 * ScrollReveal Component
 * Animates children when they enter viewport
 * Supports different animation directions and delays
 */

import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';

const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0,
  duration = 0.6,
  once = true,
  className = ''
}) => {
  const [ref, isVisible] = useScrollAnimation({ triggerOnce: once });

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  const initial = {
    opacity: 0,
    ...directions[direction],
  };

  const animate = {
    opacity: isVisible ? 1 : 0,
    x: isVisible ? 0 : directions[direction].x,
    y: isVisible ? 0 : directions[direction].y,
    transition: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

