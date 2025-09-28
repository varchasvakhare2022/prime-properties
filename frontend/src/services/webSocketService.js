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
    const apiUrl = process.env.REACT_APP_API_URL || 'https://prime-properties-production-d021.up.railway.app';
    
    // Remove protocol and add WebSocket protocol
    const wsUrl = apiUrl.replace(/^https?:\/\//, '');
    
    // Railway apps expose only ports 443/80, so no :8080 needed
    return `wss://${wsUrl}/ws`;
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
      this.stompClient.debug = (str) => {
        if (process.env.NODE_ENV === 'development') {
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
