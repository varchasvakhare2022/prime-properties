/**
 * CounterAnimation Component
 * Animates numbers counting up when visible
 * Perfect for statistics and metrics
 */

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const CounterAnimation = ({ 
  value, 
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = ''
}) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) =>
    (prefix + current.toFixed(decimals) + suffix)
  );

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated, spring, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
};

export default CounterAnimation;

