import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LuxuryButton = ({ 
  children, 
  to, 
  href, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  className = '',
  ...props 
}) => {
  const baseClasses = "relative overflow-hidden font-bold transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-black shadow-gold-lg hover:shadow-gold-xl",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/10 shadow-gold-sm hover:shadow-gold-md",
    ghost: "bg-transparent text-primary hover:bg-primary/5",
    luxury: "bg-black border-2 border-primary text-primary shadow-gold-xl hover:shadow-gold-glow",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
    xl: "px-10 py-5 text-xl rounded-2xl",
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  const content = (
    <>
      {/* Animated Background Layers */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />
      
      {/* Gold Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {Icon && iconPosition === 'left' && (
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Icon className="w-5 h-5" />
          </motion.span>
        )}
        
        {children}
        
        {Icon && iconPosition === 'right' && (
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Icon className="w-5 h-5" />
          </motion.span>
        )}
      </span>
      
      {/* Gold Wave Effect on Click */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/20"
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
    </>
  );
  
  const motionProps = {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };
  
  if (to) {
    return (
      <Link to={to} {...props}>
        <motion.div className={`${classes} group cursor-pointer`} {...motionProps}>
          {content}
        </motion.div>
      </Link>
    );
  }
  
  if (href) {
    return (
      <a href={href} {...props}>
        <motion.div className={`${classes} group cursor-pointer`} {...motionProps}>
          {content}
        </motion.div>
      </a>
    );
  }
  
  return (
    <motion.button 
      className={`${classes} group`} 
      onClick={onClick} 
      {...motionProps}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default LuxuryButton;

