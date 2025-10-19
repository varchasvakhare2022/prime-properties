import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Shield, ShieldCheck, BadgeCheck, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import StaggerContainer, { staggerItemVariants } from '../components/StaggerContainer';
import CursorTrail from '../components/CursorTrail';
import CounterAnimation from '../components/CounterAnimation';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  
  // Parallax effect for hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen">
      {/* Hero Section with Animated Background and Parallax */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Cursor Trail Effect */}
        <CursorTrail className="hidden md:block" />
        
        {/* Animated Grid Background with Parallax */}
        <motion.div style={{ y, opacity }} className="absolute inset-0 bg-dark-bg">
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, #6366f1 1px, transparent 1px),
                linear-gradient(to bottom, #6366f1 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />
          
          {/* Animated Gradient Orbs */}
          <motion.div
            animate={{
              x: mousePosition.x / 50,
              y: mousePosition.y / 50,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20"
          />
          <motion.div
            animate={{
              x: -mousePosition.x / 30,
              y: -mousePosition.y / 30,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-20"
          />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                opacity: [null, Math.random() * 0.5 + 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            ))}
          </motion.div>
  
          {/* Hero Content */}
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            {/* Glassmorphism Card */}
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 md:p-16 shadow-2xl">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-secondary to-primary opacity-20 blur-xl -z-10" />
              
              {/* Animated Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-sm font-medium text-gray-300">Premium Real Estate Platform</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                  Prime Properties
                </span>
              </motion.h1>

              {/* Inspirational Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mb-8"
              >
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-light italic leading-relaxed mb-3">
                  "Where Dreams Find Their Address"
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl px-4 sm:px-0">
                  Discover luxury living redefined. Your perfect home awaits in our curated collection of premium properties.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/properties">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-base sm:text-lg overflow-hidden shadow-lg shadow-primary/50 min-h-[44px] touch-manipulation w-full sm:w-auto"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Explore Properties
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </Link>

                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                  >
                    Contact Us
                  </motion.button>
                </Link>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full blur-2xl opacity-30" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-secondary to-primary rounded-full blur-2xl opacity-30" />
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-gray-400"
            >
              <span className="text-sm">Scroll to explore</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Features Section */}
      <section className="py-24 bg-dark-bg relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary rounded-full blur-[120px] opacity-20" />
        </div>

        <div className="container-custom relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Your Trust, Our Priority
              </span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Experience secure and transparent real estate transactions with our verified platform
            </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
            {[
              {
                icon: BadgeCheck,
                title: '100% Trusted',
                description: 'Verified properties with complete legal documentation and transparent dealings',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Shield,
                title: 'Cyber Fraud Protection',
                description: 'Advanced security measures to protect your data and financial transactions',
                gradient: 'from-primary to-secondary',
              },
              {
                icon: ShieldCheck,
                title: 'Genuine Properties & Land',
                description: 'Every listing is verified and authenticated by our expert team',
                gradient: 'from-purple-500 to-pink-500',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.2,
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative"
                >
                  {/* Glow Effect on Hover */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`} />
                  
                  {/* Card */}
                  <div className="relative h-full backdrop-blur-xl bg-dark-surface/80 border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-300">
                    {/* Icon Container */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>

                    {/* Icon Glow */}
                    <div className={`absolute top-8 left-8 w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />

                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Bottom Accent Line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`} />

                    {/* Corner Decorations */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark-surface/50 backdrop-blur-sm border-y border-white/5">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Properties Listed' },
              { value: '1000+', label: 'Happy Clients' },
              { value: '50+', label: 'Expert Agents' },
              { value: '20+', label: 'Years Experience' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-bg">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Why Choose Prime Properties?
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Experience excellence in real estate with our comprehensive suite of services
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
            {[
              {
                icon: '🏆',
                title: 'Premium Listings',
                description: 'Curated selection of luxury properties in prime locations',
              },
              {
                icon: '👥',
                title: 'Expert Guidance',
                description: 'Professional consultants with decades of experience',
              },
              {
                icon: '💎',
                title: 'Best Value',
                description: 'Competitive pricing and exclusive deals for our clients',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={staggerItemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 h-full hover:border-primary/50 transition-all duration-300">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  
                  {/* Hover Gradient Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Browse Properties CTA Section */}
      <section className="py-20 bg-gradient-to-b from-dark-surface to-dark-bg">
        <div className="container-custom">
          <ScrollReveal direction="up" className="max-w-4xl mx-auto">
            <Link to="/properties">
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative cursor-pointer"
              >
                {/* Animated Gradient Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl opacity-75 group-hover:opacity-100 blur-lg transition-all duration-500 animate-gradient" />
                
                {/* Card Content */}
                <div className="relative backdrop-blur-xl bg-dark-surface/90 border-2 border-transparent rounded-3xl p-12 md:p-16 overflow-hidden">
                  {/* Background Pattern */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, #6366f1 1px, transparent 1px)`,
                      backgroundSize: '40px 40px',
                    }}
                  />

                  {/* Gradient Orb Effects */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left flex-1">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        <h2 className="text-4xl md:text-6xl font-bold mb-4">
                          <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                            Browse Properties
                          </span>
                        </h2>
                        <p className="text-gray-300 text-lg md:text-xl">
                          Explore our exclusive collection of premium real estate
                        </p>
                      </motion.div>
                    </div>

                    {/* Animated Arrow */}
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="flex-shrink-0"
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/50 group-hover:shadow-primary/70 transition-all duration-300">
                        <ArrowRight className="w-10 h-10 text-white" strokeWidth={2.5} />
                      </div>
                    </motion.div>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </ScrollReveal>
        </div>
      </section>
      </div>
    </PageTransition>
  );
};

export default Home;
