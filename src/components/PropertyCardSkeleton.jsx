import { motion } from 'framer-motion';

const PropertyCardSkeleton = ({ count = 6 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.05 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="animate-pulse">
            {/* Image Skeleton */}
            <div className="h-56 bg-gradient-to-br from-gray-700/30 to-gray-800/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full animate-shimmer" />
            </div>
            
            {/* Content Skeleton */}
            <div className="p-6 space-y-4">
              {/* Title */}
              <div className="h-6 bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded w-3/4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full animate-shimmer" />
              </div>
              
              {/* Location */}
              <div className="h-4 bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full animate-shimmer" />
              </div>
              
              {/* Features */}
              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded w-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full animate-shimmer" />
                  </div>
                ))}
              </div>
              
              {/* Price & Button */}
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <div className="h-8 bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded w-28 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full animate-shimmer" />
                </div>
                <div className="h-4 bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded w-24 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full animate-shimmer" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default PropertyCardSkeleton;

