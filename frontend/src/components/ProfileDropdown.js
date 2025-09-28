import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, ChevronDown } from 'lucide-react';
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
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id';
      
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
          cancel_on_tap_outside: true
        });

        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          {
            theme: 'outline',
            size: 'large',
            width: 200,
            text: 'signin_with',
            shape: 'rectangular',
            logo_alignment: 'left'
          }
        );
        
        console.log('Google Sign-In button rendered successfully');
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
          className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
        >
          <User className="w-4 h-4" />
          <span>Sign In</span>
          <ChevronDown className="w-3 h-3" />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg z-50"
            >
              <div className="p-4">
                <h3 className="text-sm font-semibold text-foreground mb-3">Sign In to Prime Properties</h3>
                
                {googleError && (
                  <div className="mb-3 p-2 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-xs">
                    {googleError}
                  </div>
                )}

                <div className="flex justify-center mb-3">
                  <div ref={googleButtonRef}></div>
                </div>

                {/* Fallback button if Google Sign-In doesn't load */}
                {!window.google && (
                  <div className="text-center">
                    <button
                      onClick={() => setGoogleError('Google Sign-In is loading. Please try again in a moment.')}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                    >
                      Sign In with Google
                    </button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Loading Google Sign-In...
                    </p>
                  </div>
                )}

                {isGoogleLoading && (
                  <div className="mt-3 text-center text-sm text-muted-foreground">
                    Signing in...
                  </div>
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
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
      >
        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <User className="w-3 h-3 text-white" />
        </div>
        <span className="hidden sm:block">{user?.name || user?.username}</span>
        <ChevronDown className="w-3 h-3" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-background border border-border rounded-lg shadow-lg z-50"
          >
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{user?.name || user?.username}</h3>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <div className="text-xs text-muted-foreground mb-2">
                  <div>Role: <span className="font-medium text-foreground">{user?.role}</span></div>
                  <div>Status: <span className="font-medium text-green-500">Logged In</span></div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
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
