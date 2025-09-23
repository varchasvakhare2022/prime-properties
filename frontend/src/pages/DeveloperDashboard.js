import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, LogOut, Plus, Edit, Trash2, CheckCircle, Search, Filter, MapPin, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ShimmerButton, ShimmerCard } from '../components/ui/shimmer';
import { GradientText } from '../components/ui/gradient';
import propertyService from '../services/propertyService';
import AddPropertyModal from '../components/AddPropertyModal';
import EditPropertyModal from '../components/EditPropertyModal';

const DeveloperDashboard = () => {
  const { user, logout } = useAuth();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [properties, searchTerm, locationFilter, priceRange]);

  const fetchMyProperties = async () => {
    try {
      const data = await propertyService.getMyProperties();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Failed to fetch properties');
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

  const handleAddProperty = async (propertyData) => {
    try {
      await propertyService.createProperty(propertyData);
      await fetchMyProperties();
      setError('');
    } catch (error) {
      throw error;
    }
  };

  const handleEditProperty = async (id, propertyData) => {
    try {
      await propertyService.updateProperty(id, propertyData);
      await fetchMyProperties();
      setError('');
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return;
    }

    try {
      await propertyService.deleteProperty(propertyId);
      await fetchMyProperties();
      setError('');
    } catch (error) {
      setError(error.message || 'Failed to delete property');
    }
  };

  const handleMarkAsSold = async (propertyId) => {
    try {
      await propertyService.markPropertyAsSold(propertyId);
      await fetchMyProperties();
      setError('');
    } catch (error) {
      setError(error.message || 'Failed to mark property as sold');
    }
  };

  const openEditModal = (property) => {
    setSelectedProperty(property);
    setShowEditModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedProperty(null);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Building2 className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">Prime Properties</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-medium">{user?.name}</p>
                <p className="text-sm text-gray-300">Developer</p>
              </div>
              <ShimmerButton onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </ShimmerButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Welcome back, <GradientText>{user?.name}</GradientText>!
              </h2>
              <p className="text-xl text-gray-300">
                Manage your property listings and track your portfolio
              </p>
            </div>
            <ShimmerButton onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </ShimmerButton>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ShimmerCard>
              <div className="p-6 text-center">
                <Building2 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-white">{properties.length}</h3>
                <p className="text-gray-400">Total Properties</p>
              </div>
            </ShimmerCard>
            <ShimmerCard>
              <div className="p-6 text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-white">
                  {properties.filter(p => p.status === 'AVAILABLE').length}
                </h3>
                <p className="text-gray-400">Available</p>
              </div>
            </ShimmerCard>
            <ShimmerCard>
              <div className="p-6 text-center">
                <Home className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-white">
                  {properties.filter(p => p.status === 'SOLD').length}
                </h3>
                <p className="text-gray-400">Sold</p>
              </div>
            </ShimmerCard>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <ShimmerCard className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search your properties..."
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                className="mt-6 pt-6 border-t border-white/20"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Location Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter location..."
                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Min Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Min Price
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        placeholder="Min price..."
                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Max Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Max Price
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        placeholder="Max price..."
                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
            )}
          </ShimmerCard>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
          >
            {error}
          </motion.div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-300">
            Showing {filteredProperties.length} of {properties.length} properties
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <ShimmerCard key={index} className="h-80" />
            ))
          ) : (
            filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ShimmerCard className="h-full hover:scale-105 transition-transform duration-300">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-white line-clamp-2">
                        {property.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        property.status === 'AVAILABLE' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {property.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {property.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin className="w-4 h-4 mr-2" />
                        {property.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Building2 className="w-4 h-4 mr-2" />
                        {property.propertyType}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Home className="w-4 h-4 mr-2" />
                        {property.bedrooms} bed • {property.bathrooms} bath • {property.area} sq ft
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-white">
                        ${property.price?.toLocaleString()}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openEditModal(property)}
                        className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                      >
                        <Edit className="w-4 h-4 mr-1 inline" />
                        Edit
                      </button>
                      {property.status === 'AVAILABLE' && (
                        <button 
                          onClick={() => handleMarkAsSold(property.id)}
                          className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                        >
                          <CheckCircle className="w-4 h-4 mr-1 inline" />
                          Mark Sold
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteProperty(property.id)}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </ShimmerCard>
              </motion.div>
            ))
          )}
        </div>

        {!loading && filteredProperties.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Properties Found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search criteria or add your first property!</p>
            <div className="space-x-4">
              <ShimmerButton onClick={clearFilters}>
                Clear Filters
              </ShimmerButton>
              <ShimmerButton onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </ShimmerButton>
            </div>
          </motion.div>
        )}
      </main>

      {/* Modals */}
      <AddPropertyModal
        isOpen={showAddModal}
        onClose={closeModals}
        onSubmit={handleAddProperty}
      />

      <EditPropertyModal
        isOpen={showEditModal}
        onClose={closeModals}
        onSubmit={handleEditProperty}
        property={selectedProperty}
      />
    </div>
  );
};

export default DeveloperDashboard;