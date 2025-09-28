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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL || 'https://prime-properties-production-d021.up.railway.app';
    return this.enforceHTTPS(apiUrl);
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
