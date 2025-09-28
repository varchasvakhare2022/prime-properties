import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Building2, Shield, Zap, Heart } from 'lucide-react';
import { Navbar } from '../components/ui/navbar';
import { CardTitle, CardDescription } from '../components/ui/card';
import { ShimmerButton, ShimmerCard } from '../components/ui/shimmer';
import { GradientBorder, GradientText } from '../components/ui/gradient';

const LandingPage = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Properties",
      description: "All properties are thoroughly verified and authenticated"
    },
    {
      icon: Zap,
      title: "Fast Transactions",
      description: "Streamlined process for quick property transactions"
    },
    {
      icon: Heart,
      title: "Premium Service",
      description: "Dedicated support for all your property needs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl md:text-8xl font-bold mb-6"
              >
                <GradientText>Prime Properties</GradientText>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-white font-medium max-w-3xl mx-auto mb-12 drop-shadow-lg"
              >
                Your premier destination for luxury real estate. Find your dream property or showcase your developments.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              {/* Customer Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <GradientBorder>
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Home className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <CardTitle className="text-3xl font-bold text-white mb-4">
                      Find Your Dream Home
                    </CardTitle>
                    
                    <CardDescription className="text-slate-300 mb-8 text-lg">
                      Browse thousands of verified property listings across India using powerful search and filter tools.
                    </CardDescription>
                  </div>
                </GradientBorder>
              </motion.div>

              {/* Developer Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <GradientBorder>
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Building2 className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <CardTitle className="text-3xl font-bold text-white mb-4">
                      Exclusive Developer Access
                    </CardTitle>
                    
                    <CardDescription className="text-slate-300 mb-8 text-lg">
                      Easily list new properties, update details, and mark projects as sold using your dedicated dashboard.
                    </CardDescription>
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
                <h2 className="text-4xl font-bold text-white mb-4">
                  Why Choose <GradientText>Prime Properties</GradientText>?
                </h2>
                <p className="text-slate-300 text-lg">
                  Experience the future of real estate with our cutting-edge platform
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <ShimmerCard>
                      <div className="text-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                          <feature.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-slate-300">
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
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mt-20"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { number: "10K+", label: "Properties Listed" },
                  { number: "5K+", label: "Happy Customers" },
                  { number: "500+", label: "Trusted Developers" },
                  { number: "99%", label: "Satisfaction Rate" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      <GradientText>{stat.number}</GradientText>
                    </div>
                    <div className="text-slate-300">{stat.label}</div>
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
