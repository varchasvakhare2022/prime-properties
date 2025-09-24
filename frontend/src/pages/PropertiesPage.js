import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Search, Filter, MapPin, DollarSign, Bed, Bath, Square } from 'lucide-react';
import { ShimmerButton, ShimmerCard } from '../components/ui/shimmer';
import { GradientText } from '../components/ui/gradient';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Discover Your <GradientText>Dream Property</GradientText>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Explore our curated collection of premium properties across India. 
              From luxury apartments to modern villas, find your perfect home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ShimmerCard className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search properties..."
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Filter Toggle */}
                <ShimmerButton onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </ShimmerButton>
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
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Enter location..."
                          className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          value={locationFilter}
                          onChange={(e) => setLocationFilter(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Min Price
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          placeholder="Min price..."
                          className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Max Price
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          placeholder="Max price..."
                          className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <ShimmerButton onClick={clearFilters} className="mr-2">
                      Clear Filters
                    </ShimmerButton>
                  </div>
                </motion.div>
              )}
            </ShimmerCard>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
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
                  Available Properties ({filteredProperties.length})
                </h2>
                <p className="text-gray-300">
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
                    >
                      <ShimmerCard className="p-6 h-full flex flex-col">
                        <div className="flex-1">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-white mb-2">
                              {property.title}
                            </h3>
                            <p className="text-gray-300 text-sm mb-3">
                              {property.description}
                            </p>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-gray-300">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span className="text-sm">{property.location}</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                              <DollarSign className="w-4 h-4 mr-2" />
                              <span className="text-sm font-semibold">{formatPrice(property.price)}</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                              <Building2 className="w-4 h-4 mr-2" />
                              <span className="text-sm">{property.propertyType}</span>
                            </div>
                            {property.bedrooms > 0 && (
                              <div className="flex items-center text-gray-300">
                                <Bed className="w-4 h-4 mr-2" />
                                <span className="text-sm">{property.bedrooms} Bedrooms</span>
                              </div>
                            )}
                            {property.bathrooms > 0 && (
                              <div className="flex items-center text-gray-300">
                                <Bath className="w-4 h-4 mr-2" />
                                <span className="text-sm">{property.bathrooms} Bathrooms</span>
                              </div>
                            )}
                            {property.area > 0 && (
                              <div className="flex items-center text-gray-300">
                                <Square className="w-4 h-4 mr-2" />
                                <span className="text-sm">{property.area} sq ft</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/20">
                          <div className="flex items-center justify-between">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              property.status === 'AVAILABLE' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {property.status}
                            </span>
                            <ShimmerButton className="text-sm px-4 py-2">
                              View Details
                            </ShimmerButton>
                          </div>
                        </div>
                      </ShimmerCard>
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
