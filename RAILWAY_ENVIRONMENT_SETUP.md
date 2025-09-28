# Railway Environment Variables Setup Guide

## 🚨 **Critical Fix: Environment Variables for Create React App**

Your frontend is using **Create React App (CRA)**, not Next.js. In CRA, environment variables must use the `REACT_APP_` prefix, not `NEXT_PUBLIC_`.

## 🔧 **Step 1: Update Railway Environment Variables**

### **Frontend Environment Variables (Railway)**
Set these in your Railway frontend service:

```bash
REACT_APP_GOOGLE_CLIENT_ID=your-actual-google-client-id
REACT_APP_API_URL=https://prime-properties-production-d021.up.railway.app
```

### **Backend Environment Variables (Railway)**
Set these in your Railway backend service:

```bash
GOOGLE_CLIENT_ID=your-actual-google-client-id
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret
JWT_SECRET=your-strong-jwt-secret
FRONTEND_URL=https://prime-properties.up.railway.app
JWT_EXPIRATION=86400000
```

## 🔧 **Step 2: Google Cloud Console Configuration**

### **2.1 Update OAuth 2.0 Client ID Settings**

Go to [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services** → **Credentials**:

**Authorized JavaScript origins:**
```
https://prime-properties.up.railway.app
```

**Authorized redirect URIs:**
```
https://prime-properties.up.railway.app/auth/google/callback
```

### **2.2 OAuth Consent Screen**
Ensure your OAuth consent screen is configured:
- **Application type**: External
- **App name**: Prime Properties
- **User support email**: your-email@example.com
- **Scopes**: `email`, `profile`, `openid`

## 🔧 **Step 3: Local Development Setup**

### **3.1 Create .env file in frontend directory**
```bash
# frontend/.env
REACT_APP_GOOGLE_CLIENT_ID=your-actual-google-client-id
REACT_APP_API_URL=https://prime-properties-production-d021.up.railway.app
```

### **3.2 Restart Development Server**
```bash
cd frontend
npm start
```

## 🔍 **Step 4: Debug Environment Variables**

The updated GoogleSignIn component now includes comprehensive debugging:

### **4.1 Check Browser Console**
Open browser developer tools → Console tab and look for:

```
=== Google Sign-In Debug Info ===
REACT_APP_GOOGLE_CLIENT_ID: your-actual-client-id
REACT_APP_API_URL: https://prime-properties-production-d021.up.railway.app
Current domain: https://prime-properties.up.railway.app
All environment variables: {REACT_APP_GOOGLE_CLIENT_ID: "...", ...}
================================
✅ Google Sign-In button rendered successfully
```

### **4.2 Common Issues & Solutions**

| Issue | Solution |
|-------|----------|
| **"Google Client ID not configured"** | Set `REACT_APP_GOOGLE_CLIENT_ID` in Railway environment variables |
| **Environment variables show as undefined** | Restart Railway service after setting environment variables |
| **Google 400 error** | Verify redirect URI matches exactly in Google Cloud Console |
| **CORS errors** | Ensure `FRONTEND_URL` is set correctly in backend |

## 🚀 **Step 5: Railway Deployment Process**

### **5.1 Set Environment Variables in Railway**
1. Go to your Railway dashboard
2. Select your frontend service
3. Go to **Variables** tab
4. Add the environment variables listed above
5. **Redeploy** the service

### **5.2 Verify Deployment**
1. Check Railway logs for any build errors
2. Open your frontend URL: `https://prime-properties.up.railway.app`
3. Open browser console and check debug logs
4. Try Google Sign-In

## 🔧 **Step 6: Troubleshooting**

### **6.1 Environment Variables Not Loading**
- **Cause**: Railway service not restarted after setting variables
- **Solution**: Redeploy the service or restart it manually

### **6.2 Google Sign-In Button Not Appearing**
- **Cause**: Invalid Client ID or Google API not loaded
- **Solution**: Check console logs and verify Client ID

### **6.3 400 Bad Request Error**
- **Cause**: Mismatch between configured and actual redirect URI
- **Solution**: Update Google Cloud Console with exact Railway URL

## 📋 **Quick Checklist**

- [ ] Set `REACT_APP_GOOGLE_CLIENT_ID` in Railway frontend environment
- [ ] Set `REACT_APP_API_URL` in Railway frontend environment
- [ ] Set backend environment variables in Railway backend service
- [ ] Update Google Cloud Console with correct URLs
- [ ] Redeploy both frontend and backend services
- [ ] Check browser console for debug logs
- [ ] Test Google Sign-In functionality

## 🎯 **Expected Result**

After following these steps:
1. **Environment variables** will load correctly in the browser
2. **Google Sign-In button** will appear and function properly
3. **Debug logs** will show the correct Client ID and API URL
4. **Authentication flow** will work end-to-end

## 🚨 **Important Notes**

- **Create React App** uses `REACT_APP_` prefix, not `NEXT_PUBLIC_`
- **Environment variables** must be set in Railway dashboard, not just locally
- **Google Cloud Console** URLs must match your Railway deployment exactly
- **Service restart** is required after setting environment variables

The debug logs will help you identify exactly what's missing or misconfigured!
