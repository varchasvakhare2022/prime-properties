/**
 * AnimatedButton Component
 * Button with professional hover and tap animations
 * Supports gradient backgrounds and icon placement
 */

import { motion } from 'framer-motion';

const AnimatedButton = ({ 
  children, 
  onClick,
  href,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white',
    secondary: 'bg-white/5 border border-white/10 text-white hover:bg-white/10',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-white hover:bg-white/10',
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      onClick={onClick}
      href={href}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl 
        font-semibold transition-all duration-300 cursor-pointer
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </Component>
  );
};

export default AnimatedButton;

