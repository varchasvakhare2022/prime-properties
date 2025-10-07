import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, User, Shield, Zap, Heart } from 'lucide-react';
import { ShimmerButton } from '../components/ui/shimmer';
import { GradientText, GradientBorder } from '../components/ui/gradient';

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Handle OAuth callback parameters
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const token = urlParams.get('token');
    const errorParam = urlParams.get('error');

    if (success === 'true' && token) {
      // Store the token and redirect to dashboard
      localStorage.setItem('token', token);
      navigate('/properties');
    } else if (errorParam) {
      // Handle error cases
      switch (errorParam) {
        case 'auth_failed':
          setError('Authentication failed. Please try again.');
          break;
        case 'missing_info':
          setError('Missing user information from Google. Please try again.');
          break;
        default:
          setError('An error occurred during sign-in. Please try again.');
      }
    }
  }, [navigate]);

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

      <div className="relative z-10 min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-sm w-full"
        >
          <GradientBorder>
            <div className="glass-effect p-6 rounded-2xl border border-white/10">
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow"
                >
                  <User className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-2xl font-bold text-white mb-2"
                >
                  Welcome to <span className="gradient-text-primary">Prime Properties</span>
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-white/70 text-sm"
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

                  {/* Debug Information */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                  >
                    <p className="text-blue-300 text-xs mb-2">Debug Info:</p>
                    <p className="text-blue-300 text-xs">
                      Backend URL: {process.env.REACT_APP_API_URL || 'https://prime-properties-production-d021.up.railway.app'}
                    </p>
                    <p className="text-blue-300 text-xs">
                      OAuth URL: {process.env.REACT_APP_API_URL || 'https://prime-properties-production-d021.up.railway.app'}/oauth2/authorization/google
                    </p>
                  </motion.div>

                  {/* Google Sign-In Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mb-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    // Redirect to backend Google OAuth endpoint
                    const backendUrl = process.env.REACT_APP_API_URL || 'https://prime-properties-production-d021.up.railway.app';
                    window.location.href = `${backendUrl}/oauth2/authorization/google`;
                  }}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 border border-gray-200"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Sign in with Google</span>
                </motion.button>
              </motion.div>

              {/* Alternative Sign-In Methods */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-center space-y-4"
              >
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 py-1 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white/60 text-sm font-medium rounded-full border border-white/10">
                      Or continue as guest
                    </span>
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShimmerButton asChild>
                    <button 
                      onClick={() => navigate('/properties')} 
                      className="text-white font-semibold px-6 py-3 rounded-xl w-full"
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
                className="mt-6 space-y-2"
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
                      className="w-6 h-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center"
                    >
                      <feature.icon className="w-3 h-3 text-purple-400" />
                    </motion.div>
                    <div>
                      <p className="text-white/80 text-xs font-medium">{feature.title}</p>
                      <p className="text-white/60 text-xs leading-tight">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="text-center mt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  className="flex items-center justify-center space-x-2 text-white/60 hover:text-white transition-colors mx-auto text-sm"
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