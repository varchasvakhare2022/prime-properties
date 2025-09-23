import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const GradientBorder = ({ children, className, ...props }) => {
  return (
    <motion.div
      className={cn(
        "relative p-[2px] rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <div className="bg-background rounded-lg p-6">
        {children}
      </div>
    </motion.div>
  );
};

export const GradientText = ({ children, className, ...props }) => {
  return (
    <motion.span
      className={cn(
        "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.span>
  );
};
