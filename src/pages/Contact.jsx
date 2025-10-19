import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Mail, Phone, User } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedInput from '../components/AnimatedInput';
import RippleButton from '../components/RippleButton';
import { useToast } from '../components/Toast';
import GradientSpinner from '../components/GradientSpinner';

const Contact = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      addToast('Message sent successfully! We\'ll get back to you soon.', 'success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 2000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-dark-bg py-20">
        {/* Hero Section */}
        <div className="container-custom mb-16">
          <ScrollReveal>
            <div className="text-center">
              <motion.h1
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-5xl md:text-6xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  Get In Touch
                </span>
              </motion.h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Contact Form */}
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Form Column */}
            <ScrollReveal direction="left" className="lg:col-span-2">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <AnimatedInput
                    label="Your Name *"
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    icon={User}
                    placeholder="John Doe"
                  />

                  {/* Email Field */}
                  <AnimatedInput
                    label="Email Address *"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    icon={Mail}
                    placeholder="john@example.com"
                  />

                  {/* Phone Field */}
                  <AnimatedInput
                    label="Phone Number *"
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    icon={Phone}
                    placeholder="+91 98765 43210"
                  />

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.02 }}
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className={`w-full px-4 py-3 bg-dark-bg/50 border ${
                        errors.message ? 'border-red-500' : 'border-white/10'
                      } rounded-xl focus:outline-none focus:border-primary transition-all duration-300 text-white placeholder-gray-500 resize-none`}
                      placeholder="Tell us about your requirements..."
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-1"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <RippleButton
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    className="w-full px-8 py-4"
                  >
                    {isSubmitting ? (
                      <>
                        <GradientSpinner size="sm" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </RippleButton>
                </form>
              </div>
            </ScrollReveal>

            {/* Contact Information Column */}
            <ScrollReveal direction="right" className="lg:col-span-1">
              <div className="space-y-6">
                {/* Email Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Email Us</h3>
                  <a href="mailto:info@primeproperties.com" className="text-gray-400 hover:text-primary transition-colors">
                    info@primeproperties.com
                  </a>
                </motion.div>

                {/* Phone Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-secondary/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Call Us</h3>
                  <a href="tel:+919876543210" className="text-gray-400 hover:text-secondary transition-colors">
                    +91 98765 43210
                  </a>
                </motion.div>

                {/* Info Box */}
                <div className="backdrop-blur-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-2 text-white">Office Hours</h3>
                  <div className="space-y-1 text-gray-400">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
