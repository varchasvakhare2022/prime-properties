/**
 * Micro-Interactions Demo Page
 * Showcases all the micro-interactions implemented in the site
 * For development and testing purposes
 */

import { useState } from 'react';
import { Send, Mail, Phone, User } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import RippleButton from '../components/RippleButton';
import AnimatedInput from '../components/AnimatedInput';
import GradientSpinner from '../components/GradientSpinner';
import CounterAnimation from '../components/CounterAnimation';
import { useToast } from '../components/Toast';
import CursorTrail from '../components/CursorTrail';

const MicroInteractionsDemo = () => {
  const { addToast } = useToast();
  const [inputValue, setInputValue] = useState('');

  return (
    <PageTransition>
      <div className="min-h-screen bg-dark-bg py-20">
        {/* Cursor Trail in Hero */}
        <div className="relative h-[400px] mb-20 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl mx-8 overflow-hidden">
          <CursorTrail />
          <h1 className="text-5xl font-bold text-white z-10">
            Move your cursor to see the trail effect
          </h1>
        </div>

        <div className="container-custom space-y-20">
          {/* Buttons Section */}
          <ScrollReveal>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-white mb-8">Button Interactions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-300">Primary with Ripple</h3>
                  <RippleButton 
                    variant="primary"
                    onClick={() => addToast('Primary button clicked!', 'info')}
                  >
                    <Send className="w-5 h-5" />
                    Click Me
                  </RippleButton>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-300">Secondary</h3>
                  <RippleButton 
                    variant="secondary"
                    onClick={() => addToast('Secondary button clicked!', 'info')}
                  >
                    Click Me
                  </RippleButton>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-300">Outline</h3>
                  <RippleButton 
                    variant="outline"
                    onClick={() => addToast('Outline button clicked!', 'info')}
                  >
                    Click Me
                  </RippleButton>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-300">Ghost</h3>
                  <RippleButton 
                    variant="ghost"
                    onClick={() => addToast('Ghost button clicked!', 'info')}
                  >
                    Click Me
                  </RippleButton>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Inputs Section */}
          <ScrollReveal>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-white mb-8">Input Focus Effects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                <AnimatedInput
                  label="Name"
                  placeholder="John Doe"
                  icon={User}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />

                <AnimatedInput
                  label="Email"
                  type="email"
                  placeholder="john@example.com"
                  icon={Mail}
                />

                <AnimatedInput
                  label="Phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  icon={Phone}
                />

                <AnimatedInput
                  label="With Error"
                  placeholder="This has an error"
                  error="This field is required"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Toast Notifications */}
          <ScrollReveal>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-white mb-8">Toast Notifications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <RippleButton 
                  variant="primary"
                  onClick={() => addToast('Success! Your action completed.', 'success')}
                >
                  Success Toast
                </RippleButton>

                <RippleButton 
                  variant="secondary"
                  onClick={() => addToast('Something went wrong!', 'error')}
                >
                  Error Toast
                </RippleButton>

                <RippleButton 
                  variant="outline"
                  onClick={() => addToast('Here is some information.', 'info')}
                >
                  Info Toast
                </RippleButton>

                <RippleButton 
                  variant="ghost"
                  onClick={() => addToast('Warning: Please check this!', 'warning')}
                >
                  Warning Toast
                </RippleButton>
              </div>
            </div>
          </ScrollReveal>

          {/* Loading Spinners */}
          <ScrollReveal>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-white mb-8">Gradient Loading Spinners</h2>
              
              <div className="flex items-end gap-8">
                <div className="space-y-4 text-center">
                  <GradientSpinner size="sm" />
                  <p className="text-gray-400 text-sm">Small</p>
                </div>

                <div className="space-y-4 text-center">
                  <GradientSpinner size="md" />
                  <p className="text-gray-400 text-sm">Medium</p>
                </div>

                <div className="space-y-4 text-center">
                  <GradientSpinner size="lg" />
                  <p className="text-gray-400 text-sm">Large</p>
                </div>

                <div className="space-y-4 text-center">
                  <GradientSpinner size="xl" />
                  <p className="text-gray-400 text-sm">Extra Large</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Counter Animations */}
          <ScrollReveal>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-white mb-8">Counter Animations</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                  <div className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    <CounterAnimation value={500} suffix="+" />
                  </div>
                  <p className="text-gray-400">Properties Sold</p>
                </div>

                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                  <div className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    <CounterAnimation value={98} suffix="%" decimals={0} />
                  </div>
                  <p className="text-gray-400">Customer Satisfaction</p>
                </div>

                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                  <div className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    <CounterAnimation value={15} suffix="+" />
                  </div>
                  <p className="text-gray-400">Years Experience</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card Hover Effects */}
          <ScrollReveal>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-white mb-8">Card Hover Effects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i}
                    className="group relative"
                  >
                    {/* Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-0 group-hover:opacity-75 blur-xl transition-all duration-500" />
                    
                    {/* Card */}
                    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                        <span className="text-2xl">✨</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Card {i}</h3>
                      <p className="text-gray-400">Hover to see lift effect with enhanced shadow and glow</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
};

export default MicroInteractionsDemo;

