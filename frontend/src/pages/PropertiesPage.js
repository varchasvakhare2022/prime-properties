import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Search, Filter, MapPin, DollarSign, Bed, Bath, Square, Eye, Heart, Share2 } from 'lucide-react';
import { ShimmerButton, ShimmerCard } from '../components/ui/shimmer';
import { GradientText, GradientBorder } from '../components/ui/gradient';
import { Navbar } from '../components/ui/navbar';
import { Footer } from '../components/ui/footer';
import propertyService from '../services/propertyService';

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [properties, searchTerm, locationFilter, priceRange]);

  const fetchProperties = async () => {
    try {
      const data = await propertyService.getAllProperties();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProperties = () => {
    let filtered = [...properties];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Location filter
    if (locationFilter) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Price range filter
    if (priceRange.min) {
      filtered = filtered.filter(property => property.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(property => property.price <= parseFloat(priceRange.max));
    }

    setFilteredProperties(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setPriceRange({ min: '', max: '' });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Seamless Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl"
        />
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 animate-pulse-glow">
                <Building2 className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Discover Your <span className="gradient-text-primary">Dream Property</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-lg">
              Explore our curated collection of premium properties across India. 
              From luxury apartments to modern villas, find your perfect home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-effect p-6 rounded-2xl border border-white/10">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                    <input
                      type="text"
                      placeholder="Search properties..."
                      className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Filter Toggle */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </motion.button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 pt-6 border-t border-white/20"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                        <input
                          type="text"
                          placeholder="Enter location..."
                          className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                          value={locationFilter}
                          onChange={(e) => setLocationFilter(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Min Price
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                        <input
                          type="number"
                          placeholder="Min price..."
                          className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Max Price
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                        <input
                          type="number"
                          placeholder="Max price..."
                          className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={clearFilters}
                      className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
                    >
                      Clear Filters
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
              <p className="text-white">Loading properties...</p>
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold text-white mb-2">
                  Available Properties <span className="gradient-text-primary">({filteredProperties.length})</span>
                </h2>
                <p className="text-white/70">
                  {filteredProperties.length === properties.length 
                    ? 'All properties' 
                    : `Filtered from ${properties.length} total properties`
                  }
                </p>
              </motion.div>

              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProperties.map((property, index) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="hover-lift"
                    >
                      <GradientBorder>
                        <div className="glass-effect p-6 rounded-2xl h-full flex flex-col group">
                          {/* Property Image Placeholder */}
                          <div className="relative mb-4 overflow-hidden rounded-xl">
                            <div className="w-full h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                              <Building2 className="w-16 h-16 text-white/60" />
                            </div>
                            <div className="absolute top-3 right-3 flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                              >
                                <Heart className="w-4 h-4 text-white" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                              >
                                <Share2 className="w-4 h-4 text-white" />
                              </motion.button>
                            </div>
                          </div>

                          {/* Property Details */}
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                              {property.title}
                            </h3>
                            <p className="text-white/70 text-sm mb-4 line-clamp-3 leading-relaxed">
                              {property.description}
                            </p>

                            {/* Property Features */}
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center text-white/80">
                                <MapPin className="w-4 h-4 mr-2 text-purple-400" />
                                <span className="text-sm">{property.location}</span>
                              </div>
                              <div className="flex items-center text-white/80">
                                <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                                <span className="text-sm font-semibold">{formatPrice(property.price)}</span>
                              </div>
                              <div className="flex items-center text-white/80">
                                <Building2 className="w-4 h-4 mr-2 text-blue-400" />
                                <span className="text-sm">{property.propertyType}</span>
                              </div>
                              {(property.bedrooms > 0 || property.bathrooms > 0 || property.area > 0) && (
                                <div className="flex items-center space-x-4 text-white/80">
                                  {property.bedrooms > 0 && (
                                    <div className="flex items-center">
                                      <Bed className="w-4 h-4 mr-1 text-purple-400" />
                                      <span className="text-sm">{property.bedrooms}</span>
                                    </div>
                                  )}
                                  {property.bathrooms > 0 && (
                                    <div className="flex items-center">
                                      <Bath className="w-4 h-4 mr-1 text-blue-400" />
                                      <span className="text-sm">{property.bathrooms}</span>
                                    </div>
                                  )}
                                  {property.area > 0 && (
                                    <div className="flex items-center">
                                      <Square className="w-4 h-4 mr-1 text-green-400" />
                                      <span className="text-sm">{property.area} sq ft</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Property Footer */}
                          <div className="mt-4 pt-4 border-t border-white/20">
                            <div className="flex items-center justify-between">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                property.status === 'AVAILABLE' 
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
                              }`}>
                                {property.status}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </GradientBorder>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Properties Found</h3>
                  <p className="text-gray-400 mb-6">
                    {properties.length === 0 
                      ? 'No properties are currently available.' 
                      : 'Try adjusting your search criteria.'
                    }
                  </p>
                  {properties.length > 0 && (
                    <ShimmerButton onClick={clearFilters}>
                      Clear Filters
                    </ShimmerButton>
                  )}
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertiesPage;
