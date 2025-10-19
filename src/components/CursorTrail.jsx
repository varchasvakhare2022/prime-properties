/**
 * CursorTrail Component
 * Aceternity-style cursor trail effect for hero sections
 * Creates a glowing trail that follows the mouse
 */

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CursorTrail = ({ className = '' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPosition = { 
        x: e.clientX, 
        y: e.clientY, 
        id: Date.now() 
      };
      
      setMousePosition(newPosition);
      setTrail((prev) => [...prev.slice(-20), newPosition]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none z-50 ${className}`}>
      {/* Main cursor glow */}
      <motion.div
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
        className="absolute w-5 h-5 rounded-full bg-gradient-to-r from-primary to-secondary opacity-60 blur-md"
      />

      {/* Trail dots */}
      {trail.map((pos, index) => (
        <motion.div
          key={pos.id}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 0,
            x: pos.x - 5,
            y: pos.y - 5,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
          style={{
            opacity: (index / trail.length) * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default CursorTrail;

