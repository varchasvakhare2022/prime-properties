/**
 * AnimatedInput Component
 * Input field with focus glow animation and micro-interactions
 */

import { motion } from 'framer-motion';
import { useState } from 'react';

const AnimatedInput = ({ 
  label,
  error,
  icon: Icon,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon className={`w-5 h-5 transition-colors duration-300 ${
              isFocused ? 'text-primary' : 'text-gray-500'
            }`} />
          </div>
        )}

        {/* Input */}
        <motion.input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          animate={{
            scale: isFocused ? 1.01 : 1,
          }}
          transition={{ duration: 0.2 }}
          className={`
            w-full px-4 py-3 bg-dark-bg/50 border rounded-xl
            focus:outline-none transition-all duration-300 text-white 
            placeholder-gray-500 min-h-[48px] touch-manipulation
            ${Icon ? 'pl-12' : ''}
            ${error 
              ? 'border-red-500 focus:border-red-400 focus:shadow-lg focus:shadow-red-500/20' 
              : 'border-white/10 focus:border-primary focus:shadow-lg focus:shadow-primary/20'
            }
            ${className}
          `}
          {...props}
        />

        {/* Animated border glow */}
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`absolute -inset-0.5 rounded-xl blur-md pointer-events-none ${
              error ? 'bg-red-500/20' : 'bg-gradient-to-r from-primary/30 to-secondary/30'
            }`}
            style={{ zIndex: -1 }}
          />
        )}
      </div>

      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default AnimatedInput;

