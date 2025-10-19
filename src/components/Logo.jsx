import { motion } from 'framer-motion';

/**
 * Premium Logo Component
 * Uses the luxury favicon design throughout the website
 */
const Logo = ({ size = 'md', animate = true, className = '' }) => {
  const sizes = {
    sm: { container: 'w-8 h-8', icon: 'scale-[0.65]' },
    md: { container: 'w-10 h-10', icon: 'scale-[0.72]' },
    lg: { container: 'w-12 h-12', icon: 'scale-[0.8]' },
    xl: { container: 'w-16 h-16', icon: 'scale-[0.95]' },
  };

  const currentSize = sizes[size];

  const LogoContent = () => (
    <div className={`${currentSize.container} ${className} relative rounded-lg bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.3)] overflow-hidden border border-[#f4d58d]/30`}>
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`,
          }}
        />
      </div>

      {/* House Icon */}
      <svg
        className={`${currentSize.icon} relative z-10`}
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simple solid colors for professional look */}
        <defs></defs>
        
        <g transform="translate(128, 128)">
          {/* Roof */}
          <path 
            d="M -60 -20 L 0 -70 L 60 -20 L 50 -20 L 50 -10 L -50 -10 L -50 -20 Z" 
            fill="#1a1a1a" 
            stroke="#000000" 
            strokeWidth="3"
            strokeLinejoin="round"
          />
          
          {/* Main House Body */}
          <rect 
            x="-50" y="-10" width="100" height="70" 
            fill="#1a1a1a" 
            stroke="#000000" 
            strokeWidth="3"
            rx="2"
          />
          
          {/* Door */}
          <rect 
            x="-15" y="20" width="30" height="40" 
            fill="#0a0a0a"
            stroke="#000000"
            strokeWidth="2.5"
            rx="2"
          />
          
          {/* Door panels */}
          <rect 
            x="-12" y="23" width="24" height="16" 
            fill="none" 
            stroke="#1a1a1a" 
            strokeWidth="1.5"
            rx="1"
            opacity="0.6"
          />
          <rect 
            x="-12" y="42" width="24" height="15" 
            fill="none" 
            stroke="#1a1a1a" 
            strokeWidth="1.5"
            rx="1"
            opacity="0.6"
          />
          
          {/* Windows - Left */}
          <rect 
            x="-42" y="5" width="20" height="20" 
            fill="#000000"
            stroke="#000000" 
            strokeWidth="2.5"
            rx="1"
          />
          
          {/* Windows - Right */}
          <rect 
            x="22" y="5" width="20" height="20" 
            fill="#000000"
            stroke="#000000" 
            strokeWidth="2.5"
            rx="1"
          />
          
          {/* Window cross bars - Left */}
          <line x1="-32" y1="5" x2="-32" y2="25" stroke="#2a2a2a" strokeWidth="2"/>
          <line x1="-42" y1="15" x2="-22" y2="15" stroke="#2a2a2a" strokeWidth="2"/>
          
          {/* Window cross bars - Right */}
          <line x1="32" y1="5" x2="32" y2="25" stroke="#2a2a2a" strokeWidth="2"/>
          <line x1="22" y1="15" x2="42" y2="15" stroke="#2a2a2a" strokeWidth="2"/>
          
          {/* Door handle */}
          <circle cx="8" cy="42" r="2" fill="#000000"/>
          
          {/* Chimney */}
          <rect 
            x="30" y="-45" width="12" height="30" 
            fill="#1a1a1a" 
            stroke="#000000" 
            strokeWidth="2.5"
            rx="1"
          />
          
          {/* Chimney cap */}
          <rect 
            x="27" y="-47" width="18" height="5" 
            fill="#0a0a0a" 
            stroke="#000000" 
            strokeWidth="2"
            rx="1"
          />
          
          {/* Crown on roof peak */}
          <circle 
            cx="0" cy="-70" r="6" 
            fill="#0a0a0a" 
            stroke="#000000" 
            strokeWidth="2.5"
          />
        </g>
      </svg>

    </div>
  );

  // No excessive animations - keep it professional
  return <LogoContent />;
};

export default Logo;

