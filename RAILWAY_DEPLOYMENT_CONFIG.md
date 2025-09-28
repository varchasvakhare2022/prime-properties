# Railway Deployment Configuration Guide

## 🚀 **Complete Railway Setup for Google OAuth + WebSocket**

This guide ensures your Railway deployment works correctly with Google OAuth and WebSocket connections.

## 🔧 **1. Railway Environment Variables**

### **Frontend Service Environment Variables:**
```bash
REACT_APP_GOOGLE_CLIENT_ID=your-actual-google-client-id
REACT_APP_API_URL=https://prime-properties-production-d021.up.railway.app
NODE_ENV=production
```

### **Backend Service Environment Variables:**
```bash
GOOGLE_CLIENT_ID=your-actual-google-client-id
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret
JWT_SECRET=your-strong-jwt-secret-min-32-chars
FRONTEND_URL=https://prime-properties.up.railway.app
JWT_EXPIRATION=86400000
DATABASE_URL=postgresql://... (auto-provided by Railway)
```

## 🔧 **2. Google Cloud Console Configuration**

### **OAuth 2.0 Client ID Settings:**

**Authorized JavaScript origins:**
```
https://prime-properties.up.railway.app
```

**Authorized redirect URIs:**
```
https://prime-properties.up.railway.app/api/auth/callback/google
```

### **OAuth Consent Screen:**
- **Application type**: External
- **App name**: Prime Properties
- **User support email**: your-email@example.com
- **Scopes**: `email`, `profile`, `openid`

## 🔧 **3. Cross-Origin-Opener-Policy Fix**

### **Backend Configuration:**
The backend now includes proper CORS headers to prevent COOP errors:

```properties
# Security Headers for OAuth
server.servlet.session.cookie.same-site=none
server.servlet.session.cookie.secure=true
```

### **CORS Headers:**
```java
configuration.setAllowedHeaders(Arrays.asList(
    "Authorization", 
    "Content-Type", 
    "X-Requested-With",
    "Accept",
    "Origin",
    "Cross-Origin-Opener-Policy",
    "Cross-Origin-Embedder-Policy"
));
```

## 🔧 **4. WebSocket Configuration**

### **Backend WebSocket Config:**
```java
registry.addEndpoint("/ws")
    .setAllowedOrigins(
        "https://prime-properties.up.railway.app",
        "http://localhost:3000",
        "http://localhost:5173"
    )
    .withSockJS();
```

### **Frontend WebSocket Service:**
- **WebSocket URL**: `wss://prime-properties-production-d021.up.railway.app/ws`
- **No port number**: Railway apps expose only ports 443/80
- **SockJS fallback**: Automatic fallback for connection issues

## 🔧 **5. Google Sign-In Button Configuration**

### **Fixed Button Width:**
```javascript
window.google.accounts.id.renderButton(googleButtonRef.current, {
    theme: 'outline',
    size: 'large',
    width: 240, // Fixed width instead of '100%'
    text: 'signin_with',
    shape: 'rectangular',
    logo_alignment: 'left'
});
```

## 🔧 **6. Railway Deployment Steps**

### **Step 1: Set Environment Variables**
1. Go to Railway dashboard
2. Select your frontend service
3. Go to **Variables** tab
4. Add frontend environment variables
5. Repeat for backend service

### **Step 2: Redeploy Services**
1. **Redeploy frontend** service
2. **Redeploy backend** service
3. Wait for deployment to complete

### **Step 3: Verify Configuration**
1. Check Railway logs for any errors
2. Open `https://prime-properties.up.railway.app`
3. Open browser console and check debug logs
4. Test Google Sign-In functionality

## 🔍 **7. Debugging Checklist**

### **Frontend Debug Logs:**
```javascript
=== Google Sign-In Debug Info ===
REACT_APP_GOOGLE_CLIENT_ID: 123456789-abcdefghijklmnop.apps.googleusercontent.com
REACT_APP_API_URL: https://prime-properties-production-d021.up.railway.app
Current domain: https://prime-properties.up.railway.app
✅ Google Sign-In button rendered successfully
```

### **WebSocket Debug Logs:**
```javascript
🔌 Connecting to WebSocket: wss://prime-properties-production-d021.up.railway.app/ws
✅ WebSocket connected: CONNECTED
🎉 WebSocket service ready
```

### **Backend Debug Logs:**
```
=== Google ID Token Verification ===
🔍 Received Google ID token: eyJhbGciOiJSUzI1NiIs...
✅ Created new Google user: user@example.com
🎫 JWT token generated for user: user@example.com
```

## 🚨 **8. Common Issues & Solutions**

### **Cross-Origin-Opener-Policy Error:**
- **Cause**: Missing CORS headers for COOP
- **Solution**: Backend now includes proper headers

### **WebSocket Connection Failed:**
- **Cause**: Using `:8080` port in WebSocket URL
- **Solution**: Use `wss://domain.com/ws` without port

### **Google Sign-In Button Not Appearing:**
- **Cause**: Invalid button width or Client ID
- **Solution**: Fixed width to 240px and proper Client ID

### **OAuth Redirect URI Mismatch:**
- **Cause**: Wrong redirect URI in Google Console
- **Solution**: Use `/api/auth/callback/google` path

## 🎯 **9. Expected Results**

After proper configuration:

✅ **Google Sign-In**: Button appears and works without COOP errors
✅ **WebSocket**: Connects to `wss://prime-properties-production-d021.up.railway.app/ws`
✅ **OAuth Flow**: Complete authentication flow works end-to-end
✅ **CORS**: No cross-origin errors in browser console
✅ **Production Ready**: All services work correctly on Railway

## 📋 **10. Final Verification**

1. **Open** `https://prime-properties.up.railway.app`
2. **Check console** for debug logs
3. **Click** "Sign in with Google"
4. **Complete** Google authentication
5. **Verify** redirect to customer dashboard
6. **Test** WebSocket connection (if used)

The application should now work perfectly with Google OAuth and WebSocket connections on Railway! 🚀
