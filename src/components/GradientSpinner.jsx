/**
 * GradientSpinner Component
 * Loading spinner with gradient colors (blue/purple theme)
 */

import { motion } from 'framer-motion';

const GradientSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      {/* Spinning gradient ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="w-full h-full rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #6366f1)',
        }}
      />
      
      {/* Inner circle to create ring effect */}
      <div className="absolute inset-1 bg-dark-bg rounded-full" />
      
      {/* Glow effect */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-md opacity-50"
      />
    </div>
  );
};

export default GradientSpinner;

