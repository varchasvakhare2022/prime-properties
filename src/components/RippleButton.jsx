/**
 * RippleButton Component
 * Button with ripple effect on click
 * Enhanced with glow effects and smooth animations
 */

import { motion } from 'framer-motion';
import { useState } from 'react';

const RippleButton = ({ 
  children, 
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  ...props
}) => {
  const [ripples, setRipples] = useState([]);

  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-primary/50',
    secondary: 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/10',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-white hover:bg-white/10',
  };

  const handleClick = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = {
      x,
      y,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, ripple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
    }, 600);

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden px-6 py-3 rounded-xl font-semibold 
        transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Glow effect on hover */}
      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default RippleButton;

