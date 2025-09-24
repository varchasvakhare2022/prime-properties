# Google OAuth 400 Error Troubleshooting Guide

## 🚨 **Google 400 Bad Request Error**

The Google 400 error you're seeing typically occurs due to incorrect OAuth configuration. Here's how to fix it:

## 🔧 **Step 1: Check Google Cloud Console Configuration**

### 1.1 **Verify OAuth 2.0 Client ID**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Find your OAuth 2.0 Client ID
4. Click on it to edit

### 1.2 **Configure Authorized JavaScript Origins**
Add these URLs to **Authorized JavaScript origins**:
```
https://prime-properties.up.railway.app
http://localhost:3000
http://localhost:5173
```

### 1.3 **Configure Authorized Redirect URIs**
Add these URLs to **Authorized redirect URIs**:
```
https://prime-properties.up.railway.app/auth/google/callback
http://localhost:3000/auth/google/callback
http://localhost:5173/auth/google/callback
```

## 🔧 **Step 2: Environment Variables Setup**

### 2.1 **Frontend Environment Variables**
Create a `.env` file in your frontend directory:
```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-actual-google-client-id
NEXT_PUBLIC_API_URL=https://prime-properties-production-d021.up.railway.app
```

### 2.2 **Backend Environment Variables (Railway)**
Set these in your Railway backend environment:
```bash
GOOGLE_CLIENT_ID=your-actual-google-client-id
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret
JWT_SECRET=your-strong-jwt-secret
FRONTEND_URL=https://prime-properties.up.railway.app
JWT_EXPIRATION=86400000
```

## 🔧 **Step 3: OAuth Consent Screen Configuration**

### 3.1 **Configure OAuth Consent Screen**
1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** user type
3. Fill in required fields:
   - **App name**: Prime Properties
   - **User support email**: your-email@example.com
   - **Developer contact information**: your-email@example.com

### 3.2 **Add Scopes**
Add these scopes:
- `../auth/userinfo.email`
- `../auth/userinfo.profile`
- `openid`

## 🔧 **Step 4: Test Configuration**

### 4.1 **Check Frontend Console**
1. Open browser developer tools
2. Go to Console tab
3. Look for these logs:
   ```
   Initializing Google Sign-In with Client ID: your-client-id
   Current domain: https://prime-properties.up.railway.app
   Google Sign-In button rendered successfully
   ```

### 4.2 **Check Backend Logs**
Look for these logs in Railway backend:
```
=== Google ID Token Verification ===
🔍 Received Google ID token: eyJhbGciOiJSUzI1NiIs...
🔍 Extracted user info - ID: google_1234567890, Email: user@example.com
✅ Created new Google user: user@example.com
🎫 JWT token generated for user: user@example.com
```

## 🚨 **Common Issues & Solutions**

### Issue 1: "Invalid Client ID"
**Solution**: 
- Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set correctly
- Check that the Client ID matches exactly in Google Cloud Console

### Issue 2: "Invalid Redirect URI"
**Solution**:
- Ensure redirect URI in Google Cloud Console matches your frontend URL
- Check that `FRONTEND_URL` environment variable is set correctly

### Issue 3: "OAuth consent screen not configured"
**Solution**:
- Complete OAuth consent screen setup in Google Cloud Console
- Add required scopes and user information

### Issue 4: "Domain not authorized"
**Solution**:
- Add your domain to Authorized JavaScript origins
- Ensure HTTPS is used for production domains

## 🔧 **Step 5: Debug Mode**

### 5.1 **Enable Debug Logging**
The updated GoogleSignIn component now includes:
- Client ID validation
- Domain logging
- Error display
- Loading states

### 5.2 **Check Network Tab**
1. Open browser developer tools
2. Go to Network tab
3. Try Google Sign-In
4. Look for failed requests to `accounts.google.com`

## 🎯 **Quick Fix Checklist**

- [ ] Google Client ID is correctly set in environment variables
- [ ] Authorized JavaScript origins include your frontend URL
- [ ] Authorized redirect URIs include your callback URL
- [ ] OAuth consent screen is configured
- [ ] Required scopes are added
- [ ] Environment variables are properly set in Railway
- [ ] Frontend is using HTTPS in production

## 🚀 **Testing Steps**

1. **Clear browser cache** and cookies
2. **Restart your frontend** application
3. **Check Railway backend logs** for any startup errors
4. **Try Google Sign-In** and check console for errors
5. **Verify JWT token** is received and stored

## 📞 **Still Having Issues?**

If you're still getting the 400 error:

1. **Double-check** all URLs match exactly (no trailing slashes, correct protocol)
2. **Verify** the Google Client ID is copied correctly (no extra spaces)
3. **Check** that your Google Cloud Console project is active
4. **Ensure** billing is enabled if required for OAuth

The most common cause is a mismatch between the configured redirect URI in Google Cloud Console and the actual frontend URL.
