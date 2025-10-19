import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastProvider } from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';
import SuspenseFallback from './components/SuspenseFallback';

import './styles/index.css';

// Code splitting with React.lazy() - Pages loaded on demand
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Properties = lazy(() => import('./pages/Properties'));
const PropertyTemplate = lazy(() => import('./pages/properties/PropertyTemplate'));

// Individual Property Pages (lazy loaded for better performance)
const PROP001 = lazy(() => import('./pages/properties/PROP001'));
const PROP002 = lazy(() => import('./pages/properties/PROP002'));
const PROP003 = lazy(() => import('./pages/properties/PROP003'));
const PROP004 = lazy(() => import('./pages/properties/PROP004'));
const PROP005 = lazy(() => import('./pages/properties/PROP005'));
const PROP006 = lazy(() => import('./pages/properties/PROP006'));
const PROP007 = lazy(() => import('./pages/properties/PROP007'));
const PROP008 = lazy(() => import('./pages/properties/PROP008'));
const PROP009 = lazy(() => import('./pages/properties/PROP009'));
const PROP010 = lazy(() => import('./pages/properties/PROP010'));

/**
 * App Router Configuration
 * 
 * PROPERTY ROUTES STRUCTURE:
 * 
 * 1. Static Routes (Preferred for SEO):
 *    - /properties/PROP001, /properties/PROP002, etc.
 *    - Each property has its own dedicated route
 *    - Better for SEO, performance, and analytics
 *    - Allows for per-property customization (meta tags, tracking, etc.)
 * 
 * 2. Dynamic Route (Fallback):
 *    - /properties/:id
 *    - Catches any property ID not explicitly defined
 *    - Good for development and testing
 * 
 * HOW TO ADD NEW PROPERTY:
 * 1. Add property data to /src/data/properties.json (e.g., "PROP011")
 * 2. Copy /src/pages/properties/PROP001.jsx and rename to PROP011.jsx
 * 3. Update the propertyId prop in the new file
 * 4. Import the new component above (line ~25)
 * 5. Add a route below following the pattern
 */

// AnimatedRoutes component to handle page transitions
function AnimatedRoutes() {
  const location = useLocation();

  // Smooth scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<SuspenseFallback />}>
        <Routes location={location} key={location.pathname}>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/properties" element={<Properties />} />

          {/* Static Property Routes (SEO-optimized) */}
          {/* These routes take precedence over the dynamic route */}
          <Route path="/properties/PROP001" element={<PROP001 />} />
          <Route path="/properties/PROP002" element={<PROP002 />} />
          <Route path="/properties/PROP003" element={<PROP003 />} />
          <Route path="/properties/PROP004" element={<PROP004 />} />
          <Route path="/properties/PROP005" element={<PROP005 />} />
          <Route path="/properties/PROP006" element={<PROP006 />} />
          <Route path="/properties/PROP007" element={<PROP007 />} />
          <Route path="/properties/PROP008" element={<PROP008 />} />
          <Route path="/properties/PROP009" element={<PROP009 />} />
          <Route path="/properties/PROP010" element={<PROP010 />} />

          {/* Dynamic Property Route (Fallback for any other property IDs) */}
          <Route path="/properties/:id" element={<PropertyTemplate />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ToastProvider>
          <div className="min-h-screen bg-dark-bg text-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

