/**
 * SuspenseFallback Component
 * Loading fallback for React.lazy() components
 * Shows animated loading state during code splitting
 */

import { motion } from 'framer-motion';
import GradientSpinner from './GradientSpinner';

const SuspenseFallback = () => {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <GradientSpinner size="xl" className="mb-6" />
        
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-white mb-2"
        >
          Loading...
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400"
        >
          Preparing your experience
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SuspenseFallback;

