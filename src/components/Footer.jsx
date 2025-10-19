import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative bg-dark-surface border-t border-white/10 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] opacity-20" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px] opacity-20" />
      </div>

      <div className="container-custom relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <motion.div
                whileHover={{ 
                  scale: 1.08,
                  y: -2,
                }}
                transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="relative"
              >
                <Logo size="lg" animate={true} />
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-secondary blur-xl opacity-30"
                  whileHover={{ opacity: 0.6, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
              <motion.span 
                className="text-2xl font-bold text-gold-shine drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                whileHover={{ 
                  scale: 1.03,
                  textShadow: "0 0 15px rgba(212, 175, 55, 0.8)"
                }}
                transition={{ duration: 0.3 }}
              >
                Prime Properties
              </motion.span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md text-sm md:text-base">
              Your trusted partner in finding the perfect property. We specialize in luxury 
              real estate, providing exceptional service and verified listings to help you 
              discover your dream home.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors w-fit">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm md:text-base">123 Prime Street, Beverly Hills, CA 90210</span>
              </a>
              <a href="tel:+15551234567" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors w-fit">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm md:text-base">+1 (555) 123-4567</span>
              </a>
              <a href="mailto:info@primeproperties.com" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors w-fit">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm md:text-base">info@primeproperties.com</span>
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary transition-colors duration-200 flex items-center gap-2 group w-fit"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-white">Stay Connected</h3>
            <p className="text-gray-400 mb-6">
              Follow us on social media for the latest property listings and updates.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ 
                      scale: 1.25, 
                      y: -8,
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="relative w-11 h-11 rounded-lg bg-black/40 border border-primary/20 flex items-center justify-center hover:border-primary/60 transition-all duration-300 group touch-manipulation overflow-hidden"
                  >
                    <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors relative z-10 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    {/* Ripple effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      whileHover={{
                        boxShadow: [
                          "0 0 0 0 rgba(212, 175, 55, 0.7)",
                          "0 0 0 15px rgba(212, 175, 55, 0)",
                        ],
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-lg"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "linear"
                      }}
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm text-center md:text-left"
            >
              © {currentYear} Prime Properties. All rights reserved. Built with passion for real estate.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-6 text-sm"
            >
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </motion.div>
          </div>
        </div>

        {/* Decorative Bottom Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      </div>
    </footer>
  );
};

export default Footer;

