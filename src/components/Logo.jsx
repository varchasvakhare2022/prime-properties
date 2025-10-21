import { motion } from 'framer-motion';

/**
 * Prime Properties Luxury Logo
 * Modern skyscraper tower design with crown element - clearly property-focused while unique
 */
const Logo = ({ size = 'md', animate = true, className = '' }) => {
  const sizes = {
    sm: { container: 'w-8 h-8', icon: 'scale-[0.7]' },
    md: { container: 'w-10 h-10', icon: 'scale-[0.8]' },
    lg: { container: 'w-12 h-12', icon: 'scale-[0.9]' },
    xl: { container: 'w-16 h-16', icon: 'scale-1' },
  };

  const currentSize = sizes[size];

  const LogoContent = () => (
    <div className={`${currentSize.container} ${className} relative rounded-xl bg-gradient-to-br from-[#0a0a0a] via-[#000000] to-[#0a0a0a] flex items-center justify-center shadow-[0_4px_24px_rgba(212,175,55,0.5),0_0_40px_rgba(212,175,55,0.2)] overflow-hidden border-2 border-[#d4af37]/40`}>
      {/* Enhanced radial glow */}
      <div className="absolute inset-0 bg-radial-gradient opacity-30" 
           style={{ background: 'radial-gradient(circle at center, rgba(212,175,55,0.25) 0%, transparent 70%)' }} 
      />

      {/* Luxury Property Logo */}
      <svg
        className={`${currentSize.icon} relative z-10`}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Vibrant Gold Gradient for buildings */}
          <linearGradient id="buildingGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="30%" stopColor="#f4d58d" />
            <stop offset="60%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#b8941f" />
          </linearGradient>
          
          {/* Bright gold for highlights */}
          <linearGradient id="lightGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="50%" stopColor="#f4d58d" />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>

          {/* Crown glow gradient */}
          <linearGradient id="crownGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef9e7" />
            <stop offset="50%" stopColor="#f4d58d" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>

          {/* Window glow */}
          <radialGradient id="windowGlow">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.6" />
          </radialGradient>
          
          {/* Glow filter for crown */}
          <filter id="crownGlowFilter">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <g transform="translate(80, 80)">
          
          {/* CROWN ELEMENT - Premium/Prime indicator */}
          <g transform="translate(0, -55)" filter="url(#crownGlowFilter)">
            {/* Crown glow background */}
            <ellipse cx="0" cy="-6" rx="24" ry="8" fill="#d4af37" opacity="0.3" />
            
            {/* Crown base */}
            <path 
              d="M -20 0 L -15 -8 L -10 -2 L 0 -12 L 10 -2 L 15 -8 L 20 0 Z" 
              fill="url(#crownGlow)" 
              stroke="#fef3c7" 
              strokeWidth="1.5"
            />
            
            {/* Crown inner detail */}
            <path 
              d="M -18 -1 L -14 -7 L -10 -2.5 L 0 -10 L 10 -2.5 L 14 -7 L 18 -1 Z" 
              fill="none" 
              stroke="#fef9e7" 
              strokeWidth="0.8"
              opacity="0.6"
            />
            
            {/* Crown jewels - larger and glowing */}
            <circle cx="-15" cy="-8" r="2.5" fill="#fef9e7" stroke="#f4d58d" strokeWidth="0.5" />
            <circle cx="-15" cy="-8" r="1.5" fill="#fff" opacity="0.8" />
            
            <circle cx="0" cy="-12" r="3" fill="#fef9e7" stroke="#f4d58d" strokeWidth="0.5" />
            <circle cx="0" cy="-12" r="2" fill="#fff" opacity="0.8" />
            
            <circle cx="15" cy="-8" r="2.5" fill="#fef9e7" stroke="#f4d58d" strokeWidth="0.5" />
            <circle cx="15" cy="-8" r="1.5" fill="#fff" opacity="0.8" />
          </g>

          {/* MAIN TOWER - Central luxury building */}
          <g>
            {/* Tower body with enhanced contrast */}
            <rect 
              x="-18" y="-50" width="36" height="90" 
              fill="url(#buildingGold)" 
              stroke="#f4d58d" 
              strokeWidth="2"
              rx="2"
            />
            
            {/* Rooftop detail */}
            <rect x="-18" y="-50" width="36" height="6" fill="#fef3c7" opacity="0.3" rx="2" />
            
            {/* Window rows - with some lit windows for life/activity */}
            {[...Array(8)].map((_, i) => {
              // Pattern for lit windows (random but deterministic)
              const litWindows = [
                [false, true, false],   // Row 0
                [true, false, true],    // Row 1
                [false, false, true],   // Row 2
                [true, true, false],    // Row 3
                [false, true, true],    // Row 4
                [true, false, false],   // Row 5
                [false, true, false],   // Row 6
                [true, true, true],     // Row 7
              ];
              
              return (
                <g key={i} transform={`translate(0, ${-40 + i * 11})`}>
                  {/* Three windows per row - some lit, some dark */}
                  <rect 
                    x="-12" y="0" width="6" height="5" 
                    fill={litWindows[i][0] ? "url(#windowGlow)" : "#0a0a0a"} 
                    stroke={litWindows[i][0] ? "#f4d58d" : "#1a1a1a"}
                    strokeWidth="0.5"
                    rx="0.5" 
                    opacity={litWindows[i][0] ? "1" : "0.9"}
                  />
                  <rect 
                    x="-3" y="0" width="6" height="5" 
                    fill={litWindows[i][1] ? "url(#windowGlow)" : "#0a0a0a"} 
                    stroke={litWindows[i][1] ? "#f4d58d" : "#1a1a1a"}
                    strokeWidth="0.5"
                    rx="0.5" 
                    opacity={litWindows[i][1] ? "1" : "0.9"}
                  />
                  <rect 
                    x="6" y="0" width="6" height="5" 
                    fill={litWindows[i][2] ? "url(#windowGlow)" : "#0a0a0a"} 
                    stroke={litWindows[i][2] ? "#f4d58d" : "#1a1a1a"}
                    strokeWidth="0.5"
                    rx="0.5" 
                    opacity={litWindows[i][2] ? "1" : "0.9"}
                  />
                </g>
              );
            })}

            {/* Vertical accent lines - building edges */}
            <line x1="-18" y1="-48" x2="-18" y2="38" stroke="#fef3c7" strokeWidth="1.5" opacity="0.8" />
            <line x1="18" y1="-48" x2="18" y2="38" stroke="#fef3c7" strokeWidth="1.5" opacity="0.8" />
            
            {/* Central pillar accent - brighter */}
            <rect x="-2" y="-48" width="4" height="86" fill="#fef3c7" opacity="0.2" />
            
            {/* Building base detail */}
            <rect x="-18" y="34" width="36" height="6" fill="#b8941f" opacity="0.6" rx="1" />
          </g>

          {/* SIDE BUILDINGS - Creating skyline effect */}
          
          {/* Left smaller building */}
          <g>
            <rect 
              x="-42" y="-20" width="20" height="60" 
              fill="url(#buildingGold)" 
              stroke="#d4af37" 
              strokeWidth="1.5"
              opacity="0.9"
              rx="1"
            />
            
            {/* Rooftop detail */}
            <rect x="-42" y="-20" width="20" height="4" fill="#fef3c7" opacity="0.25" rx="1" />
            
            {/* Windows with some lit */}
            {[...Array(5)].map((_, i) => {
              const litLeft = [
                [true, false],    // Row 0
                [false, true],    // Row 1
                [true, true],     // Row 2
                [false, false],   // Row 3
                [true, false],    // Row 4
              ];
              
              return (
                <g key={`left-${i}`} transform={`translate(-32, ${-10 + i * 11})`}>
                  <rect 
                    x="-6" y="0" width="4" height="4" 
                    fill={litLeft[i][0] ? "url(#windowGlow)" : "#0a0a0a"} 
                    stroke={litLeft[i][0] ? "#f4d58d" : "#1a1a1a"}
                    strokeWidth="0.5"
                    rx="0.5" 
                    opacity={litLeft[i][0] ? "1" : "0.8"}
                  />
                  <rect 
                    x="2" y="0" width="4" height="4" 
                    fill={litLeft[i][1] ? "url(#windowGlow)" : "#0a0a0a"} 
                    stroke={litLeft[i][1] ? "#f4d58d" : "#1a1a1a"}
                    strokeWidth="0.5"
                    rx="0.5" 
                    opacity={litLeft[i][1] ? "1" : "0.8"}
                  />
                </g>
              );
            })}
            
            {/* Building edge highlight */}
            <line x1="-42" y1="-18" x2="-42" y2="38" stroke="#fef3c7" strokeWidth="1" opacity="0.6" />
          </g>

          {/* Right smaller building */}
          <g>
            <rect 
              x="22" y="-30" width="20" height="70" 
              fill="url(#buildingGold)" 
              stroke="#d4af37" 
              strokeWidth="1.5"
              opacity="0.9"
              rx="1"
            />
            
            {/* Rooftop detail */}
            <rect x="22" y="-30" width="20" height="4" fill="#fef3c7" opacity="0.25" rx="1" />
            
            {/* Windows with some lit */}
            {[...Array(6)].map((_, i) => {
              const litRight = [
                [false, true],    // Row 0
                [true, false],    // Row 1
                [true, true],     // Row 2
                [false, true],    // Row 3
                [true, false],    // Row 4
                [false, false],   // Row 5
              ];
              
              return (
                <g key={`right-${i}`} transform={`translate(32, ${-20 + i * 11})`}>
                  <rect 
                    x="-6" y="0" width="4" height="4" 
                    fill={litRight[i][0] ? "url(#windowGlow)" : "#0a0a0a"} 
                    stroke={litRight[i][0] ? "#f4d58d" : "#1a1a1a"}
                    strokeWidth="0.5"
                    rx="0.5" 
                    opacity={litRight[i][0] ? "1" : "0.8"}
                  />
                  <rect 
                    x="2" y="0" width="4" height="4" 
                    fill={litRight[i][1] ? "url(#windowGlow)" : "#0a0a0a"} 
                    stroke={litRight[i][1] ? "#f4d58d" : "#1a1a1a"}
                    strokeWidth="0.5"
                    rx="0.5" 
                    opacity={litRight[i][1] ? "1" : "0.8"}
                  />
                </g>
              );
            })}
            
            {/* Building edge highlight */}
            <line x1="42" y1="-28" x2="42" y2="38" stroke="#fef3c7" strokeWidth="1" opacity="0.6" />
          </g>

          {/* FOUNDATION/GROUND LINE - Premium base */}
          <rect 
            x="-45" y="40" width="90" height="5" 
            fill="url(#lightGold)" 
            stroke="#f4d58d"
            strokeWidth="1"
            rx="2"
          />
          <rect 
            x="-48" y="45" width="96" height="3" 
            fill="#d4af37" 
            opacity="0.7"
            rx="1"
          />
          
          {/* Shadow under foundation */}
          <ellipse cx="0" cy="48" rx="50" ry="2" fill="#000" opacity="0.4" />

          {/* Decorative key element - property symbolism - more visible */}
          <g transform="translate(-35, 28)" opacity="0.5">
            <circle cx="0" cy="0" r="3.5" fill="#f4d58d" stroke="#fef3c7" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="1.5" fill="#fef9e7" />
            <rect x="3.5" y="-0.8" width="9" height="1.6" fill="#f4d58d" stroke="#fef3c7" strokeWidth="0.5" rx="0.3" />
            <rect x="11" y="-2.5" width="1.5" height="2.5" fill="#f4d58d" rx="0.3" />
            <rect x="11" y="0.5" width="1.5" height="1.5" fill="#f4d58d" rx="0.3" />
          </g>
          
          {/* Additional decorative stars/sparkles */}
          <g opacity="0.6">
            <path d="M -52 -15 L -50 -15 L -51 -13 L -52 -15 L -53 -13 Z" fill="#fef3c7" />
            <path d="M 52 -25 L 54 -25 L 53 -23 L 52 -25 L 51 -23 Z" fill="#fef3c7" />
            <circle cx="-48" cy="15" r="1" fill="#f4d58d" opacity="0.8" />
            <circle cx="50" cy="5" r="1" fill="#f4d58d" opacity="0.8" />
          </g>

        </g>
      </svg>

    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <LogoContent />
      </motion.div>
    );
  }

  return <LogoContent />;
};

export default Logo;

