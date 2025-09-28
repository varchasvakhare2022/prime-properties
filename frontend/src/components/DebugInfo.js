// Debug component to identify Mixed Content and COOP issues
import React, { useEffect, useState } from 'react';
import HTTPSEnforcer from '../utils/httpsEnforcer';

const DebugInfo = () => {
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    const info = {
      // Environment Variables
      REACT_APP_API_URL: process.env.REACT_APP_API_URL,
      REACT_APP_GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      NODE_ENV: process.env.NODE_ENV,
      
      // HTTPS Enforcement
      secureApiUrl: HTTPSEnforcer.getSecureAPIUrl(),
      
      // Window Location
      windowOrigin: typeof window !== 'undefined' ? window.location.origin : 'N/A',
      windowProtocol: typeof window !== 'undefined' ? window.location.protocol : 'N/A',
      
      // All Environment Variables
      allEnvVars: Object.keys(process.env).filter(key => 
        key.includes('API') || key.includes('URL') || key.includes('GOOGLE')
      ),
      
      // Timestamp
      timestamp: new Date().toISOString()
    };
    
    setDebugInfo(info);
    
    // Log to console for debugging
    console.log('🔍 DEBUG INFO:', info);
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px', 
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px',
      borderRadius: '5px'
    }}>
      <h4>🔍 Debug Info</h4>
      <div>
        <strong>REACT_APP_API_URL:</strong><br/>
        {debugInfo.REACT_APP_API_URL || 'NOT SET'}
      </div>
      <div>
        <strong>Secure API URL:</strong><br/>
        {debugInfo.secureApiUrl || 'NOT SET'}
      </div>
      <div>
        <strong>Window Origin:</strong><br/>
        {debugInfo.windowOrigin}
      </div>
      <div>
        <strong>Protocol:</strong><br/>
        {debugInfo.windowProtocol}
      </div>
      <div>
        <strong>Environment Variables:</strong><br/>
        {debugInfo.allEnvVars?.join(', ') || 'NONE'}
      </div>
      <div>
        <strong>Timestamp:</strong><br/>
        {debugInfo.timestamp}
      </div>
    </div>
  );
};

export default DebugInfo;
