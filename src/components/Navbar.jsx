import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: 'Properties', path: '/properties' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const NavLink = ({ to, children }) => {
    const active = isActive(to);
    
    return (
      <Link to={to} onClick={() => setIsMobileMenuOpen(false)}>
        <motion.div
          className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className={active ? 'text-white' : 'text-gray-300 hover:text-white'}>
            {children}
          </span>
          {active && (
            <motion.div
              layoutId="navbar-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
            />
          )}
          {!active && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary opacity-0"
              whileHover={{ opacity: 0.5 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.div>
      </Link>
    );
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-dark-bg/70 backdrop-blur-xl shadow-lg shadow-primary/5 border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Left Side - Logo, Brand, Home */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 group">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-secondary opacity-0 blur-xl"
                    whileHover={{ opacity: 0.6 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                
                <motion.span
                  className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  Prime Properties
                </motion.span>
              </Link>

              {/* Home Link */}
              <div className="hidden md:block">
                <NavLink to="/">Home</NavLink>
              </div>
            </div>

            {/* Right Side - Navigation Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => (
                <NavLink key={link.path} to={link.path}>
                  {link.name}
                </NavLink>
              ))}
              
              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4"
              >
                <Link
                  to="/properties"
                  className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold overflow-hidden group"
                >
                  <span className="relative z-10">Get Started</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button - Optimized Touch Target (44x44px minimum) */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-11 h-11 rounded-lg bg-dark-surface/50 backdrop-blur-xl border border-white/10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-white rounded-full"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-20 right-0 bottom-0 w-80 max-w-[90vw] bg-dark-surface/95 backdrop-blur-2xl border-l border-white/10 z-40 md:hidden shadow-2xl overflow-y-auto"
            >
              <div className="flex flex-col p-6 space-y-4">
                {/* Mobile Home Link */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <NavLink to="/">Home</NavLink>
                </motion.div>

                {/* Mobile Nav Links */}
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * (index + 2) }}
                  >
                    <NavLink to={link.path}>{link.name}</NavLink>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6"
                >
                  <Link
                    to="/properties"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-6 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-center touch-manipulation"
                  >
                    Get Started
                  </Link>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
                  <p className="text-center text-gray-500 text-sm mt-4">
                    Discover Your Dream Home
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;

