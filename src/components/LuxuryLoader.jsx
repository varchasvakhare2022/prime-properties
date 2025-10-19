import { motion } from 'framer-motion';
import Logo from './Logo';

/**
 * Luxury Loading Component
 * Professional loading indicator with gold accents
 */
const LuxuryLoader = ({ fullScreen = true, size = 'md' }) => {
  const sizes = {
    sm: { container: 'w-12 h-12', dot: 'w-2 h-2' },
    md: { container: 'w-20 h-20', dot: 'w-3 h-3' },
    lg: { container: 'w-32 h-32', dot: 'w-4 h-4' },
  };

  const currentSize = sizes[size];

  const containerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const dotVariants = {
    animate: (i) => ({
      scale: [1, 1.5, 1],
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: i * 0.2,
        ease: "easeInOut"
      }
    })
  };

  const content = (
    <div className="flex flex-col items-center gap-6">
      {/* Logo spinner */}
      <motion.div
        className={`relative ${currentSize.container}`}
        variants={containerVariants}
        animate="animate"
      >
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner glow */}
        <motion.div
          className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-md"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.8, 1, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Center Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Logo size={size} animate={false} />
        </div>
      </motion.div>

      {/* Animated dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`${currentSize.dot} rounded-full bg-gradient-to-r from-primary to-secondary`}
            custom={i}
            variants={dotVariants}
            animate="animate"
          />
        ))}
      </div>

      {/* Loading text */}
      <motion.p
        className="text-primary font-medium text-sm tracking-widest"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        LOADING...
      </motion.p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-dark-bg flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default LuxuryLoader;

