// HTTPS Enforcement Utility
// Ensures all API calls use HTTPS to prevent mixed content errors

class HTTPSEnforcer {
  static enforceHTTPS(url) {
    if (!url) {
      return 'https://prime-properties-production-d021.up.railway.app';
    }

    // Convert HTTP to HTTPS
    if (url.startsWith('http://')) {
      console.warn('⚠️ Converting HTTP to HTTPS to prevent mixed content errors:', url);
      return url.replace('http://', 'https://');
    }

    // Ensure HTTPS protocol
    if (!url.startsWith('https://')) {
      console.warn('⚠️ Adding HTTPS protocol to prevent mixed content errors:', url);
      return `https://${url}`;
    }

    return url;
  }

  static getSecureAPIUrl() {
    // Get API URL from environment variables
    let apiUrl = process.env.REACT_APP_API_URL || 'https://prime-properties-production-d021.up.railway.app';
    
    console.log('🔍 HttpsEnforcer - Original API URL from env:', apiUrl);
    console.log('🔍 HttpsEnforcer - REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
    console.log('🔍 HttpsEnforcer - NODE_ENV:', process.env.NODE_ENV);
    console.log('🔍 HttpsEnforcer - All env vars:', Object.keys(process.env).filter(key => key.includes('API') || key.includes('URL')));
    
    // Force HTTPS for all API calls to prevent mixed content errors
    if (apiUrl.includes('railway.internal') || apiUrl.includes('internal') || !apiUrl.startsWith('https://')) {
      console.warn('⚠️ HttpsEnforcer - Overriding API URL to HTTPS Railway URL');
      apiUrl = 'https://prime-properties-production-d021.up.railway.app';
    }
    
    // Additional HTTPS enforcement
    apiUrl = this.enforceHTTPS(apiUrl);
    
    // Final validation - ensure HTTPS
    if (!apiUrl.startsWith('https://')) {
      console.error('❌ HttpsEnforcer - CRITICAL: API URL is not HTTPS, forcing HTTPS');
      apiUrl = 'https://prime-properties-production-d021.up.railway.app';
    }
    
    // EMERGENCY FALLBACK: Use window.location.origin if still not HTTPS
    if (typeof window !== 'undefined' && window.location && window.location.origin.startsWith('https://')) {
      const originApiUrl = window.location.origin.replace('prime-properties.up.railway.app', 'prime-properties-production-d021.up.railway.app');
      if (originApiUrl.startsWith('https://')) {
        console.warn('🚨 EMERGENCY FALLBACK: Using window.location.origin for API URL:', originApiUrl);
        apiUrl = originApiUrl;
      }
    }
    
    console.log('🔒 HttpsEnforcer using HTTPS API URL:', apiUrl);
    return apiUrl;
  }

  static getSecureWebSocketUrl() {
    const apiUrl = this.getSecureAPIUrl();
    const wsUrl = apiUrl.replace(/^https?:\/\//, '');
    return `wss://${wsUrl}/ws`;
  }

  static validateHTTPS(url) {
    if (!url.startsWith('https://')) {
      throw new Error(`Mixed content error: URL must use HTTPS protocol. Got: ${url}`);
    }
    return true;
  }

  static logSecureConnection(service, url) {
    console.log(`🔒 ${service} using secure HTTPS connection:`, url);
  }
}

export default HTTPSEnforcer;
