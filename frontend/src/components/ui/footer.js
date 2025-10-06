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
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-t border-white/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-3xl font-bold mb-4">
                <span className="gradient-text-primary">Prime</span>
                <span className="gradient-text-accent"> Properties</span>
              </h3>
              <p className="text-white/80 mb-6 max-w-md leading-relaxed">
                Your trusted partner in finding the perfect property. We connect customers with 
                verified developers to make property transactions seamless, secure, and transparent.
              </p>
              
              {/* Company Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { icon: Building2, label: "10K+", desc: "Properties Listed" },
                  { icon: Users, label: "5K+", desc: "Happy Customers" },
                  { icon: Award, label: "500+", desc: "Trusted Developers" },
                  { icon: Heart, label: "99%", desc: "Satisfaction Rate" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-2 p-3 bg-white/5 rounded-lg"
                  >
                    <stat.icon className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-white font-semibold">{stat.label}</div>
                      <div className="text-white/60 text-xs">{stat.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
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
                    className={`p-3 bg-white/10 backdrop-blur-md rounded-xl text-white/70 ${social.color} transition-all duration-300 hover:bg-white/20`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
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
                      className="text-white/70 hover:text-white transition-colors duration-300 flex items-center group"
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
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Contact & Support</h4>
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-white/70">
                  <Mail className="w-4 h-4 mr-3 text-purple-400" />
                  <span className="text-sm">info@primeproperties.com</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Phone className="w-4 h-4 mr-3 text-purple-400" />
                  <span className="text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center text-white/70">
                  <MapPin className="w-4 h-4 mr-3 text-purple-400" />
                  <span className="text-sm">Mumbai, Maharashtra, India</span>
                </div>
              </div>

              <h5 className="text-sm font-semibold text-white/80 mb-3">Legal</h5>
              <div className="space-y-2">
                <Link to="/privacy" className="text-white/60 hover:text-white text-sm transition-colors block">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-white/60 hover:text-white text-sm transition-colors block">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="text-white/60 hover:text-white text-sm transition-colors block">
                  Cookie Policy
                </Link>
                <Link to="/refund" className="text-white/60 hover:text-white text-sm transition-colors block">
                  Refund Policy
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Developer Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
              >
                <Code className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h5 className="text-white font-semibold">Developed with ❤️ by</h5>
                <p className="text-white/70 text-sm">Varchasva Kumar</p>
                <p className="text-white/60 text-xs">Full Stack Developer & UI/UX Designer</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.a
                href="https://github.com/varchasva"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg text-white/70 hover:text-white transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/varchasva"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg text-white/70 hover:text-white transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
                <span className="text-sm">LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-white/60 text-sm">
                © {currentYear} Prime Properties. All rights reserved.
              </p>
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <Shield className="w-4 h-4" />
                <span>Secured with SSL Encryption</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end items-center space-x-6 text-sm">
              <span className="text-white/60">Licensed under</span>
              <a 
                href="https://opensource.org/licenses/MIT" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                MIT License
              </a>
              <span className="text-white/60">•</span>
              <span className="text-white/60">Built with React & Spring Boot</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
