import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, memo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import propertiesData from '../data/properties.json';
import PropertyFilters from '../components/PropertyFilters';
import PropertyCard from '../components/PropertyCard';
import PropertyCardSkeleton from '../components/PropertyCardSkeleton';
import PageTransition from '../components/PageTransition';
import StaggerContainer from '../components/StaggerContainer';
import { useDebounce } from '../hooks/useDebounce';

const Properties = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300); // Debounce search for performance
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    state: 'All States',
    city: 'All Cities',
    budgetMin: 1000000,
    budgetMax: 100000000,
    propertyTypes: [],
    bedrooms: 'all',
    bathrooms: 'all',
    areaMin: '',
    areaMax: '',
  });

  // Filter and search properties
  const filteredProperties = useMemo(() => {
    let filtered = [...propertiesData];

    // Search filter (using debounced search query for performance)
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(property => {
        const locationStr = property.location?.city || property.location || '';
        const typeStr = property.features?.propertyType || property.type || '';
        return (
          property.title.toLowerCase().includes(query) ||
          locationStr.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query) ||
          typeStr.toLowerCase().includes(query)
        );
      });
    }

    // Budget filter
    filtered = filtered.filter(property => 
      property.price >= (filters.budgetMin || 0) && 
      property.price <= (filters.budgetMax || Infinity)
    );

    // Property types filter
    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      filtered = filtered.filter(property => {
        const propertyType = property.features?.propertyType || property.type;
        return filters.propertyTypes.includes(propertyType);
      });
    }

    // State filter
    if (filters.state && filters.state !== 'All States') {
      filtered = filtered.filter(property => {
        const state = property.location?.state;
        return state === filters.state;
      });
    }

    // City filter
    if (filters.city && filters.city !== 'All Cities') {
      filtered = filtered.filter(property => {
        const city = property.location?.city;
        return city === filters.city;
      });
    }

    // Bedrooms filter
    if (filters.bedrooms && filters.bedrooms !== 'all') {
      const beds = filters.bedrooms.replace('+', '');
      const bedsNum = parseInt(beds);
      filtered = filtered.filter(property => {
        const bedrooms = property.features?.bedrooms || property.bedrooms || 0;
        if (filters.bedrooms.includes('+')) {
          return bedrooms >= bedsNum;
        }
        return bedrooms === bedsNum;
      });
    }

    // Bathrooms filter
    if (filters.bathrooms && filters.bathrooms !== 'all') {
      const baths = filters.bathrooms.replace('+', '');
      const bathsNum = parseInt(baths);
      filtered = filtered.filter(property => {
        const bathrooms = property.features?.bathrooms || property.bathrooms || 0;
        if (filters.bathrooms.includes('+')) {
          return bathrooms >= bathsNum;
        }
        return bathrooms === bathsNum;
      });
    }

    // Area filter
    if (filters.areaMin) {
      filtered = filtered.filter(property => {
        const area = property.features?.area || property.area || 0;
        return area >= filters.areaMin;
      });
    }
    if (filters.areaMax) {
      filtered = filtered.filter(property => {
        const area = property.features?.area || property.area || 0;
        return area <= filters.areaMax;
      });
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'oldest':
        filtered.sort((a, b) => a.id - b.id);
        break;
      default:
        break;
    }

    return filtered;
  }, [debouncedSearchQuery, filters, sortBy]); // Use debounced search query

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleApplyFilters = () => {
    setShowFilters(false);
  };

  const handleResetFilters = () => {
    setFilters({
      state: 'All States',
      city: 'All Cities',
      budgetMin: 1000000,
      budgetMax: 100000000,
      propertyTypes: [],
      bedrooms: 'all',
      bathrooms: 'all',
      areaMin: '',
      areaMax: '',
    });
    setSearchQuery('');
  };

  const activeFilterCount = () => {
    let count = 0;
    if (filters.state && filters.state !== 'All States') count++;
    if (filters.city && filters.city !== 'All Cities') count++;
    if (filters.budgetMin !== 1000000 || filters.budgetMax !== 100000000) count++;
    if (filters.propertyTypes && filters.propertyTypes.length > 0) count++;
    if (filters.bedrooms && filters.bedrooms !== 'all') count++;
    if (filters.bathrooms && filters.bathrooms !== 'all') count++;
    if (filters.areaMin || filters.areaMax) count++;
    return count;
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-dark-bg to-dark-surface overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px] opacity-20" />
        </div>

        <div className="container-custom relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4 text-center"
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
              Discover Properties
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-gray-400 text-lg mb-8"
          >
            Find your perfect property from our exclusive collection
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by location, property name, or type..."
                  className="w-full pl-12 pr-4 py-4 bg-dark-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-white placeholder-gray-500"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full md:w-auto px-6 py-4 bg-dark-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-white appearance-none cursor-pointer pr-12"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Filter Toggle (Mobile) */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden relative px-6 py-4 bg-gradient-to-r from-primary to-secondary rounded-2xl text-white font-semibold flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
                {activeFilterCount() > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs">
                    {activeFilterCount()}
                  </span>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-dark-surface">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Advanced Filters Component */}
            <PropertyFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
            />

            {/* Property Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-400">
                  Found <span className="text-white font-semibold">{filteredProperties.length}</span> properties
                </p>
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white flex items-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFilterCount() > 0 && (
                    <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs">
                      {activeFilterCount()}
                    </span>
                  )}
                </button>
              </div>

              {filteredProperties.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 max-w-md mx-auto">
                    <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">No Properties Found</h3>
                    <p className="text-gray-400 mb-6">
                      Try adjusting your search or filters
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold"
                    >
                      Clear Filters
                    </button>
                  </div>
                </motion.div>
              ) : isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  <PropertyCardSkeleton count={6} />
                </div>
              ) : (
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-4" staggerDelay={0.05}>
                  {filteredProperties.map((property, index) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      index={index}
                    />
                  ))}
                </StaggerContainer>
              )}
            </div>
          </div>
        </div>
      </section>
      </div>
    </PageTransition>
  );
};

export default Properties;

