import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import StaggerContainer, { staggerItemVariants } from '../components/StaggerContainer';

const About = () => {
  const teamMembers = [
    {
      name: 'Michael Anderson',
      role: 'Chief Executive Officer',
      description: 'Visionary leader with 25+ years in luxury real estate. Drives strategic growth and innovation across all markets.',
      image: 'https://ui-avatars.com/api/?name=Michael+Anderson&size=400&background=6366f1&color=fff&bold=true',
      linkedin: '#',
    },
    {
      name: 'Sarah Mitchell',
      role: 'Chief Operating Officer',
      description: 'Operations expert ensuring seamless service delivery. Optimizes processes and maintains excellence standards.',
      image: 'https://ui-avatars.com/api/?name=Sarah+Mitchell&size=400&background=8b5cf6&color=fff&bold=true',
      linkedin: '#',
    },
    {
      name: 'David Chen',
      role: 'Chief Technology Officer',
      description: 'Tech innovator revolutionizing real estate with cutting-edge digital solutions and AI-powered insights.',
      image: 'https://ui-avatars.com/api/?name=David+Chen&size=400&background=6366f1&color=fff&bold=true',
      linkedin: '#',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Sales',
      description: 'Sales strategist with proven track record. Leads high-performing team delivering exceptional client results.',
      image: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&size=400&background=8b5cf6&color=fff&bold=true',
      linkedin: '#',
    },
    {
      name: 'James Wilson',
      role: 'Head of Operations',
      description: 'Operations specialist coordinating all property transactions. Ensures efficiency and customer satisfaction.',
      image: 'https://ui-avatars.com/api/?name=James+Wilson&size=400&background=6366f1&color=fff&bold=true',
      linkedin: '#',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-dark-bg to-dark-surface overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px] opacity-20" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                  About Prime Properties
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Redefining luxury real estate with innovation, integrity, and exceptional service
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Description Section */}
      <section className="py-20 bg-dark-surface">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 md:p-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Who We Are
                </span>
              </h2>
              
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Welcome to <span className="text-white font-semibold">Prime Properties</span>, your premier destination for luxury real estate. 
                  With over 20 years of experience in the industry, we specialize in connecting 
                  discerning clients with their dream properties across prime locations worldwide.
                </p>
                <p>
                  Our team of expert real estate professionals is dedicated to providing 
                  exceptional service, market insights, and personalized guidance throughout 
                  your property journey. We leverage cutting-edge technology and deep market 
                  knowledge to ensure every transaction is seamless and successful.
                </p>
                <p>
                  Whether you're buying, selling, or investing, Prime Properties offers an 
                  extensive portfolio of premium listings and the expertise to make your 
                  real estate goals a reality. Trust, transparency, and excellence are at 
                  the heart of everything we do.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To deliver unparalleled real estate experiences through integrity, 
                innovation, and personalized service that exceeds expectations.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-secondary/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-secondary">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                To be the most trusted name in luxury real estate, recognized globally for 
                excellence, innovation, and unwavering client satisfaction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-dark-bg relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary to-secondary rounded-full blur-[150px]" />
        </div>

        <div className="container-custom relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  Meet Our Team
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Experienced professionals dedicated to making your real estate dreams come true
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={staggerItemVariants}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-3xl opacity-0 group-hover:opacity-75 blur-xl transition-all duration-500" />
                
                {/* Card */}
                <div className="relative backdrop-blur-xl bg-dark-surface/80 border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-300 h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative mb-6 mx-auto">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-105">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Gradient Ring Effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300" />
                  </div>

                  {/* Content */}
                  <div className="text-center flex-grow">
                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                      {member.name}
                    </h3>
                    <p className="text-primary font-semibold mb-4 text-sm uppercase tracking-wider">
                      {member.role}
                    </p>
                    <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                      {member.description}
                    </p>
                  </div>

                  {/* LinkedIn Link */}
                  <div className="flex justify-center">
                    <motion.a
                      href={member.linkedin}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg hover:shadow-primary/50 transition-all duration-300 group/link"
                    >
                      <Linkedin className="w-6 h-6 text-white" />
                    </motion.a>
                  </div>

                  {/* Corner Decorations */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark-surface">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '20+', label: 'Years Experience' },
              { value: '1000+', label: 'Happy Clients' },
              { value: '500+', label: 'Properties Sold' },
              { value: '$2B+', label: 'Total Sales' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
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
      </div>
    </PageTransition>
  );
};

export default About;

