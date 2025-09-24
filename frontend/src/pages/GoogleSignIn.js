import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { ShimmerButton } from '../components/ui/shimmer';
import { GradientText } from '../components/ui/gradient';

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
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'your-google-client-id';
      
      console.log('Initializing Google Sign-In with Client ID:', clientId);
      console.log('Current domain:', window.location.origin);
      
      if (clientId === 'your-google-client-id') {
        setError('Google Client ID not configured. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID in your environment variables.');
        return;
      }

      try {
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
            width: '100%',
            text: 'signin_with',
            shape: 'rectangular',
            logo_alignment: 'left'
          }
        );
        
        console.log('Google Sign-In button rendered successfully');
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
        setError('Failed to initialize Google Sign-In. Please check your configuration.');
      }
    } else {
      console.error('Google API not loaded or button ref not available');
      setError('Google Sign-In service not available. Please refresh the page.');
    }
  };

  const handleGoogleSignIn = async (response) => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Google Sign-In response:', response);
      
      // Ensure we're using HTTPS
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://prime-properties-production-d021.up.railway.app';
      if (!apiUrl.startsWith('https://')) {
        throw new Error('API URL must use HTTPS');
      }
      
      // Send the credential to backend
      const backendResponse = await fetch(`${apiUrl}/auth/google`, {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">
              <GradientText>Welcome to Prime Properties</GradientText>
            </h2>
            <p className="text-gray-300">
              Sign in with your Google account to continue
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
            >
              <p className="text-red-300 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg"
            >
              <p className="text-blue-300 text-sm">Signing in...</p>
            </motion.div>
          )}

          {/* Google Sign-In Button */}
          <div className="mb-6">
            <div ref={googleButtonRef} className="w-full"></div>
          </div>

          {/* Alternative Sign-In Methods */}
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-400">Or continue as guest</span>
              </div>
            </div>
            
            <ShimmerButton 
              onClick={() => navigate('/')}
              className="w-full"
            >
              Browse Properties
            </ShimmerButton>
          </div>

          {/* Links */}
          <div className="text-center mt-6 space-y-2">
            <button
              onClick={() => navigate('/')}
              className="block text-gray-400 hover:text-white transition-colors mx-auto"
            >
              <Home className="w-4 h-4 inline mr-1" />
              Back to Home
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GoogleSignIn;
