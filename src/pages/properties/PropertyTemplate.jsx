/**
 * Property Template Component
 * 
 * This component renders the full property detail page for any property.
 * It can be used in two ways:
 * 
 * 1. Dynamic Route (SEO-friendly for dynamic content):
 *    - Route: /properties/:id
 *    - Gets property ID from URL params
 * 
 * 2. Static Route (Best for SEO, better performance):
 *    - Create individual files like PROP001.jsx, PROP002.jsx
 *    - Pass propertyId as prop
 *    - Pre-render routes for each property
 * 
 * HOW TO ADD NEW PROPERTY:
 * 1. Add property data to /src/data/properties.json with unique ID
 * 2. (Optional but recommended) Create new file: /src/pages/properties/[PROPERTY_ID].jsx
 * 3. Copy the template from PROP001.jsx
 * 4. Update the propertyId prop with your new property ID
 * 5. Add route to App.jsx (if using static route)
 * 
 * Example:
 * <PropertyTemplate propertyId="PROP001" />
 */

import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, Bed, Bath, Maximize, Calendar, Tag, ArrowLeft, 
  Home, Check, Phone, Mail, Share2, MessageCircle 
} from 'lucide-react';
import propertiesData from '../../data/properties.json';
import { formatPriceINR } from '../../utils/formatPrice';
import ImageGallery from '../../components/ImageGallery';
import PageTransition from '../../components/PageTransition';
import ScrollReveal from '../../components/ScrollReveal';

