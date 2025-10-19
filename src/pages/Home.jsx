import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Shield, ShieldCheck, BadgeCheck, ArrowRight, Home as HomeIcon, Building2, Key, Award } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import StaggerContainer, { staggerItemVariants } from '../components/StaggerContainer';
import CursorTrail from '../components/CursorTrail';
import CounterAnimation from '../components/CounterAnimation';
import CustomCursor from '../components/CustomCursor';
import useSectionDetection from '../hooks/useSectionDetection';
import { 
  ParticleBackground, 
  GradientOrbs, 
  InteractiveGrid, 
  RippleBackground, 
  GeometricShapes, 
  SpotlightEffect 
} from '../components/InteractiveBackground';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  
  // Section detection for custom cursor
  const activeSection = useSectionDetection(['hero', 'trust', 'stats', 'features', 'cta']);
  
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
      {/* Custom Cursor */}
      <CustomCursor section={activeSection} />
      
      {/* Hero Section with Luxury Real Estate Background */}
      <section ref={heroRef} data-section="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        
        {/* Interactive Background - Gradient Orbs + Particles */}
        <GradientOrbs mousePosition={mousePosition} />
        <ParticleBackground color="#d4af37" count={60} />
        <SpotlightEffect mousePosition={mousePosition} />
        
        {/* Elegant Background with Subtle Pattern */}
        <motion.div style={{ y, opacity }} className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg">
          {/* Luxury Diagonal Pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 60px)`,
            }}
          />
          
          {/* Elegant Gold Glow Effects */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.08, 0.12, 0.08],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-secondary rounded-full blur-3xl"
          />
          
          {/* Subtle Floating Elements representing luxury */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                opacity: [0.2, 0.5, 0.2],
                scale: [null, Math.random() * 0.8 + 0.4],
              }}
              transition={{
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                ease: "easeInOut",
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
            {/* Elegant Luxury Card */}
            <div className="relative backdrop-blur-xl bg-black/40 border border-primary/20 rounded-3xl p-12 md:p-16 shadow-2xl">
              {/* Gold Glow Border Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-secondary to-primary opacity-10 blur-xl -z-10" />
              
              {/* Luxury Badge with Glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/40 mb-8 backdrop-blur-sm animate-luxury-glow"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Award className="w-4 h-4 text-primary drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                </motion.div>
                <span className="text-sm font-semibold text-primary tracking-wide">Luxury Real Estate</span>
              </motion.div>

              {/* Main Heading with Luxury Animation */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight"
              >
                <span className="text-gold-shine drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">
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
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 0 40px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.3)" 
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-bold text-base sm:text-lg overflow-hidden shadow-gold-lg min-h-[44px] touch-manipulation w-full sm:w-auto animate-gold-shimmer"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Building2 className="w-5 h-5" />
                      </motion.div>
                      View Properties
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
                    whileHover={{ 
                      scale: 1.05, 
                      borderColor: "rgba(212, 175, 55, 0.8)",
                      boxShadow: "0 0 30px rgba(212, 175, 55, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-black/30 backdrop-blur-sm border-2 border-primary/30 text-primary font-semibold text-lg hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <motion.div
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Key className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                    </motion.div>
                    Schedule Viewing
                  </motion.button>
                </Link>
              </motion.div>

              {/* Luxury Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary rounded-full blur-2xl opacity-20" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary rounded-full blur-2xl opacity-15" />
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary/20 rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary/20 rounded-bl-3xl"></div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Trust Features Section */}
      <section data-section="trust" className="py-24 bg-dark-bg relative overflow-hidden">
        {/* Interactive Background - Geometric Shapes + Grid */}
        <GeometricShapes mousePosition={mousePosition} />
        <InteractiveGrid mousePosition={mousePosition} />
        
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary rounded-full blur-[120px] opacity-15" />
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
                title: 'Verified Properties',
                description: '100% authenticated listings with complete legal documentation and transparent dealings',
                gradient: 'from-primary to-secondary',
              },
              {
                icon: Shield,
                title: 'Secure Transactions',
                description: 'Protected dealings with advanced security measures and fraud prevention',
                gradient: 'from-secondary to-accent',
              },
              {
                icon: ShieldCheck,
                title: 'Premium Locations',
                description: 'Handpicked properties in the most sought-after neighborhoods and prime areas',
                gradient: 'from-accent to-primary',
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
                  
                  {/* Card with Float Animation */}
                  <div className="relative h-full backdrop-blur-xl bg-black/40 border border-primary/10 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 animate-float">
                    {/* Icon Container with Glow */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-gold-md group-hover:scale-110 group-hover:shadow-gold-lg transition-all duration-300 animate-luxury-glow`}>
                      <Icon className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={2} />
                    </div>

                    {/* Icon Glow */}
                    <div className={`absolute top-8 left-8 w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />

                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-all duration-300 drop-shadow-lg">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Bottom Accent Line with Shimmer */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-gold-shimmer"></div>
                    </div>

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
      <section data-section="stats" className="py-20 bg-dark-surface/50 backdrop-blur-sm border-y border-primary/10 relative overflow-hidden">
        {/* Interactive Background - Ripples */}
        <RippleBackground mousePosition={mousePosition} />
        <ParticleBackground color="#8b5cf6" count={30} />
        
        <div className="container-custom relative z-10">
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

      {/* Why Choose Prime Properties Section */}
      <section data-section="features" className="py-20 bg-dark-bg relative overflow-hidden">
        {/* Interactive Background - Gradient Orbs + Particles */}
        <GradientOrbs mousePosition={mousePosition} />
        <ParticleBackground color="#d4af37" count={40} />
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[100px]" />
        </div>
        <div className="container-custom relative z-10">
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
                icon: HomeIcon,
                title: 'Luxury Homes',
                description: 'Exquisite residences featuring world-class amenities and architecture',
              },
              {
                icon: Building2,
                title: 'Commercial Spaces',
                description: 'Premium office and retail properties in strategic business districts',
              },
              {
                icon: Key,
                title: 'Easy Ownership',
                description: 'Streamlined processes with personalized assistance every step of the way',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
              <motion.div
                key={index}
                variants={staggerItemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="relative backdrop-blur-xl bg-black/40 border border-primary/10 rounded-2xl p-8 h-full hover:border-primary/40 transition-all duration-300 group-hover:shadow-gold-md">
                  <motion.div 
                    className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 shadow-gold-sm animate-luxury-glow"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-7 h-7 text-black drop-shadow-lg" strokeWidth={2.5} />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-primary transition-colors drop-shadow-md">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  
                  {/* Hover Gold Gradient Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
              </motion.div>
            );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Browse Properties CTA Section */}
      <section data-section="cta" className="py-20 bg-gradient-to-b from-dark-surface to-dark-bg relative overflow-hidden">
        {/* Interactive Background - Spotlight + Grid + Particles */}
        <SpotlightEffect mousePosition={mousePosition} />
        <InteractiveGrid mousePosition={mousePosition} />
        <ParticleBackground color="#d4af37" count={50} />
        
        <div className="container-custom relative z-10">
          <ScrollReveal direction="up" className="max-w-4xl mx-auto">
            <Link to="/properties">
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative cursor-pointer"
              >
                {/* Animated Gold Gradient Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl opacity-50 group-hover:opacity-75 blur-lg transition-all duration-500" />
                
                {/* Card Content */}
                <div className="relative backdrop-blur-xl bg-black/60 border-2 border-primary/20 rounded-3xl p-12 md:p-16 overflow-hidden">
                  {/* Luxury Background Pattern */}
                  <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 1px)`,
                      backgroundSize: '40px 40px',
                    }}
                  />

                  {/* Gold Glow Effects */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary rounded-full blur-3xl opacity-15 group-hover:opacity-25 transition-opacity duration-500" />
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left flex-1">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        <h2 className="text-4xl md:text-6xl font-bold mb-4">
                          <span className="text-gold-shine drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">
                            Browse Properties
                          </span>
                        </h2>
                        <p className="text-gray-300 text-lg md:text-xl">
                          Explore our exclusive collection of premium real estate
                        </p>
                      </motion.div>
                    </div>

                    {/* Animated Arrow with Luxury Effects */}
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="flex-shrink-0"
                    >
                      <motion.div 
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-gold-lg group-hover:shadow-gold-glow transition-all duration-300 animate-luxury-glow"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="w-10 h-10 text-black drop-shadow-lg" strokeWidth={2.5} />
                      </motion.div>
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
