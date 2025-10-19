/**
 * LoadingSkeleton Components
 * Skeleton screens for loading states
 * Provides visual feedback while content loads
 */

import { motion } from 'framer-motion';

const shimmer = {
  hidden: { opacity: 0.3 },
  visible: { 
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 1,
      ease: "easeInOut"
    }
  }
};

export const SkeletonBox = ({ width = 'w-full', height = 'h-4', className = '' }) => (
  <motion.div
    variants={shimmer}
    initial="hidden"
    animate="visible"
    className={`${width} ${height} bg-white/10 rounded-lg ${className}`}
  />
);

export const SkeletonCard = () => (
  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
    <SkeletonBox width="w-full" height="h-56" className="rounded-none" />
    <div className="p-6 space-y-4">
      <SkeletonBox width="w-3/4" height="h-6" />
      <SkeletonBox width="w-1/2" height="h-4" />
      <div className="flex gap-2">
        <SkeletonBox width="w-16" height="h-8" />
        <SkeletonBox width="w-16" height="h-8" />
        <SkeletonBox width="w-16" height="h-8" />
      </div>
      <SkeletonBox width="w-full" height="h-10" />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);

export const SkeletonText = ({ lines = 3 }) => (
  <div className="space-y-3">
    {Array.from({ length: lines }).map((_, index) => (
      <SkeletonBox 
        key={index} 
        width={index === lines - 1 ? 'w-3/4' : 'w-full'}
        height="h-4"
      />
    ))}
  </div>
);

const LoadingSkeleton = {
  Box: SkeletonBox,
  Card: SkeletonCard,
  Grid: SkeletonGrid,
  Text: SkeletonText,
};

export default LoadingSkeleton;

