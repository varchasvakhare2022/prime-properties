import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Building2, Info, Mail, Building, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";
import { GradientText } from "./gradient";
import ProfileDropdown from "../ProfileDropdown";

export const Navbar = ({ className, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]);
  const blur = useTransform(scrollY, [0, 100], [0, 20]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Properties", href: "/properties", icon: Building2 },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor, backdropFilter: `blur(${blur}px)` }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass-effect border-b border-white/10" : "bg-transparent",
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300"
              >
                <Building className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold">
                <span className="gradient-text-primary">Prime</span>
                <span className="gradient-text-accent"> Properties</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "relative flex items-center space-x-2 text-sm font-medium transition-all duration-300 group px-4 py-2 rounded-lg",
                      isActive 
                        ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30" 
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <item.icon className="w-4 h-4" />
                    </motion.div>
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </Link>
                </motion.div>
              );
            })}
            
            {/* Profile Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ProfileDropdown />
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isOpen ? 1 : 0, 
            height: isOpen ? "auto" : 0 
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-white/10">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300",
                      isActive 
                        ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30" 
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full ml-auto"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
            
            {/* Mobile Profile Dropdown */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="px-3 py-2"
            >
              <ProfileDropdown />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};
