import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, X, SlidersHorizontal, Check } from 'lucide-react';
import { indianStates, citiesByState } from '../data/locations';

const PropertyFilters = ({ filters, onFilterChange, onApply, onReset, isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    location: true,
    budget: true,
    propertyType: true,
    bedrooms: true,
    bathrooms: true,
    area: true,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const propertyTypes = ['Apartment', 'Villa', 'Plot', 'Commercial'];
  const bedroomOptions = ['1', '2', '3', '4', '5+'];
  const bathroomOptions = ['1', '2', '3', '4+'];

  const handleCheckboxChange = (type, value) => {
    const currentTypes = filters.propertyTypes || [];
    const newTypes = currentTypes.includes(value)
      ? currentTypes.filter(t => t !== value)
      : [...currentTypes, value];
    onFilterChange('propertyTypes', newTypes);
  };

  const formatBudget = (value) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)} Cr`;
    }
    return `₹${(value / 100000).toFixed(0)} L`;
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

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left hover:bg-white/5 px-4 -mx-4 rounded-lg transition-colors"
      >
        <span className="font-semibold text-white">{title}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const filterContent = (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          Filters
          {activeFilterCount() > 0 && (
            <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs">
              {activeFilterCount()}
            </span>
          )}
        </h3>
        <button
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Location Section */}
        <FilterSection
          title="Location"
          isExpanded={expandedSections.location}
          onToggle={() => toggleSection('location')}
        >
          <div className="space-y-4">
            {/* State Dropdown */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">State</label>
              <select
                value={filters.state || 'All States'}
                onChange={(e) => {
                  onFilterChange('state', e.target.value);
                  onFilterChange('city', 'All Cities');
                }}
                className="w-full px-4 py-3 bg-dark-bg/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-all text-white"
              >
                {indianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
            {filters.state && filters.state !== 'All States' && citiesByState[filters.state]?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <label className="block text-sm text-gray-300 mb-2">City</label>
                <select
                  value={filters.city || 'All Cities'}
                  onChange={(e) => onFilterChange('city', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-all text-white"
                >
                  <option value="All Cities">All Cities</option>
                  {citiesByState[filters.state].map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </motion.div>
            )}
          </div>
        </FilterSection>

        {/* Budget Section */}
        <FilterSection
          title="Budget"
          isExpanded={expandedSections.budget}
          onToggle={() => toggleSection('budget')}
        >
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-300">
              <span>{formatBudget(filters.budgetMin || 1000000)}</span>
              <span>{formatBudget(filters.budgetMax || 100000000)}</span>
            </div>
            
            {/* Min Budget Slider */}
            <div>
              <label className="block text-xs text-gray-400 mb-2">Minimum Budget</label>
              <input
                type="range"
                min="1000000"
                max="100000000"
                step="1000000"
                value={filters.budgetMin || 1000000}
                onChange={(e) => onFilterChange('budgetMin', parseInt(e.target.value))}
                className="w-full h-2 bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Max Budget Slider */}
            <div>
              <label className="block text-xs text-gray-400 mb-2">Maximum Budget</label>
              <input
                type="range"
                min="1000000"
                max="100000000"
                step="1000000"
                value={filters.budgetMax || 100000000}
                onChange={(e) => onFilterChange('budgetMax', parseInt(e.target.value))}
                className="w-full h-2 bg-dark-bg rounded-lg appearance-none cursor-pointer accent-secondary"
              />
            </div>

            <div className="flex gap-2 text-xs text-gray-400">
              <span>₹10L</span>
              <span className="flex-1 text-center">₹5.5Cr</span>
              <span>₹10Cr</span>
            </div>
          </div>
        </FilterSection>

        {/* Property Type Section */}
        <FilterSection
          title="Property Type"
          isExpanded={expandedSections.propertyType}
          onToggle={() => toggleSection('propertyType')}
        >
          <div className="space-y-3">
            {propertyTypes.map(type => (
              <label
                key={type}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={(filters.propertyTypes || []).includes(type)}
                    onChange={() => handleCheckboxChange('propertyTypes', type)}
                    className="w-5 h-5 appearance-none border-2 border-white/20 rounded checked:bg-gradient-to-r checked:from-primary checked:to-secondary checked:border-primary transition-all cursor-pointer"
                  />
                  {(filters.propertyTypes || []).includes(type) && (
                    <Check className="w-4 h-4 text-white absolute top-0.5 left-0.5 pointer-events-none" />
                  )}
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Bedrooms Section */}
        <FilterSection
          title="Bedrooms"
          isExpanded={expandedSections.bedrooms}
          onToggle={() => toggleSection('bedrooms')}
        >
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onFilterChange('bedrooms', 'all')}
              className={`py-3 px-2 rounded-xl font-semibold transition-all text-sm ${
                (filters.bedrooms || 'all') === 'all'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-dark-bg/50 text-gray-400 hover:bg-white/5 border border-white/10'
              }`}
            >
              Any
            </button>
            {bedroomOptions.map(bedroom => (
              <button
                key={bedroom}
                onClick={() => onFilterChange('bedrooms', bedroom)}
                className={`py-3 px-2 rounded-xl font-semibold transition-all text-sm ${
                  filters.bedrooms === bedroom
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-dark-bg/50 text-gray-400 hover:bg-white/5 border border-white/10'
                }`}
              >
                {bedroom} BHK
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Bathrooms Section */}
        <FilterSection
          title="Bathrooms"
          isExpanded={expandedSections.bathrooms}
          onToggle={() => toggleSection('bathrooms')}
        >
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onFilterChange('bathrooms', 'all')}
              className={`py-3 px-2 rounded-xl font-semibold transition-all text-sm ${
                (filters.bathrooms || 'all') === 'all'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-dark-bg/50 text-gray-400 hover:bg-white/5 border border-white/10'
              }`}
            >
              Any
            </button>
            {bathroomOptions.map(bathroom => (
              <button
                key={bathroom}
                onClick={() => onFilterChange('bathrooms', bathroom)}
                className={`py-3 px-2 rounded-xl font-semibold transition-all text-sm ${
                  filters.bathrooms === bathroom
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-dark-bg/50 text-gray-400 hover:bg-white/5 border border-white/10'
                }`}
              >
                {bathroom}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Area Section */}
        <FilterSection
          title="Area (sq ft)"
          isExpanded={expandedSections.area}
          onToggle={() => toggleSection('area')}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">Min Area</label>
              <input
                type="number"
                placeholder="Min"
                value={filters.areaMin || ''}
                onChange={(e) => onFilterChange('areaMin', e.target.value ? parseInt(e.target.value) : '')}
                className="w-full px-4 py-3 bg-dark-bg/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-all text-white placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Max Area</label>
              <input
                type="number"
                placeholder="Max"
                value={filters.areaMax || ''}
                onChange={(e) => onFilterChange('areaMax', e.target.value ? parseInt(e.target.value) : '')}
                className="w-full px-4 py-3 bg-dark-bg/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-all text-white placeholder-gray-500"
              />
            </div>
          </div>
        </FilterSection>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 space-y-3 sticky bottom-0 bg-dark-surface pt-4 -mx-6 px-6 pb-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onApply}
          className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold shadow-lg hover:shadow-primary/50 transition-all"
        >
          Apply Filters
        </motion.button>
        <button
          onClick={onReset}
          className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-semibold transition-all"
        >
          Reset Filters
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:w-80 flex-shrink-0">
        <div className="sticky top-24 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 max-h-[calc(100vh-120px)] overflow-y-auto">
          {filterContent}
        </div>
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-0 bottom-0 w-80 bg-dark-surface p-6 overflow-y-auto"
            >
              {filterContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PropertyFilters;

