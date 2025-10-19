import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2, Loader } from 'lucide-react';

const ImageGallery = ({ images = [], title = 'Property' }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [loadingImages, setLoadingImages] = useState({});

  // Handle image load
  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
    setLoadingImages(prev => ({ ...prev, [index]: false }));
  };

  const handleImageLoadStart = (index) => {
    setLoadingImages(prev => ({ ...prev, [index]: true }));
  };

  // Navigate to previous image
  const goToPrevious = (e) => {
    e?.stopPropagation();
    if (isLightboxOpen) {
      setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else {
      setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  // Navigate to next image
  const goToNext = (e) => {
    e?.stopPropagation();
    if (isLightboxOpen) {
      setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else {
      setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  // Open lightbox
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Keyboard navigation
  const handleKeyPress = (e) => {
    if (!isLightboxOpen) return;
    
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') closeLightbox();
  };

  // Attach keyboard listener
  useState(() => {
    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isLightboxOpen]);

  if (!images || images.length === 0) {
    return (
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        <div className="h-96 md:h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Maximize2 className="w-12 h-12 text-white" />
            </div>
            <p className="text-gray-400">No images available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        {/* Main Image Display */}
        <div className="relative h-96 md:h-[500px] overflow-hidden bg-dark-surface group">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full cursor-zoom-in"
              onClick={() => openLightbox(selectedImage)}
            >
              {/* Loading Spinner */}
              {loadingImages[selectedImage] && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-surface z-10">
                  <Loader className="w-12 h-12 text-primary animate-spin" />
                </div>
              )}

              <img
                src={images[selectedImage]}
                alt={`${title} - Image ${selectedImage + 1}`}
                className="w-full h-full object-cover"
                onLoadStart={() => handleImageLoadStart(selectedImage)}
                onLoad={() => handleImageLoad(selectedImage)}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&size=1200&background=6366f1&color=fff`;
                }}
              />

              {/* Zoom Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-4 left-4 px-4 py-2 rounded-full bg-dark-surface/80 backdrop-blur-sm border border-white/20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Maximize2 className="w-4 h-4 text-white" />
                <span className="text-sm text-white">Click to view fullscreen</span>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows (Desktop) */}
          {images.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToPrevious}
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-surface/80 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-primary transition-colors opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToNext}
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-surface/80 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-primary transition-colors opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-dark-surface/80 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold">
            {selectedImage + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Grid */}
        {images.length > 1 && (
          <div className="p-4 bg-dark-surface/50">
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-primary shadow-lg shadow-primary/50'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  {/* Loading State for Thumbnail */}
                  {loadingImages[index] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-dark-surface">
                      <Loader className="w-4 h-4 text-primary animate-spin" />
                    </div>
                  )}

                  <img
                    src={image}
                    alt={`${title} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Selected Indicator */}
                  {selectedImage === index && (
                    <motion.div
                      layoutId="selected-indicator"
                      className="absolute inset-0 bg-primary/20 flex items-center justify-center"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <ChevronRight className="w-5 h-5 text-white rotate-90" />
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Image Counter */}
            <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold z-10">
              {lightboxIndex + 1} / {images.length}
            </div>

            {/* Main Lightbox Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-7xl max-h-[90vh] w-full mx-4"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  src={images[lightboxIndex]}
                  alt={`${title} - Image ${lightboxIndex + 1}`}
                  className="w-full h-full object-contain rounded-2xl"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&size=1200&background=6366f1&color=fff`;
                  }}
                />
              </AnimatePresence>

              {/* Navigation Arrows in Lightbox */}
              {images.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="w-7 h-7" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="w-7 h-7" />
                  </motion.button>
                </>
              )}
            </motion.div>

            {/* Thumbnail Strip in Lightbox */}
            {images.length > 1 && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-4xl w-full px-4"
              >
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setLightboxIndex(index)}
                      className={`relative h-16 w-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        lightboxIndex === index
                          ? 'border-primary shadow-lg shadow-primary/50'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Help Text */}
            <div className="absolute bottom-6 right-6 text-white/60 text-sm hidden md:block">
              Use arrow keys to navigate • ESC to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;

