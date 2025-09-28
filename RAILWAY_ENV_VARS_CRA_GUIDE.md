# 🚀 Railway Environment Variables - Create React App (CRA)

## ✅ **Correct Environment Variables for Create React App**

Your project uses **Create React App (CRA)**, not Next.js. Here are the correct environment variables to set in Railway:

---

## 🔧 **Frontend Service Environment Variables**

Set these in your Railway **Frontend Service** dashboard:

```bash
# ✅ CORRECT for Create React App
REACT_APP_API_URL=https://prime-properties-production-d021.up.railway.app
REACT_APP_GOOGLE_CLIENT_ID=your-actual-google-client-id
NODE_ENV=production

# ❌ WRONG - These are for Next.js, not CRA
NEXT_PUBLIC_API_URL=https://prime-properties-production-d021.up.railway.app
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-actual-google-client-id
NEXTAUTH_URL=https://prime-properties.up.railway.app
```

---

## 🔧 **Backend Service Environment Variables**

Set these in your Railway **Backend Service** dashboard:

```bash
# ✅ CORRECT for Spring Boot
GOOGLE_CLIENT_ID=your-actual-google-client-id
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret
JWT_SECRET=your-strong-jwt-secret-min-32-chars
FRONTEND_URL=https://prime-properties.up.railway.app
JWT_EXPIRATION=86400000
DATABASE_URL=postgresql://... (auto-provided by Railway)
```

---

## 🚨 **Critical Differences: CRA vs Next.js**

| Aspect | Create React App | Next.js |
|--------|------------------|---------|
| **Environment Variables** | `REACT_APP_*` | `NEXT_PUBLIC_*` |
| **Config File** | `package.json` | `next.config.js` |
| **Headers Configuration** | ❌ Not supported | ✅ `async headers()` |
| **Build Command** | `react-scripts build` | `next build` |
| **Proxy Configuration** | In `package.json` | In `next.config.js` |

---

## 🔍 **Why No `next.config.js`?**

**Create React App does NOT support:**
- ❌ `next.config.js` files
- ❌ `async headers()` functions
- ❌ `NEXT_PUBLIC_*` environment variables
- ❌ Server-side header configuration

**Instead, CRA uses:**
- ✅ `package.json` for configuration
- ✅ `REACT_APP_*` environment variables
- ✅ Backend for header configuration (which we've done)

---

## 🎯 **Mixed Content Error Fix**

The Mixed Content error is fixed by:

1. **Setting correct environment variables:**
   ```bash
   REACT_APP_API_URL=https://prime-properties-production-d021.up.railway.app
   ```

2. **HTTPS enforcement in code:**
   ```javascript
   // Already implemented in httpsEnforcer.js
   const API_BASE_URL = HTTPSEnforcer.getSecureAPIUrl();
   ```

---

## 🎯 **COOP Error Fix**

The Cross-Origin-Opener-Policy error is fixed by:

1. **Backend interceptor** (already implemented):
   ```java
   // HttpHeadersConfig.java
   response.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
   ```

2. **NOT by frontend configuration** (CRA doesn't support this)

---

## 📋 **Step-by-Step Railway Setup**

### **1. Frontend Service:**
1. Go to Railway dashboard
2. Select your Frontend service
3. Go to Variables tab
4. Add these variables:
   ```
   REACT_APP_API_URL=https://prime-properties-production-d021.up.railway.app
   REACT_APP_GOOGLE_CLIENT_ID=your-actual-google-client-id
   NODE_ENV=production
   ```

### **2. Backend Service:**
1. Go to Railway dashboard
2. Select your Backend service
3. Go to Variables tab
4. Add these variables:
   ```
   GOOGLE_CLIENT_ID=your-actual-google-client-id
   GOOGLE_CLIENT_SECRET=your-actual-google-client-secret
   JWT_SECRET=your-strong-jwt-secret-min-32-chars
   FRONTEND_URL=https://prime-properties.up.railway.app
   ```

---

## 🚀 **Expected Results**

After setting the correct environment variables:

✅ **Mixed Content Error**: Fixed by HTTPS enforcement
✅ **COOP Error**: Fixed by backend interceptor
✅ **Google Sign-In**: Works with real user data
✅ **Build Success**: No more silent failures
✅ **Environment Variables**: Correctly read by CRA

---

## 🔍 **Debugging Commands**

To verify environment variables are working:

```javascript
// Check in browser console
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
console.log('REACT_APP_GOOGLE_CLIENT_ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID);
console.log('NODE_ENV:', process.env.NODE_ENV);
```

---

## 🎉 **Summary**

**Key Points:**
1. **Use `REACT_APP_*`** not `NEXT_PUBLIC_*`
2. **No `next.config.js`** needed (CRA doesn't support it)
3. **COOP headers** handled by backend interceptor
4. **Mixed Content** fixed by HTTPS enforcement
5. **Environment variables** set in Railway dashboard

**Result**: Both Mixed Content and COOP errors will be resolved! 🚀
