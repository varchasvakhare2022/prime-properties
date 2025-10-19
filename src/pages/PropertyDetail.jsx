/**
 * PropertyDetail.jsx - DEPRECATED
 * 
 * This file is maintained for backward compatibility.
 * For new properties, use the scalable structure in /src/pages/properties/
 * 
 * NEW STRUCTURE:
 * - /src/pages/properties/PropertyTemplate.jsx (main template)
 * - /src/pages/properties/PROP001.jsx (individual property pages)
 * 
 * This component now simply wraps PropertyTemplate for compatibility.
 * 
 * HOW TO ADD NEW PROPERTY:
 * 1. Add property data to /src/data/properties.json
 * 2. Create /src/pages/properties/PROP0XX.jsx (copy from PROP001.jsx)
 * 3. Update propertyId in the new file
 * 4. Add route to /src/App.jsx
 * 
 * See /src/pages/properties/README.md for detailed documentation.
 */

import PropertyTemplate from './properties/PropertyTemplate';

const PropertyDetail = () => {
  // Simply render the PropertyTemplate component
  // It will handle getting the ID from URL params
  return <PropertyTemplate />;
};

export default PropertyDetail;
