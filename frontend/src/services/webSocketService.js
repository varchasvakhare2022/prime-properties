// WebSocket service for real-time communication
// Handles connection to Railway backend without :8080 port

class WebSocketService {
  constructor() {
    this.socket = null;
    this.stompClient = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  // Get WebSocket URL for Railway deployment
  getWebSocketUrl() {
    // Use NEXT_PUBLIC_API_URL if available, otherwise build from current origin
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL;
    
    if (apiUrl) {
      // Use provided API URL and convert to WebSocket
      let secureApiUrl = apiUrl;
      
      // Force HTTPS and remove any port numbers
      if (secureApiUrl.startsWith('http://')) {
        console.warn('⚠️ Converting HTTP to HTTPS for WebSocket to prevent mixed content errors');
        secureApiUrl = secureApiUrl.replace('http://', 'https://');
      }
      
      // Ensure HTTPS protocol
      if (!secureApiUrl.startsWith('https://')) {
        console.warn('⚠️ Forcing HTTPS protocol for WebSocket');
        secureApiUrl = 'https://' + secureApiUrl.replace(/^https?:\/\//, '');
      }
      
      // Remove any port numbers from the URL (Railway doesn't use :8080)
      const cleanUrl = secureApiUrl.replace(/:\d+/, '');
      const wsUrl = cleanUrl.replace(/^https?:\/\//, '');
      const wssUrl = `wss://${wsUrl}/ws`;
      
      console.log('🔒 WebSocket using API URL:', wssUrl);
      return wssUrl;
    } else {
      // Build WebSocket URL dynamically from current origin
      const origin = window.location.origin;
      const wsUrl = origin.replace(/^https?:\/\//, '');
      const protocol = origin.startsWith('https://') ? 'wss://' : 'ws://';
      const wssUrl = `${protocol}${wsUrl}/ws`;
      
      console.log('🔒 WebSocket using dynamic origin:', wssUrl);
      return wssUrl;
    }
  }

  // Connect to WebSocket
  connect() {
    try {
      const wsUrl = this.getWebSocketUrl();
      console.log('🔌 Connecting to WebSocket:', wsUrl);
      
      // Use SockJS for fallback support
      const socket = new SockJS(wsUrl);
      this.stompClient = Stomp.over(socket);
      
      // Disable debug logging in production
      const nodeEnv = process.env.NODE_ENV || 'production';
      this.stompClient.debug = (str) => {
        if (nodeEnv === 'development') {
          console.log('WebSocket Debug:', str);
        }
      };

      this.stompClient.connect(
        {},
        (frame) => {
          console.log('✅ WebSocket connected:', frame);
          this.isConnected = true;
          this.reconnectAttempts = 0;
          this.onConnected();
        },
        (error) => {
          console.error('❌ WebSocket connection error:', error);
          this.isConnected = false;
          this.onDisconnected();
          this.attemptReconnect();
        }
      );
    } catch (error) {
      console.error('❌ WebSocket initialization error:', error);
      this.attemptReconnect();
    }
  }

  // Handle successful connection
  onConnected() {
    // Subscribe to topics or perform initial setup
    console.log('🎉 WebSocket service ready');
  }

  // Handle disconnection
  onDisconnected() {
    console.log('🔌 WebSocket disconnected');
    this.isConnected = false;
  }

  // Attempt to reconnect
  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.pow(2, this.reconnectAttempts) * 1000; // Exponential backoff
      
      console.log(`🔄 Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms`);
      
      setTimeout(() => {
        this.connect();
      }, delay);
    } else {
      console.error('❌ Max reconnection attempts reached');
    }
  }

  // Subscribe to a topic
  subscribe(topic, callback) {
    if (this.isConnected && this.stompClient) {
      this.stompClient.subscribe(topic, callback);
      console.log(`📡 Subscribed to topic: ${topic}`);
    } else {
      console.warn('⚠️ WebSocket not connected, cannot subscribe to:', topic);
    }
  }

  // Send message to a destination
  send(destination, body, headers = {}) {
    if (this.isConnected && this.stompClient) {
      this.stompClient.send(destination, headers, JSON.stringify(body));
      console.log(`📤 Sent message to ${destination}:`, body);
    } else {
      console.warn('⚠️ WebSocket not connected, cannot send message to:', destination);
    }
  }

  // Disconnect WebSocket
  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
      console.log('🔌 WebSocket disconnected manually');
    }
    this.isConnected = false;
  }

  // Get connection status
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      maxReconnectAttempts: this.maxReconnectAttempts
    };
  }
}

// Export singleton instance
const webSocketService = new WebSocketService();
export default webSocketService;
