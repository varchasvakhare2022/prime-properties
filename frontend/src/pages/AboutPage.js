import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Shield, Users, Award, Target, Heart } from 'lucide-react';
import { Navbar } from '../components/ui/navbar';
import { Footer } from '../components/ui/footer';
import { ShimmerCard } from '../components/ui/shimmer';
import { GradientText } from '../components/ui/gradient';

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "We ensure all property transactions are transparent and trustworthy, with verified developers and authenticated properties."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Our platform is designed with customers in mind, providing the best user experience and support throughout their journey."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Every property listed on our platform undergoes rigorous verification to ensure quality and authenticity."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "We continuously innovate to provide cutting-edge solutions for property discovery and transaction management."
    }
  ];

  const stats = [
    { number: "10K+", label: "Properties Listed" },
    { number: "5K+", label: "Happy Customers" },
    { number: "500+", label: "Trusted Developers" },
    { number: "99%", label: "Satisfaction Rate" }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "CEO & Founder",
      description: "15+ years in real estate with a vision to revolutionize property transactions."
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      description: "Tech expert focused on building scalable and secure platforms for property management."
    },
    {
      name: "Amit Patel",
      role: "Head of Operations",
      description: "Ensures smooth operations and customer satisfaction across all touchpoints."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About <GradientText>Prime Properties</GradientText>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              We're revolutionizing the real estate industry by connecting customers with 
              verified developers through our innovative platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              To make property discovery and transactions seamless, transparent, and trustworthy 
              by leveraging technology to connect customers with verified developers, ensuring 
              every property investment is a step towards a better future.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <ShimmerCard className="p-6 text-center h-full">
                  <div className="mb-4">
                    <value.icon className="w-12 h-12 text-purple-400 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </ShimmerCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Impact</h2>
            <p className="text-xl text-gray-300">
              Numbers that speak for our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <GradientText>{stat.number}</GradientText>
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-300">
              The passionate individuals behind Prime Properties
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <ShimmerCard className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-purple-400 mb-3">{member.role}</p>
                  <p className="text-gray-300">{member.description}</p>
                </ShimmerCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-300 mb-6">
                Prime Properties was born from a simple observation: the real estate industry 
                needed a bridge between customers seeking their dream homes and developers 
                offering quality properties.
              </p>
              <p className="text-xl text-gray-300 mb-6">
                Founded in 2020, we've grown from a small startup to a trusted platform 
                that has facilitated thousands of successful property transactions across India.
              </p>
              <p className="text-xl text-gray-300">
                Today, we continue to innovate and expand, always keeping our core values 
                of trust, transparency, and customer satisfaction at the heart of everything we do.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
