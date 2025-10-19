import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const CustomCursor = ({ section = 'default' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  // Cursor styles for different sections
  const getCursorStyle = () => {
    switch (section) {
      case 'hero':
        return {
          size: isHovering ? 60 : 40,
          border: '2px solid rgba(212, 175, 55, 0.8)',
          bg: 'radial-gradient(circle, rgba(212, 175, 55, 0.2), transparent)',
          shadow: '0 0 30px rgba(212, 175, 55, 0.6)',
          animation: 'pulse',
        };
      case 'trust':
        return {
          size: isHovering ? 50 : 35,
          border: '2px solid rgba(99, 102, 241, 0.6)',
          bg: 'radial-gradient(circle, rgba(99, 102, 241, 0.2), transparent)',
          shadow: '0 0 25px rgba(99, 102, 241, 0.5)',
          animation: 'rotate',
        };
      case 'stats':
        return {
          size: isHovering ? 55 : 38,
          border: '3px solid rgba(212, 175, 55, 1)',
          bg: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(196, 148, 31, 0.3))',
          shadow: '0 0 35px rgba(212, 175, 55, 0.8)',
          animation: 'glow',
        };
      case 'features':
        return {
          size: isHovering ? 58 : 42,
          border: '2px dashed rgba(139, 92, 246, 0.7)',
          bg: 'conic-gradient(from 0deg, rgba(139, 92, 246, 0.2), rgba(212, 175, 55, 0.2), rgba(139, 92, 246, 0.2))',
          shadow: '0 0 30px rgba(139, 92, 246, 0.6)',
          animation: 'spin',
        };
      case 'cta':
        return {
          size: isHovering ? 70 : 45,
          border: '3px solid rgba(212, 175, 55, 0.9)',
          bg: 'radial-gradient(circle, rgba(212, 175, 55, 0.4), rgba(196, 148, 31, 0.2))',
          shadow: '0 0 40px rgba(212, 175, 55, 1), 0 0 60px rgba(212, 175, 55, 0.5)',
          animation: 'mega-glow',
        };
      default:
        return {
          size: isHovering ? 48 : 32,
          border: '2px solid rgba(212, 175, 55, 0.6)',
          bg: 'rgba(212, 175, 55, 0.15)',
          shadow: '0 0 20px rgba(212, 175, 55, 0.4)',
          animation: 'none',
        };
    }
  };

  const style = getCursorStyle();

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="custom-cursor fixed pointer-events-none z-[9999] mix-blend-screen"
        animate={{
          x: mousePosition.x - style.size / 2,
          y: mousePosition.y - style.size / 2,
          width: style.size,
          height: style.size,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        style={{
          border: style.border,
          background: style.bg,
          borderRadius: '50%',
          boxShadow: style.shadow,
        }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed pointer-events-none z-[10000]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 1000,
          damping: 50,
        }}
        style={{
          width: 6,
          height: 6,
          background: 'rgba(212, 175, 55, 1)',
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(212, 175, 55, 1)',
        }}
      />

      {/* Outer Ring - Animated */}
      {style.animation !== 'none' && (
        <motion.div
          className={`fixed pointer-events-none z-[9998] ${
            style.animation === 'pulse' ? 'animate-pulse' :
            style.animation === 'rotate' ? 'animate-spin' :
            style.animation === 'glow' ? 'animate-luxury-glow' :
            style.animation === 'spin' ? 'animate-spin' :
            style.animation === 'mega-glow' ? 'animate-glow-pulse' : ''
          }`}
          animate={{
            x: mousePosition.x - style.size / 2 - 10,
            y: mousePosition.y - style.size / 2 - 10,
            width: style.size + 20,
            height: style.size + 20,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          style={{
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '50%',
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;

