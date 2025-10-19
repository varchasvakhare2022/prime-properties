import { motion } from 'framer-motion';

/**
 * Premium Logo Component
 * Uses the luxury favicon design throughout the website
 */
const Logo = ({ size = 'md', animate = true, className = '' }) => {
  const sizes = {
    sm: { container: 'w-8 h-8', icon: 'scale-[0.4]' },
    md: { container: 'w-10 h-10', icon: 'scale-[0.45]' },
    lg: { container: 'w-12 h-12', icon: 'scale-[0.5]' },
    xl: { container: 'w-16 h-16', icon: 'scale-[0.6]' },
  };

  const currentSize = sizes[size];

  const LogoContent = () => (
    <div className={`${currentSize.container} ${className} relative rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-gold-lg overflow-hidden`}>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 20px)`,
          }}
        />
      </div>

      {/* Luxury House Icon */}
      <svg
        className={`${currentSize.icon} relative z-10`}
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradients */}
        <defs>
          <linearGradient id="goldShine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#fff4d4', stopOpacity: 0.6 }} />
            <stop offset="50%" style={{ stopColor: '#1a1a1a', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0a0a0a', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <g transform="translate(128, 128)">
          {/* Roof */}
          <path 
            d="M -60 -20 L 0 -70 L 60 -20 L 50 -20 L 50 -10 L -50 -10 L -50 -20 Z" 
            fill="url(#goldShine)" 
            stroke="#1a1a1a" 
            strokeWidth="3"
            strokeLinejoin="round"
          />
          
          {/* Roof highlight */}
          <line 
            x1="-40" y1="-40" x2="40" y2="-40" 
            stroke="#0a0a0a" 
            strokeWidth="2" 
            opacity="0.3"
            strokeLinecap="round"
          />
          
          {/* Main House Body */}
          <rect 
            x="-50" y="-10" width="100" height="70" 
            fill="#1a1a1a" 
            stroke="#0a0a0a" 
            strokeWidth="3"
            rx="2"
          />
          
          {/* Door */}
          <rect 
            x="-15" y="20" width="30" height="40" 
            fill="url(#goldShine)"
            stroke="#0a0a0a"
            strokeWidth="2"
            rx="2"
          />
          
          {/* Door panels */}
          <rect 
            x="-12" y="23" width="24" height="16" 
            fill="none" 
            stroke="#0a0a0a" 
            strokeWidth="1.5"
            rx="1"
            opacity="0.3"
          />
          <rect 
            x="-12" y="42" width="24" height="15" 
            fill="none" 
            stroke="#0a0a0a" 
            strokeWidth="1.5"
            rx="1"
            opacity="0.3"
          />
          
          {/* Windows - Left */}
          <rect 
            x="-42" y="5" width="20" height="20" 
            fill="#0a0a0a"
            stroke="#0a0a0a" 
            strokeWidth="2"
            rx="1"
          />
          
          {/* Windows - Right */}
          <rect 
            x="22" y="5" width="20" height="20" 
            fill="#0a0a0a"
            stroke="#0a0a0a" 
            strokeWidth="2"
            rx="1"
          />
          
          {/* Window cross bars - Left */}
          <line x1="-32" y1="5" x2="-32" y2="25" stroke="#1a1a1a" strokeWidth="2"/>
          <line x1="-42" y1="15" x2="-22" y2="15" stroke="#1a1a1a" strokeWidth="2"/>
          
          {/* Window cross bars - Right */}
          <line x1="32" y1="5" x2="32" y2="25" stroke="#1a1a1a" strokeWidth="2"/>
          <line x1="22" y1="15" x2="42" y2="15" stroke="#1a1a1a" strokeWidth="2"/>
          
          {/* Door handle */}
          <circle cx="8" cy="42" r="2" fill="#0a0a0a"/>
          
          {/* Chimney */}
          <rect 
            x="30" y="-45" width="12" height="30" 
            fill="#1a1a1a" 
            stroke="#0a0a0a" 
            strokeWidth="2"
            rx="1"
          />
          
          {/* Chimney cap */}
          <rect 
            x="27" y="-47" width="18" height="4" 
            fill="url(#goldShine)" 
            stroke="#0a0a0a" 
            strokeWidth="1.5"
            rx="1"
          />
          
          {/* Crown on roof peak */}
          <circle 
            cx="0" cy="-70" r="6" 
            fill="url(#goldShine)" 
            stroke="#0a0a0a" 
            strokeWidth="2"
          />
          
          {/* Crown shine */}
          <circle 
            cx="-2" cy="-72" r="2.5" 
            fill="#0a0a0a" 
            opacity="0.4"
          />
        </g>
      </svg>

      {/* Pulsing glow effect */}
      {animate && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        animate={{
          filter: [
            'drop-shadow(0 0 5px rgba(212, 175, 55, 0.3))',
            'drop-shadow(0 0 8px rgba(212, 175, 55, 0.5))',
            'drop-shadow(0 0 5px rgba(212, 175, 55, 0.3))',
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <LogoContent />
      </motion.div>
    );
  }

  return <LogoContent />;
};

export default Logo;

