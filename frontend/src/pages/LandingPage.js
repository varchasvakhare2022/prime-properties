import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Home, Building2, Shield, Zap, Heart, Star, TrendingUp, Users, Award } from 'lucide-react';
import { Navbar } from '../components/ui/navbar';
import { CardTitle, CardDescription } from '../components/ui/card';
import { ShimmerButton, ShimmerCard } from '../components/ui/shimmer';
import { GradientBorder, GradientText } from '../components/ui/gradient';

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const features = [
    {
      icon: Shield,
      title: "Verified Properties",
      description: "All properties are thoroughly verified and authenticated by our expert team",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Streamlined process for quick property transactions and instant updates",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Heart,
      title: "Premium Service",
      description: "Dedicated support and personalized assistance for all your property needs",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const stats = [
    { number: "10K+", label: "Properties Listed", icon: Building2 },
    { number: "5K+", label: "Happy Customers", icon: Users },
    { number: "500+", label: "Trusted Developers", icon: Award },
    { number: "99%", label: "Satisfaction Rate", icon: Star }
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

      <Navbar />
      
      <div className="pt-16 relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
          <motion.div style={{ y }} className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 animate-pulse-glow">
                  <Home className="w-12 h-12 text-white" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-6xl md:text-8xl font-bold mb-6"
              >
                <span className="gradient-text-primary">Prime</span>
                <span className="gradient-text-accent"> Properties</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto mb-12 drop-shadow-lg"
              >
                Your premier destination for luxury real estate. Find your dream property or showcase your developments with our cutting-edge platform.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShimmerButton asChild>
                    <Link to="/properties" className="text-white font-semibold px-8 py-4 rounded-xl">
                      Explore Properties
                    </Link>
                  </ShimmerButton>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/login" 
                    className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-all duration-300 hover-glow"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Main Content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              {/* Customer Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="hover-lift"
              >
                <GradientBorder>
                  <div className="text-center p-8 glass-effect rounded-2xl">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-float"
                    >
                      <Home className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <CardTitle className="text-3xl font-bold text-white mb-4">
                      Find Your Dream Home
                    </CardTitle>
                    
                    <CardDescription className="text-white/70 mb-8 text-lg">
                      Browse thousands of verified property listings across India using powerful search and filter tools.
                    </CardDescription>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        to="/properties" 
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                      >
                        Browse Properties
                        <TrendingUp className="w-4 h-4 ml-2" />
                      </Link>
                    </motion.div>
                  </div>
                </GradientBorder>
              </motion.div>

              {/* Developer Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="hover-lift"
              >
                <GradientBorder>
                  <div className="text-center p-8 glass-effect rounded-2xl">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-float"
                      style={{ animationDelay: '1s' }}
                    >
                      <Building2 className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <CardTitle className="text-3xl font-bold text-white mb-4">
                      Exclusive Developer Access
                    </CardTitle>
                    
                    <CardDescription className="text-white/70 mb-8 text-lg">
                      Easily list new properties, update details, and mark projects as sold using your dedicated dashboard.
                    </CardDescription>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        to="/login" 
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                      >
                        Developer Portal
                        <Building2 className="w-4 h-4 ml-2" />
                      </Link>
                    </motion.div>
                  </div>
                </GradientBorder>
              </motion.div>
            </div>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center mb-16">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-4xl font-bold text-white mb-4"
                >
                  Why Choose <span className="gradient-text-primary">Prime Properties</span>?
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="text-white/70 text-lg"
                >
                  Experience the future of real estate with our cutting-edge platform
                </motion.p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="hover-lift"
                  >
                    <ShimmerCard>
                      <div className="text-center p-6">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow`}
                          style={{ animationDelay: `${index * 0.5}s` }}
                        >
                          <feature.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-white/70">
                          {feature.description}
                        </p>
                      </div>
                    </ShimmerCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="mt-20"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 glass-effect rounded-xl hover-lift"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      <span className="gradient-text-primary">{stat.number}</span>
                    </div>
                    <div className="text-white/70">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
