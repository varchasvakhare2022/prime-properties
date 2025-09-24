import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const ShimmerButton = ({ children, className, asChild = false, ...props }) => {
  const shimmerClasses = cn(
    "relative inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
    className
  );

  if (asChild) {
    // When asChild is true, clone the child element and add shimmer classes
    return React.cloneElement(children, {
      className: cn(shimmerClasses, children.props.className),
      ...props
    });
  }

  return (
    <motion.button
      className={shimmerClasses}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const ShimmerCard = ({ children, className, ...props }) => {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-lg border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] p-6",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
