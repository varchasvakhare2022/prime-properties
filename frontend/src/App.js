import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import CustomerLogin from './pages/CustomerLogin';
import DeveloperLogin from './pages/DeveloperLogin';
import CustomerSignup from './pages/CustomerSignup';
import DeveloperSignup from './pages/DeveloperSignup';
import CustomerDashboard from './pages/CustomerDashboard';
import DeveloperDashboard from './pages/DeveloperDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/customer-login" element={<CustomerLogin />} />
            <Route path="/developer-login" element={<DeveloperLogin />} />
            <Route path="/customer-signup" element={<CustomerSignup />} />
            <Route path="/developer-signup" element={<DeveloperSignup />} />
            <Route 
              path="/customer/dashboard" 
              element={
                <ProtectedRoute role="CUSTOMER">
                  <CustomerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/developer/dashboard" 
              element={
                <ProtectedRoute role="DEVELOPER">
                  <DeveloperDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
