import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Particle Background
export const ParticleBackground = ({ color = '#d4af37', count = 50 }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: color,
            boxShadow: `0 0 ${particle.size * 2}px ${color}`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Gradient Orbs
export const GradientOrbs = ({ mousePosition }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3), transparent)',
        }}
        animate={{
          x: mousePosition.x / 20,
          y: mousePosition.y / 20,
          scale: [1, 1.2, 1],
        }}
        transition={{
          x: { type: 'spring', stiffness: 50, damping: 20 },
          y: { type: 'spring', stiffness: 50, damping: 20 },
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent)',
          right: 0,
          bottom: 0,
        }}
        animate={{
          x: -mousePosition.x / 30,
          y: -mousePosition.y / 30,
          scale: [1, 1.3, 1],
        }}
        transition={{
          x: { type: 'spring', stiffness: 50, damping: 20 },
          y: { type: 'spring', stiffness: 50, damping: 20 },
          scale: { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 },
        }}
      />
    </div>
  );
};

// Grid Pattern with Mouse Follow
export const InteractiveGrid = ({ mousePosition }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(212, 175, 55, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(212, 175, 55, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        animate={{
          backgroundPosition: `${mousePosition.x / 50}px ${mousePosition.y / 50}px`,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 30,
        }}
      />
    </div>
  );
};

// Ripple Effect
export const RippleBackground = ({ mousePosition }) => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newRipple = {
        id: Date.now(),
        x: mousePosition.x,
        y: mousePosition.y,
      };
      setRipples((prev) => [...prev, newRipple].slice(-5));
    }, 2000);

    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {ripples.map((ripple, index) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full border-2 border-primary/30"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: 500, height: 500, opacity: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

// Geometric Shapes
export const GeometricShapes = ({ mousePosition }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: 100 + i * 20,
            height: 100 + i * 20,
            border: '1px solid rgba(212, 175, 55, 0.2)',
            borderRadius: i % 2 === 0 ? '50%' : '0%',
            left: `${20 + i * 15}%`,
            top: `${10 + i * 10}%`,
          }}
          animate={{
            rotate: [0, 360],
            x: mousePosition.x / (30 + i * 10),
            y: mousePosition.y / (30 + i * 10),
          }}
          transition={{
            rotate: { duration: 20 + i * 5, repeat: Infinity, ease: 'linear' },
            x: { type: 'spring', stiffness: 50, damping: 20 },
            y: { type: 'spring', stiffness: 50, damping: 20 },
          }}
        />
      ))}
    </div>
  );
};

// Spotlight Effect
export const SpotlightEffect = ({ mousePosition }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15), transparent 70%)',
        }}
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 30,
        }}
      />
    </div>
  );
};

