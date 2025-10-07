import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, 
  Shield, Award, Users, Building2, Heart, Code, Github, ExternalLink 
} from "lucide-react";
import { GradientText } from "./gradient";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.05, 1, 1.05],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Company Info - Takes up more space */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">
                    <span className="gradient-text-primary">Prime</span>
                    <span className="gradient-text-accent"> Properties</span>
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed max-w-md">
                    Your trusted partner in finding the perfect property. We connect customers with 
                    verified developers to make property transactions seamless, secure, and transparent.
                  </p>
                </div>
                
                {/* Company Stats - Cleaner Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: Building2, label: "10K+", desc: "Properties" },
                    { icon: Users, label: "5K+", desc: "Customers" },
                    { icon: Award, label: "500+", desc: "Developers" },
                    { icon: Heart, label: "99%", desc: "Satisfaction" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{stat.label}</div>
                        <div className="text-white/60 text-xs">{stat.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links - Cleaner Design */}
                <div className="flex space-x-3">
                  {[
                    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-400" },
                    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-cyan-400" },
                    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-400" },
                    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-500" }
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2.5 bg-white/10 backdrop-blur-sm rounded-lg text-white/70 ${social.color} transition-all duration-300 hover:bg-white/20 border border-white/10`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  {[
                    { name: "Home", href: "/" },
                    { name: "Properties", href: "/properties" },
                    { name: "About Us", href: "/about" },
                    { name: "Contact", href: "/contact" },
                    { name: "Developer Portal", href: "/login" },
                    { name: "Customer Dashboard", href: "/login" }
                  ].map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-white/70 hover:text-white transition-colors duration-300 text-sm group flex items-center"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact & Legal */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="text-lg font-semibold text-white mb-6">Contact & Support</h4>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-white/70">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mr-3">
                      <Mail className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-sm">info@primeproperties.com</span>
                  </div>
                  <div className="flex items-center text-white/70">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mr-3">
                      <Phone className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-sm">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center text-white/70">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mr-3">
                      <MapPin className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-sm">Mumbai, Maharashtra, India</span>
                  </div>
                </div>

                <h5 className="text-sm font-semibold text-white/80 mb-3">Legal</h5>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/privacy" className="text-white/60 hover:text-white text-xs transition-colors">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="text-white/60 hover:text-white text-xs transition-colors">
                    Terms of Service
                  </Link>
                  <Link to="/cookies" className="text-white/60 hover:text-white text-xs transition-colors">
                    Cookie Policy
                  </Link>
                  <Link to="/refund" className="text-white/60 hover:text-white text-xs transition-colors">
                    Refund Policy
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Developer Credits - Cleaner Design */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="py-8 border-t border-white/10"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
              >
                <Code className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h5 className="text-white font-semibold text-sm">Developed with ❤️ by</h5>
                <p className="text-white/70 text-xs">Varchasva Kumar • Full Stack Developer & UI/UX Designer</p>
                <p className="text-white/50 text-xs mt-0.5">© Proprietary Software - No Copying Allowed</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <motion.a
                href="https://github.com/varchasva"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg text-white/70 hover:text-white transition-all duration-300 border border-white/10"
              >
                <Github className="w-4 h-4" />
                <span className="text-xs">GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/varchasva"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg text-white/70 hover:text-white transition-all duration-300 border border-white/10"
              >
                <Linkedin className="w-4 h-4" />
                <span className="text-xs">LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar - Cleaner Layout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="py-6 border-t border-white/10"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0">
            <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-6">
              <p className="text-white/60 text-xs text-center lg:text-left">
                © {currentYear} Prime Properties. All rights reserved. Unauthorized copying prohibited.
              </p>
              <div className="flex items-center space-x-2 text-white/60 text-xs">
                <Shield className="w-3 h-3" />
                <span>Secured with SSL Encryption</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-xs">
              <span className="text-white/60">Proprietary Software</span>
              <span className="text-purple-400 font-medium">© All Rights Reserved</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Built with React & Spring Boot</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};