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
    <div className="border-b border-primary/10 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left hover:bg-primary/5 px-4 -mx-4 rounded-lg transition-all duration-300 group"
      >
        <span className="font-semibold text-primary group-hover:text-gold-300 transition-colors">{title}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
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
        <h3 className="text-xl font-bold text-primary flex items-center gap-2 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          Filters
          {activeFilterCount() > 0 && (
            <span className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-xs font-bold text-black shadow-gold-sm animate-luxury-glow">
              {activeFilterCount()}
            </span>
          )}
        </h3>
        <button
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-primary/10 rounded-lg transition-all duration-300 group"
        >
          <X className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
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
              <label className="block text-sm text-primary/80 mb-2 font-medium">State</label>
              <select
                value={filters.state || 'All States'}
                onChange={(e) => {
                  onFilterChange('state', e.target.value);
                  onFilterChange('city', 'All Cities');
                }}
                className="select-gold w-full px-4 py-3 bg-black/40 border border-primary/20 rounded-xl focus:outline-none focus:border-primary focus:shadow-gold-sm transition-all text-white appearance-none cursor-pointer hover:border-primary/40"
              >
                {indianStates.map(state => (
                  <option key={state} value={state} className="bg-dark-surface">{state}</option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
            {filters.state && filters.state !== 'All States' && citiesByState[filters.state]?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <label className="block text-sm text-primary/80 mb-2 font-medium">City</label>
                <select
                  value={filters.city || 'All Cities'}
                  onChange={(e) => onFilterChange('city', e.target.value)}
                  className="select-gold w-full px-4 py-3 bg-black/40 border border-primary/20 rounded-xl focus:outline-none focus:border-primary focus:shadow-gold-sm transition-all text-white appearance-none cursor-pointer hover:border-primary/40"
                >
                  <option value="All Cities" className="bg-dark-surface">All Cities</option>
                  {citiesByState[filters.state].map(city => (
                    <option key={city} value={city} className="bg-dark-surface">{city}</option>
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
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-primary drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">{formatBudget(filters.budgetMin || 1000000)}</span>
              <span className="text-primary drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">{formatBudget(filters.budgetMax || 100000000)}</span>
            </div>
            
            {/* Min Budget Slider */}
            <div>
              <label className="block text-xs text-primary/70 mb-2 font-medium">Minimum Budget</label>
              <input
                type="range"
                min="1000000"
                max="100000000"
                step="1000000"
                value={filters.budgetMin || 1000000}
                onChange={(e) => onFilterChange('budgetMin', parseInt(e.target.value))}
                className="slider-gold"
              />
            </div>

            {/* Max Budget Slider */}
            <div>
              <label className="block text-xs text-primary/70 mb-2 font-medium">Maximum Budget</label>
              <input
                type="range"
                min="1000000"
                max="100000000"
                step="1000000"
                value={filters.budgetMax || 100000000}
                onChange={(e) => onFilterChange('budgetMax', parseInt(e.target.value))}
                className="slider-gold"
              />
            </div>

            <div className="flex gap-2 text-xs text-primary/50 font-medium">
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
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 cursor-pointer transition-all duration-300 group border border-transparent hover:border-primary/20"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={(filters.propertyTypes || []).includes(type)}
                    onChange={() => handleCheckboxChange('propertyTypes', type)}
                    className="w-5 h-5 appearance-none border-2 border-primary/30 rounded checked:bg-gradient-to-br checked:from-primary checked:to-secondary checked:border-primary transition-all cursor-pointer shadow-none checked:shadow-gold-sm"
                  />
                  {(filters.propertyTypes || []).includes(type) && (
                    <Check className="w-4 h-4 text-black absolute top-0.5 left-0.5 pointer-events-none font-bold drop-shadow-lg" />
                  )}
                </div>
                <span className="text-gray-300 group-hover:text-primary transition-colors font-medium">
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
              className={`py-3 px-2 rounded-xl font-bold transition-all text-sm ${
                (filters.bedrooms || 'all') === 'all'
                  ? 'bg-gradient-to-r from-primary to-secondary text-black shadow-gold-md'
                  : 'bg-black/30 text-gray-400 hover:bg-primary/10 hover:text-primary border border-primary/20 hover:border-primary/40'
              }`}
            >
              Any
            </button>
            {bedroomOptions.map(bedroom => (
              <button
                key={bedroom}
                onClick={() => onFilterChange('bedrooms', bedroom)}
                className={`py-3 px-2 rounded-xl font-bold transition-all text-sm ${
                  filters.bedrooms === bedroom
                    ? 'bg-gradient-to-r from-primary to-secondary text-black shadow-gold-md'
                    : 'bg-black/30 text-gray-400 hover:bg-primary/10 hover:text-primary border border-primary/20 hover:border-primary/40'
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
              className={`py-3 px-2 rounded-xl font-bold transition-all text-sm ${
                (filters.bathrooms || 'all') === 'all'
                  ? 'bg-gradient-to-r from-primary to-secondary text-black shadow-gold-md'
                  : 'bg-black/30 text-gray-400 hover:bg-primary/10 hover:text-primary border border-primary/20 hover:border-primary/40'
              }`}
            >
              Any
            </button>
            {bathroomOptions.map(bathroom => (
              <button
                key={bathroom}
                onClick={() => onFilterChange('bathrooms', bathroom)}
                className={`py-3 px-2 rounded-xl font-bold transition-all text-sm ${
                  filters.bathrooms === bathroom
                    ? 'bg-gradient-to-r from-primary to-secondary text-black shadow-gold-md'
                    : 'bg-black/30 text-gray-400 hover:bg-primary/10 hover:text-primary border border-primary/20 hover:border-primary/40'
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
              <label className="block text-xs text-primary/70 mb-2 font-medium">Min Area</label>
              <input
                type="number"
                placeholder="Min"
                value={filters.areaMin || ''}
                onChange={(e) => onFilterChange('areaMin', e.target.value ? parseInt(e.target.value) : '')}
                className="w-full px-4 py-3 bg-black/40 border border-primary/20 rounded-xl focus:outline-none focus:border-primary focus:shadow-gold-sm transition-all text-white placeholder-gray-600 hover:border-primary/40"
              />
            </div>
            <div>
              <label className="block text-xs text-primary/70 mb-2 font-medium">Max Area</label>
              <input
                type="number"
                placeholder="Max"
                value={filters.areaMax || ''}
                onChange={(e) => onFilterChange('areaMax', e.target.value ? parseInt(e.target.value) : '')}
                className="w-full px-4 py-3 bg-black/40 border border-primary/20 rounded-xl focus:outline-none focus:border-primary focus:shadow-gold-sm transition-all text-white placeholder-gray-600 hover:border-primary/40"
              />
            </div>
          </div>
        </FilterSection>
      </div>

      {/* Action Buttons - Fixed at Bottom */}
      <div className="mt-8 pt-6 border-t border-primary/20">
        <div className="space-y-3">
          <motion.button
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 30px rgba(212, 175, 55, 0.6)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onApply}
            className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-black font-bold shadow-gold-md hover:shadow-gold-lg transition-all duration-300"
          >
            Apply Filters
          </motion.button>
          <button
            onClick={onReset}
            className="w-full py-4 bg-black/30 hover:bg-primary/10 border-2 border-primary/30 hover:border-primary/50 rounded-xl text-primary font-bold transition-all duration-300"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:w-80 flex-shrink-0">
        <div className="sticky top-24 backdrop-blur-xl bg-black/60 border border-primary/20 rounded-3xl shadow-gold-md flex flex-col max-h-[calc(100vh-120px)]">
          <div className="p-6 overflow-y-auto scrollbar-gold flex-1">
            {filterContent}
          </div>
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
              className="absolute left-0 top-0 bottom-0 w-80 bg-black/95 backdrop-blur-xl border-r border-primary/20 shadow-gold-lg flex flex-col"
            >
              <div className="p-6 overflow-y-auto scrollbar-gold flex-1">
                {filterContent}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PropertyFilters;

