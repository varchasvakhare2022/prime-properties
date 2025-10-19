import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const AdvancedScrollReveal = ({ 
  children, 
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 50,
  className = '',
  once = true,
  cascade = false,
  cascadeDelay = 0.1,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.2 });
  
  const directionVariants = {
    up: {
      hidden: { opacity: 0, y: distance },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      }
    },
    down: {
      hidden: { opacity: 0, y: -distance },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      }
    },
    left: {
      hidden: { opacity: 0, x: distance },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      }
    },
    right: {
      hidden: { opacity: 0, x: -distance },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      }
    },
    zoom: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      }
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      }
    },
    blur: {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      visible: { 
        opacity: 1, 
        filter: 'blur(0px)',
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      }
    },
    rotate: {
      hidden: { opacity: 0, rotate: -10, scale: 0.9 },
      visible: { 
        opacity: 1, 
        rotate: 0,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      }
    },
    luxury: {
      hidden: { 
        opacity: 0, 
        y: distance, 
        scale: 0.95,
        filter: 'blur(5px)' 
      },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      }
    },
  };
  
  const cascadeVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: cascadeDelay,
        delayChildren: delay,
      }
    }
  };
  
  const cascadeItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  };
  
  if (cascade) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={cascadeVariants}
        className={className}
      >
        {Array.isArray(children) ? (
          children.map((child, index) => (
            <motion.div key={index} variants={cascadeItemVariants}>
              {child}
            </motion.div>
          ))
        ) : (
          <motion.div variants={cascadeItemVariants}>
            {children}
          </motion.div>
        )}
      </motion.div>
    );
  }
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={directionVariants[direction]}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AdvancedScrollReveal;

