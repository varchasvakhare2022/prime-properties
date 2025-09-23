import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const GlassCard = ({ children, className, ...props }) => {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export const AuthCard = ({ children, className, ...props }) => {
  return (
    <GlassCard className={cn("w-full max-w-md mx-auto p-8", className)} {...props}>
      {children}
    </GlassCard>
  );
};