const PropertyTemplate = ({ propertyId = null }) => {
  const { id: urlId } = useParams();
  const navigate = useNavigate();
  
  // Use prop propertyId if provided (static route), otherwise use URL param (dynamic route)
  const propertyIdToUse = propertyId || urlId;
  
  // Find property by ID (works with both string and number IDs)
  const property = propertiesData.find(p => p.id.toString() === propertyIdToUse || p.id === propertyIdToUse);

  // Get property data with fallbacks for both old and new structure
  const getPropertyData = () => {
    if (!property) return null;

    return {
      id: property.id,
      title: property.title,
      description: property.description,
      price: property.price,
      location: {
        city: property.location?.city || '',
        state: property.location?.state || '',
        address: property.location?.address || property.location || ''
      },
      bedrooms: property.features?.bedrooms || property.bedrooms || 0,
      bathrooms: property.features?.bathrooms || property.bathrooms || 0,
      area: property.features?.area || property.area || 0,
      propertyType: property.features?.propertyType || property.type || '',
      images: property.images || (property.image ? [property.image] : []),
      amenities: property.amenities || property.features || [],
      postedDate: property.postedDate || '',
      featured: property.featured || false
    };
  };

  const propertyData = getPropertyData();

  // 404 Page
  if (!propertyData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Home className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Property Not Found
            </h1>
            <p className="text-gray-400 mb-8">
              Sorry, we couldn't find the property you're looking for.
            </p>
            <Link to="/properties">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Properties
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently Posted';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Generate WhatsApp enquiry URL
  const getWhatsAppURL = () => {
    // TODO: Replace with actual WhatsApp business number
    const phoneNumber = '919876543210'; // Replace with your business WhatsApp number (with country code, no + or spaces)
    
    const message = `I am interested in buying the property
Property ID - ${propertyData.id}
Property Name - ${propertyData.title}
Location - ${propertyData.location.city}, ${propertyData.location.state}
Price - ${formatPriceINR(propertyData.price)}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-dark-bg">
      {/* Back Button */}
      <div className="bg-dark-surface border-b border-white/10">
        <div className="container-custom py-6">
          <button
            onClick={() => navigate('/properties')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Properties</span>
          </button>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 px-4">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery Component */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ImageGallery 
                images={propertyData.images} 
                title={propertyData.title}
              />
              
              {/* Badges Overlay */}
              <div className="relative -mt-[500px] md:-mt-[500px] pointer-events-none z-10">
                <div className="h-96 md:h-[500px] relative">
                  {/* Featured Badge */}
                  {propertyData.featured && (
                    <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-yellow-500 text-black font-bold text-sm shadow-lg pointer-events-auto">
                      ⭐ Featured
                    </div>
                  )}

                  {/* Property Type Badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm shadow-lg pointer-events-auto">
                    {propertyData.propertyType}
                  </div>

                  {/* Share Button */}
                  <button className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-dark-surface/80 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors pointer-events-auto">
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Property Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8"
            >
              {/* Title and Price */}
              <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
                  {propertyData.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-lg">
                      {propertyData.location.city && propertyData.location.state
                        ? `${propertyData.location.city}, ${propertyData.location.state}`
                        : propertyData.location.address}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {formatPriceINR(propertyData.price)}
                  </div>
                  
                  {propertyData.postedDate && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-5 h-5" />
                      <span>Posted: {formatDate(propertyData.postedDate)}</span>
                    </div>
                  )}
                </div>
              </div>

                {/* Key Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
                {propertyData.bedrooms > 0 && (
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                    <Bed className="w-8 h-8 text-primary mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{propertyData.bedrooms}</div>
                    <div className="text-sm text-gray-400">Bedrooms</div>
                  </div>
                )}
                
                {propertyData.bathrooms > 0 && (
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
                    <Bath className="w-8 h-8 text-secondary mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{propertyData.bathrooms}</div>
                    <div className="text-sm text-gray-400">Bathrooms</div>
                  </div>
                )}
                
                {propertyData.area > 0 && (
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                    <Maximize className="w-8 h-8 text-primary mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{propertyData.area.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Sq Ft</div>
                  </div>
                )}
                
                <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
                  <Home className="w-8 h-8 text-secondary mb-3" />
                  <div className="text-xl font-bold text-white mb-1">{propertyData.propertyType}</div>
                  <div className="text-sm text-gray-400">Property Type</div>
                </div>
              </div>

              {/* Property ID */}
              <div className="flex items-center gap-2 mb-8 p-4 rounded-xl bg-dark-surface/50 border border-white/10">
                <Tag className="w-5 h-5 text-primary" />
                <span className="text-gray-400">Property ID:</span>
                <span className="font-mono text-white font-semibold">{propertyData.id}</span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-white">Description</h2>
                <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                  {propertyData.description}
                </p>
              </div>

              {/* Full Address */}
              {propertyData.location.address && (
                <div className="p-6 rounded-2xl bg-dark-surface/50 border border-white/10">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-white">
                    <MapPin className="w-5 h-5 text-primary" />
                    Location
                  </h3>
                  <p className="text-gray-300">{propertyData.location.address}</p>
                </div>
              )}
            </motion.div>

            {/* Amenities */}
            {propertyData.amenities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8"
              >
                <h2 className="text-3xl font-bold mb-6 text-white">Amenities & Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {propertyData.amenities.map((amenity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-dark-surface/50 border border-white/10 hover:border-primary/30 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {amenity}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar - Contact Form */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-24"
            >
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-white">Interested in this Property?</h3>
                
                <form className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-dark-bg/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors text-white placeholder-gray-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-dark-bg/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors text-white placeholder-gray-500"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    className="w-full px-4 py-3 bg-dark-bg/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors text-white placeholder-gray-500"
                  />
                  <textarea
                    placeholder="Message"
                    rows="4"
                    className="w-full px-4 py-3 bg-dark-bg/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors text-white placeholder-gray-500 resize-none"
                    defaultValue={`I'm interested in ${propertyData.title}`}
                  ></textarea>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold shadow-lg hover:shadow-primary/50 transition-all"
                  >
                    Request Information
                  </motion.button>
                </form>

                <div className="space-y-3 pt-6 border-t border-white/10">
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-semibold transition-all"
                    >
                      Schedule a Viewing
                    </motion.button>
                  </Link>

                  <div className="flex gap-3">
                    <a
                      href="tel:+15551234567"
                      className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-white hover:text-primary transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      <span className="text-sm font-semibold">Call</span>
                    </a>
                    <a
                      href="mailto:info@primeproperties.com"
                      className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-white hover:text-primary transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span className="text-sm font-semibold">Email</span>
                    </a>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                  <p className="text-sm text-gray-300 text-center">
                    💼 Schedule a property tour with our expert agents
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* WhatsApp Enquiry Section - Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="hidden md:block mt-12"
        >
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3 text-white">
              Interested in this Property?
            </h3>
            <p className="text-gray-400 mb-6">
              Send us an enquiry via WhatsApp and our team will respond within 24 hours
            </p>
            
            <a
              href={getWhatsAppURL()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold inline-flex items-center gap-3 shadow-lg hover:shadow-primary/50 transition-all overflow-hidden group"
              >
                {/* Pulse Animation */}
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 animate-pulse"></span>
                
                {/* WhatsApp Icon */}
                <MessageCircle className="w-6 h-6" />
                
                <span className="text-lg">Send Enquiry on WhatsApp</span>
              </motion.button>
            </a>

            <p className="text-gray-500 text-sm mt-4">
              ⏱️ Our team will respond within 24 hours
            </p>
          </div>
        </motion.div>
      </div>

      {/* WhatsApp Enquiry Button - Mobile (Sticky) */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-dark-bg/95 backdrop-blur-xl border-t border-white/10"
      >
        <a
          href={getWhatsAppURL()}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="relative w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold flex items-center justify-center gap-3 shadow-lg overflow-hidden"
          >
            {/* Pulse Animation */}
            <span className="absolute inset-0 bg-white opacity-20 animate-pulse"></span>
            
            {/* WhatsApp Icon */}
            <MessageCircle className="w-6 h-6 animate-bounce" />
            
            <div className="text-left flex-1">
              <div className="text-lg font-bold">Send WhatsApp Enquiry</div>
              <div className="text-xs text-white/80">Get response within 24 hours</div>
            </div>
          </motion.button>
        </a>
      </motion.div>

      {/* Add padding at bottom for mobile to prevent content from being hidden behind sticky button */}
      <div className="md:hidden h-24"></div>
      </div>
    </PageTransition>
  );
};

export default PropertyTemplate;

