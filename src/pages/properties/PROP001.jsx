/**
 * Property Page: PROP001
 * Luxury Beachfront Villa in North Goa
 * 
 * This is a static route for better SEO and performance.
 * The PropertyTemplate component handles all the rendering logic.
 * 
 * HOW TO ADD NEW PROPERTY:
 * 1. Add property data to /src/data/properties.json with unique ID (e.g., "PROP011")
 * 2. Copy this file and rename it to match your property ID (e.g., PROP011.jsx)
 * 3. Update the propertyId prop below to match your new property ID
 * 4. Add a route in /src/App.jsx:
 *    import PROP011 from './pages/properties/PROP011';
 *    <Route path="/properties/PROP011" element={<PROP011 />} />
 * 5. Optional: Update the page title/meta tags for SEO
 */

import PropertyTemplate from './PropertyTemplate';

const PROP001 = () => {
  return <PropertyTemplate propertyId="PROP001" />;
};

export default PROP001;

