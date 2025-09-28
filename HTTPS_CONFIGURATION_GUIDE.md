# HTTPS Configuration Guide for Railway Deployment

## 🔒 **Complete HTTPS Enforcement Setup**

This guide ensures all API calls, WebSocket connections, and OAuth redirects use HTTPS to prevent mixed content errors when your frontend is loaded over HTTPS.

## 🚨 **Mixed Content Error Prevention**

### **What is Mixed Content?**
Mixed content occurs when an HTTPS page loads resources over HTTP. Modern browsers block this for security reasons.

### **Common Mixed Content Errors:**
- `Mixed Content: The page at 'https://...' was loaded over HTTPS, but requested an insecure resource 'http://...'`
- `Blocked loading mixed active content`
- `Cross-Origin-Opener-Policy` errors

## 🔧 **Frontend HTTPS Configuration**

### **1. Railway Environment Variables**
Set these directly in your Railway dashboard (no local .env files needed):

**Frontend Service Environment Variables:**
```bash
REACT_APP_API_URL=https://prime-properties-production-d021.up.railway.app
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
NODE_ENV=production
```

**Backend Service Environment Variables:**
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
JWT_SECRET=your-strong-jwt-secret-min-32-chars
FRONTEND_URL=https://prime-properties.up.railway.app
JWT_EXPIRATION=86400000
DATABASE_URL=postgresql://... (auto-provided by Railway)
```

### **2. Package.json Proxy**
```json
{
  "proxy": "https://prime-properties-production-d021.up.railway.app"
}
```

### **3. Service Configuration**

#### **AuthService (authService.js)**
```javascript
// ENFORCE HTTPS to prevent mixed content errors
let API_BASE_URL = process.env.REACT_APP_API_URL || 'https://prime-properties-production-d021.up.railway.app';

// Force HTTPS for all API calls
if (API_BASE_URL.startsWith('http://')) {
  console.warn('⚠️ Converting HTTP to HTTPS to prevent mixed content errors');
  API_BASE_URL = API_BASE_URL.replace('http://', 'https://');
}

console.log('🔒 AuthService using HTTPS API URL:', API_BASE_URL);
```

#### **PropertyService (propertyService.js)**
```javascript
// ENFORCE HTTPS to prevent mixed content errors
let API_BASE_URL = process.env.REACT_APP_API_URL || 'https://prime-properties-production-d021.up.railway.app';

// Force HTTPS for all API calls
if (API_BASE_URL.startsWith('http://')) {
  console.warn('⚠️ Converting HTTP to HTTPS to prevent mixed content errors');
  API_BASE_URL = API_BASE_URL.replace('http://', 'https://');
}

console.log('🔒 PropertyService using HTTPS API URL:', API_BASE_URL);
```

#### **GoogleSignIn Component**
```javascript
// ENFORCE HTTPS to prevent mixed content errors
const apiUrl = process.env.REACT_APP_API_URL || 'https://prime-properties-production-d021.up.railway.app';

// Force HTTPS for all API calls
let secureApiUrl = apiUrl;
if (apiUrl.startsWith('http://')) {
  console.warn('⚠️ Converting HTTP to HTTPS to prevent mixed content errors');
  secureApiUrl = apiUrl.replace('http://', 'https://');
}

console.log('🔒 GoogleSignIn using HTTPS API URL:', secureApiUrl);
```

#### **WebSocket Service**
```javascript
// Force HTTPS for WebSocket connections
let secureApiUrl = apiUrl;
if (apiUrl.startsWith('http://')) {
  console.warn('⚠️ Converting HTTP to HTTPS for WebSocket to prevent mixed content errors');
  secureApiUrl = apiUrl.replace('http://', 'https://');
}

