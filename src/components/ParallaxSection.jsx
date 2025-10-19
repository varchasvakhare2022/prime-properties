/**
 * ParallaxSection Component
 * Creates parallax scrolling effect for hero sections
 * Background moves slower than foreground for depth effect
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ParallaxSection = ({ 
  children, 
  backgroundImage,
  speed = 0.5,
  className = '' 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Transform scroll progress to y position
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.5]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Parallax Background */}
      {backgroundImage && (
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 -z-10"
        >
          <div 
            className="w-full h-[120%] bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;

