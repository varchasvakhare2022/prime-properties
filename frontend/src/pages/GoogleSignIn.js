import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, User, Sparkles, Shield, Zap, Heart } from 'lucide-react';
import { ShimmerButton } from '../components/ui/shimmer';
import { GradientText, GradientBorder } from '../components/ui/gradient';
import HTTPSEnforcer from '../utils/httpsEnforcer';

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const googleButtonRef = useRef(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const initializeGoogleSignIn = () => {
    if (window.google && googleButtonRef.current) {
      const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id';
      
      // Debug logging for environment variables
      console.log('=== Google Sign-In Debug Info ===');
      console.log('REACT_APP_GOOGLE_CLIENT_ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID);
      console.log('Current domain:', window.location.origin);
      console.log('================================');
      
      if (clientId === 'your-google-client-id') {
        setError('Google Client ID not configured. Please set REACT_APP_GOOGLE_CLIENT_ID in your environment variables.');
        return;
      }

      try {
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
            width: 280,
            text: 'signin_with',
            shape: 'rectangular',
            logo_alignment: 'left',
            // Force redirect flow
            type: 'standard'
          }
        );
        
        console.log('✅ Google Sign-In button rendered successfully with redirect flow');
      } catch (error) {
        console.error('❌ Error initializing Google Sign-In:', error);
        setError('Failed to initialize Google Sign-In. Please check your configuration.');
      }
    } else {
      console.error('❌ Google API not loaded or button ref not available');
      setError('Google Sign-In service not available. Please refresh the page.');
    }
  };

  const handleGoogleSignIn = async (response) => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Google Sign-In response:', response);
      
      // ENFORCE HTTPS to prevent mixed content errors
      let secureApiUrl = HTTPSEnforcer.getSecureAPIUrl();
      
      // Final validation - ensure HTTPS
      if (!secureApiUrl.startsWith('https://')) {
        console.error('🚨 CRITICAL: API URL is not HTTPS, forcing HTTPS');
        secureApiUrl = 'https://prime-properties-production-d021.up.railway.app';
      }
      
      console.log('🔒 GoogleSignIn using HTTPS API URL:', secureApiUrl);
      
      // Send the credential to backend
      const backendResponse = await fetch(`${secureApiUrl}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: response.credential
        })
      });

      const data = await backendResponse.json();
      
      if (backendResponse.ok) {
        // Store JWT token
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to customer dashboard
        navigate('/customer/dashboard');
      } else {
        console.error('Backend authentication failed:', data);
        setError(data.error || data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setError(error.message || 'Sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: Zap,
      title: "Quick Access",
      description: "Sign in instantly and access all features immediately"
    },
    {
      icon: Heart,
      title: "Personalized Experience",
      description: "Get customized recommendations based on your preferences"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-2xl"
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full"
        >
          <GradientBorder>
            <div className="glass-effect p-8 rounded-2xl border border-white/10">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow"
                >
                  <User className="w-10 h-10 text-white" />
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  Welcome to <span className="gradient-text-primary">Prime Properties</span>
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-white/70"
                >
                  Sign in with your Google account to continue
                </motion.p>
              </div>

              {/* Error Display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
                >
                  <p className="text-red-300 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Loading State */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    <p className="text-blue-300 text-sm">Signing in...</p>
                  </div>
                </motion.div>
              )}

              {/* Google Sign-In Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mb-6"
              >
                <div ref={googleButtonRef} className="w-full flex justify-center"></div>
              </motion.div>

              {/* Alternative Sign-In Methods */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-center space-y-4"
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-transparent text-white/60">Or continue as guest</span>
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShimmerButton asChild>
                    <button 
                      onClick={() => navigate('/properties')} 
                      className="text-white font-semibold px-8 py-4 rounded-xl w-full"
                    >
                      Browse Properties
                    </button>
                  </ShimmerButton>
                </motion.div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mt-8 space-y-3"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center"
                    >
                      <feature.icon className="w-4 h-4 text-purple-400" />
                    </motion.div>
                    <div>
                      <p className="text-white/80 text-sm font-medium">{feature.title}</p>
                      <p className="text-white/60 text-xs">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="text-center mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  className="flex items-center justify-center space-x-2 text-white/60 hover:text-white transition-colors mx-auto"
                >
                  <Home className="w-4 h-4" />
                  <span>Back to Home</span>
                </motion.button>
              </motion.div>
            </div>
          </GradientBorder>
        </motion.div>
      </div>
    </div>
  );
};

export default GoogleSignIn;