const wssUrl = `wss://${secureApiUrl.replace(/^https?:\/\//, '')}/ws`;
console.log('🔒 WebSocket using HTTPS URL:', wssUrl);
```

## 🔧 **Backend HTTPS Configuration**

### **1. Environment Variables (Railway Backend)**
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
JWT_SECRET=your-strong-jwt-secret
FRONTEND_URL=https://prime-properties.up.railway.app
JWT_EXPIRATION=86400000
```

### **2. CORS Configuration**
```java
configuration.setAllowedOrigins(Arrays.asList(
    "https://prime-properties.up.railway.app",
    "http://localhost:3000", // Keep for local dev
    "http://localhost:5173"  // Keep for local dev
));
```

### **3. Security Headers**
```properties
# Security Headers for OAuth
server.servlet.session.cookie.same-site=none
server.servlet.session.cookie.secure=true
```

## 🔧 **Google OAuth HTTPS Configuration**

### **Google Cloud Console Settings:**

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

## 🔍 **Debugging HTTPS Issues**

### **1. Browser Console Logs**
Look for these secure connection logs:

```javascript
🔒 AuthService using HTTPS API URL: https://prime-properties-production-d021.up.railway.app
🔒 PropertyService using HTTPS API URL: https://prime-properties-production-d021.up.railway.app
🔒 GoogleSignIn using HTTPS API URL: https://prime-properties-production-d021.up.railway.app
🔒 WebSocket using HTTPS URL: wss://prime-properties-production-d021.up.railway.app/ws
```

### **2. Network Tab Verification**
1. Open browser developer tools
2. Go to Network tab
3. Look for all requests to use `https://` protocol
4. No `http://` requests should be present

### **3. Mixed Content Warnings**
If you see warnings like:
```
⚠️ Converting HTTP to HTTPS to prevent mixed content errors
```
This means the system is automatically fixing HTTP URLs to HTTPS.

## 🚀 **Railway Deployment Steps**

### **Step 1: Set Environment Variables**
1. Go to Railway dashboard
2. Select your frontend service
3. Go to **Variables** tab
4. Add: `REACT_APP_API_URL=https://prime-properties-production-d021.up.railway.app`
5. Repeat for backend service

### **Step 2: Redeploy Services**
1. **Redeploy frontend** service
2. **Redeploy backend** service
3. Wait for deployment to complete

### **Step 3: Verify HTTPS**
1. Open `https://prime-properties.up.railway.app`
2. Check browser console for secure connection logs
3. Verify no mixed content errors
4. Test all functionality

## 🎯 **Expected Results**

After proper HTTPS configuration:

✅ **All API calls** use `https://prime-properties-production-d021.up.railway.app`
✅ **WebSocket connections** use `wss://prime-properties-production-d021.up.railway.app/ws`
✅ **Google OAuth** works without mixed content errors
✅ **No HTTP requests** in Network tab
✅ **Secure connection logs** in browser console

## 🚨 **Common Issues & Solutions**

### **Mixed Content Error:**
- **Cause**: API calls using HTTP instead of HTTPS
- **Solution**: All services now enforce HTTPS automatically

### **WebSocket Connection Failed:**
- **Cause**: Using `ws://` instead of `wss://`
- **Solution**: WebSocket service automatically uses WSS

### **OAuth Redirect Error:**
- **Cause**: HTTP redirect URI in Google Console
- **Solution**: Use HTTPS redirect URI in Google Console

### **CORS Errors:**
- **Cause**: Backend not configured for HTTPS frontend
- **Solution**: Backend CORS includes HTTPS frontend domain

## 📋 **Final Checklist**

- [ ] Frontend environment variables use HTTPS
- [ ] Backend environment variables configured
- [ ] Google Cloud Console uses HTTPS URLs
- [ ] All services enforce HTTPS automatically
- [ ] WebSocket uses WSS protocol
- [ ] No HTTP requests in Network tab
- [ ] Secure connection logs in console
- [ ] All functionality works over HTTPS

Your Railway deployment will now work perfectly with HTTPS and prevent all mixed content errors! 🔒🚀
