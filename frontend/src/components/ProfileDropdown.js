import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, ChevronDown, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

const ProfileDropdown = () => {
  const { user, logout, isAuthenticated, googleLogin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState(null);
  const dropdownRef = useRef(null);
  const googleButtonRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Load Google Identity Services script and initialize when dropdown opens
  useEffect(() => {
    if (!isAuthenticated && isOpen) {
      // Check if script is already loaded
      if (!window.google) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          // Small delay to ensure DOM is ready
          setTimeout(initializeGoogleSignIn, 100);
        };
        document.head.appendChild(script);
      } else {
        // Script already loaded, initialize immediately
        setTimeout(initializeGoogleSignIn, 100);
      }
    }

    // Cleanup when dropdown closes
    return () => {
      if (googleButtonRef.current && googleButtonRef.current.innerHTML) {
        googleButtonRef.current.innerHTML = '';
      }
    };
  }, [isAuthenticated, isOpen]);

  const initializeGoogleSignIn = () => {
    if (window.google && googleButtonRef.current && !isAuthenticated && isOpen) {
      const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id';
      
      console.log('Initializing Google Sign-In with client ID:', clientId);
      
      if (clientId === 'your-google-client-id') {
        setGoogleError('Google Client ID not configured');
        return;
      }

      try {
        // Clear any existing button first
        if (googleButtonRef.current) {
          googleButtonRef.current.innerHTML = '';
        }

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleSignIn,
          auto_select: false,
          cancel_on_tap_outside: true,
          // Force redirect flow to avoid COOP issues
          use_fedcm_for_prompt: false,
          ux_mode: 'redirect' // Use redirect instead of popup
        });

        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          {
            theme: 'outline',
            size: 'large',
            width: 200,
            text: 'signin_with',
            shape: 'rectangular',
            logo_alignment: 'left',
            // Force redirect flow
            type: 'standard'
          }
        );
        
        console.log('Google Sign-In button rendered successfully with redirect flow');
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
        setGoogleError('Failed to initialize Google Sign-In');
      }
    }
  };

  const handleGoogleSignIn = async (response) => {
    try {
      setIsGoogleLoading(true);
      setGoogleError(null);

      await googleLogin(response.credential);
      setIsOpen(false);
    } catch (error) {
      setGoogleError(error.message || 'Sign-in failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="relative" ref={dropdownRef}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 group"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
          >
            <User className="w-4 h-4 text-white" />
          </motion.div>
          <span>Sign In</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-3 h-3" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-72 glass-effect rounded-xl shadow-lg z-50 border border-white/10"
            >
              <div className="p-6">
                <div className="text-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3"
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-1">Welcome to Prime Properties</h3>
                  <p className="text-white/60 text-sm">Sign in to access exclusive features</p>
                </div>
                
                {googleError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                  >
                    <p className="text-red-300 text-xs">{googleError}</p>
                  </motion.div>
                )}

                <div className="flex justify-center mb-4">
                  <div ref={googleButtonRef}></div>
                </div>

                {/* Fallback button if Google Sign-In doesn't load */}
                {!window.google && (
                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setGoogleError('Google Sign-In is loading. Please try again in a moment.')}
                      className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
                    >
                      Sign In with Google
                    </motion.button>
                    <p className="text-xs text-white/50 mt-2">
                      Loading Google Sign-In...
                    </p>
                  </div>
                )}

                {isGoogleLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-center text-sm text-white/70"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      <span>Signing in...</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 group"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
        >
          <User className="w-4 h-4 text-white" />
        </motion.div>
        <span className="hidden sm:block">{user?.name || user?.username}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-3 h-3" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 glass-effect rounded-xl shadow-lg z-50 border border-white/10"
          >
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                >
                  <User className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{user?.name || user?.username}</h3>
                  <p className="text-xs text-white/60">{user?.email}</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="text-xs text-white/60 mb-3 space-y-1">
                  <div className="flex justify-between">
                    <span>Role:</span>
                    <span className="font-medium text-white">{user?.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-medium text-green-400">✓ Active</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300 border border-red-500/20 hover:border-red-500/40"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
