import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, ArrowRight } from 'lucide-react';
import { formatPriceINR } from '../utils/formatPrice';

const PropertyCard = ({ property, loading = false, index = 0 }) => {
  // Loading skeleton
  if (loading) {
    return (
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="animate-pulse">
          {/* Image Skeleton */}
          <div className="h-56 bg-gray-700/50" />
          
          {/* Content Skeleton */}
          <div className="p-6 space-y-4">
            <div className="h-6 bg-gray-700/50 rounded w-3/4" />
            <div className="h-4 bg-gray-700/50 rounded w-1/2" />
            <div className="flex gap-4">
              <div className="h-8 bg-gray-700/50 rounded w-16" />
              <div className="h-8 bg-gray-700/50 rounded w-16" />
              <div className="h-8 bg-gray-700/50 rounded w-16" />
            </div>
            <div className="flex justify-between items-center pt-4">
              <div className="h-8 bg-gray-700/50 rounded w-24" />
              <div className="h-4 bg-gray-700/50 rounded w-20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get image from new structure (images array) or fallback
  const imageSrc = property?.images?.[0] || property?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(property?.title || 'Property')}&size=800&background=6366f1&color=fff`;
  
  // Get location string
  const locationString = property?.location?.city && property?.location?.state 
    ? `${property.location.city}, ${property.location.state}`
    : property?.location || 'Location not specified';

  // Get property features
  const bedrooms = property?.features?.bedrooms || property?.bedrooms;
  const bathrooms = property?.features?.bathrooms || property?.bathrooms;
  const area = property?.features?.area || property?.area;
  const propertyType = property?.features?.propertyType || property?.type;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative h-full"
    >
      {/* Enhanced Glow Effect with Animation */}
      <motion.div 
        className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-0 group-hover:opacity-75 blur-xl transition-all duration-500"
        whileHover={{ scale: 1.05 }}
      />
      
      <Link to={`/properties/${property.id}`} className="block h-full">
        <div className="relative backdrop-blur-xl bg-black/40 border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/60 hover:shadow-gold-xl hover:bg-black/60 transition-all duration-300 h-full flex flex-col">
          {/* Property Image */}
          <div className="relative overflow-hidden h-56">
                  <motion.img
                    src={imageSrc}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(property?.title || 'Property')}&size=800&background=6366f1&color=fff`;
                    }}
                  />
            
            {/* Property Type Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 right-4 z-10"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-black text-sm font-bold shadow-gold-lg backdrop-blur-sm">
                {propertyType}
              </span>
            </motion.div>

            {/* Gradient Overlay - Darker for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Featured Badge (Optional) */}
            {property.featured && (
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-black text-xs font-bold shadow-gold-md backdrop-blur-sm animate-luxury-glow">
                Featured
              </div>
            )}
          </div>

          {/* Card Content */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Title */}
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.8)] transition-all duration-300 line-clamp-1">
              {property.title}
            </h3>

            {/* Location */}
            <div className="flex items-center text-gray-400 group-hover:text-gray-300 mb-4 transition-colors duration-300">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-primary group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
              <span className="text-sm line-clamp-1 group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{locationString}</span>
            </div>

            {/* Key Features Badges */}
            <div className="flex items-center gap-3 mb-4 text-sm text-gray-400 group-hover:text-white">
              {bedrooms > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black/50 border border-primary/20 group-hover:border-primary/50 group-hover:bg-black/70 group-hover:shadow-gold-sm transition-all duration-300">
                  <Bed className="w-4 h-4 text-primary group-hover:drop-shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
                  <span className="font-semibold">{bedrooms}</span>
                </div>
              )}
              {bathrooms > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black/50 border border-primary/20 group-hover:border-secondary/50 group-hover:bg-black/70 group-hover:shadow-gold-sm transition-all duration-300">
                  <Bath className="w-4 h-4 text-secondary group-hover:drop-shadow-[0_0_6px_rgba(196,148,31,0.8)]" />
                  <span className="font-semibold">{bathrooms}</span>
                </div>
              )}
              {area > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black/50 border border-primary/20 group-hover:border-primary/50 group-hover:bg-black/70 group-hover:shadow-gold-sm transition-all duration-300">
                  <Maximize className="w-4 h-4 text-primary group-hover:drop-shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
                  <span className="whitespace-nowrap font-semibold">{area} sqft</span>
                </div>
              )}
            </div>

            {/* Description (Optional) */}
            {property.description && (
              <p className="text-gray-400 group-hover:text-gray-300 text-sm mb-4 line-clamp-2 flex-1 transition-colors duration-300 group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {property.description}
              </p>
            )}

            {/* Price & View Details */}
            <div className="flex items-center justify-between pt-4 border-t border-primary/10 group-hover:border-primary/30 mt-auto transition-colors duration-300">
              <div>
                <p className="text-xs text-gray-500 group-hover:text-gray-400 mb-1 transition-colors duration-300">Price</p>
                <span className="text-2xl font-bold text-primary group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.9)] transition-all duration-300">
                  {formatPriceINR(property.price)}
                </span>
              </div>
              
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-primary font-bold group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all duration-300"
              >
                <span className="text-sm">View Details</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>

            {/* Additional Amenities (Optional) */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {property.amenities.slice(0, 2).map((amenity, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:shadow-gold-sm transition-all duration-300 font-medium"
                  >
                    {amenity}
                  </span>
                ))}
                {property.amenities.length > 2 && (
                  <span className="text-xs px-2 py-1 rounded-md bg-black/40 text-gray-400 group-hover:text-gray-300 border border-primary/10 group-hover:border-primary/20 transition-all duration-300">
                    +{property.amenities.length - 2} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-4 left-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;

