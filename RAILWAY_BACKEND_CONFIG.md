# Railway Backend Environment Variables Configuration

## 🚀 **Complete Railway Backend Setup**

This guide ensures your Spring Boot backend builds and runs correctly on Railway with all secrets from environment variables.

## 🔧 **Required Railway Environment Variables**

### **Database Configuration:**
```bash
DATABASE_URL=postgresql://username:password@host:port/database
# OR use individual components:
SPRING_DATASOURCE_URL=jdbc:postgresql://host:port/database
SPRING_DATASOURCE_USERNAME=username
SPRING_DATASOURCE_PASSWORD=password
```

### **Google OAuth Configuration:**
```bash
GOOGLE_CLIENT_ID=your-actual-google-client-id
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret
FRONTEND_URL=https://prime-properties.up.railway.app
```

### **JWT Configuration:**
```bash
JWT_SECRET=your-strong-jwt-secret-min-32-characters
JWT_EXPIRATION=86400000
```

### **CORS Configuration:**
```bash
CORS_ALLOWED_ORIGINS=https://prime-properties.up.railway.app
CORS_ALLOWED_METHODS=GET,POST,PUT,DELETE,OPTIONS,PATCH
CORS_ALLOWED_HEADERS=Authorization,Content-Type,X-Requested-With,Accept,Origin
CORS_ALLOW_CREDENTIALS=true
CORS_MAX_AGE=3600
```

### **Production Settings:**
```bash
PORT=8080
NODE_ENV=production
LOG_LEVEL_PRIME=INFO
LOG_LEVEL_SECURITY=WARN
LOG_LEVEL_HIBERNATE=WARN
LOG_LEVEL_WEB=INFO
JPA_DDL_AUTO=update
JPA_SHOW_SQL=false
SQL_INIT_MODE=never
```

### **Database Connection Pooling:**
```bash
DB_POOL_SIZE=10
DB_MIN_IDLE=5
DB_IDLE_TIMEOUT=300000
DB_MAX_LIFETIME=1200000
DB_CONNECTION_TIMEOUT=20000
```

### **Session Configuration:**
```bash
SESSION_COOKIE_SAME_SITE=none
SESSION_COOKIE_SECURE=true
```

### **Management Endpoints:**
```bash
MANAGEMENT_ENDPOINTS=health,info
HEALTH_SHOW_DETAILS=when-authorized
```

## 🔧 **Application Properties Configuration**

The `application.properties` file now uses environment variables with fallbacks:

### **Database Configuration:**
```properties
spring.datasource.url=${SPRING_DATASOURCE_URL:${DATABASE_URL:jdbc:postgresql://localhost:5432/prime_properties}}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME:${DB_USERNAME:postgres}}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD:${DB_PASSWORD:postgres}}
```

### **Google OAuth:**
```properties
spring.security.oauth2.client.registration.google.client-id=${GOOGLE_CLIENT_ID:your-google-client-id}
spring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET:your-google-client-secret}
spring.security.oauth2.client.registration.google.redirect-uri=${FRONTEND_URL:https://prime-properties.up.railway.app}/api/auth/callback/google
```

### **CORS Configuration:**
```properties
spring.web.cors.allowed-origins=${CORS_ALLOWED_ORIGINS:https://prime-properties.up.railway.app}
spring.web.cors.allowed-methods=${CORS_ALLOWED_METHODS:GET,POST,PUT,DELETE,OPTIONS,PATCH}
spring.web.cors.allowed-headers=${CORS_ALLOWED_HEADERS:Authorization,Content-Type,X-Requested-With,Accept,Origin}
spring.web.cors.allow-credentials=${CORS_ALLOW_CREDENTIALS:true}
spring.web.cors.max-age=${CORS_MAX_AGE:3600}
```

## 🔧 **WebSocket Configuration**

The WebSocket configuration now reads the frontend URL from environment variables:

```java
String frontendUrl = System.getenv("FRONTEND_URL");
if (frontendUrl == null || frontendUrl.isEmpty()) {
    frontendUrl = "https://prime-properties.up.railway.app";
}

registry.addEndpoint("/ws")
    .setAllowedOrigins(frontendUrl, "http://localhost:3000", "http://localhost:5173")
    .withSockJS();
```

## 🔧 **CORS Configuration**

The CORS configuration in `WebSecurityConfig.java` now uses environment variables:

```java
String frontendUrl = System.getenv("FRONTEND_URL");
if (frontendUrl == null || frontendUrl.isEmpty()) {
    frontendUrl = "https://prime-properties.up.railway.app";
}

configuration.setAllowedOrigins(Arrays.asList(
    frontendUrl,
    "http://localhost:3000", // Keep for local dev
    "http://localhost:5173"  // Keep for local dev
));
```

## 🚀 **Railway Deployment Steps**

### **Step 1: Set Environment Variables**
1. Go to Railway dashboard
2. Select your backend service
3. Go to **Variables** tab
4. Add all required environment variables listed above

### **Step 2: Deploy**
1. **Redeploy** the backend service
2. Wait for deployment to complete
3. Check Railway logs for any errors

### **Step 3: Verify Configuration**
1. Check Railway logs for startup messages
2. Verify database connection
3. Test API endpoints
4. Test Google OAuth flow

## 🔍 **Debugging Railway Deployment**

### **Common Issues & Solutions:**

| Issue | Solution |
|-------|----------|
| **Database Connection Failed** | Check `DATABASE_URL` environment variable |
| **Google OAuth Failed** | Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` |
| **CORS Errors** | Check `FRONTEND_URL` environment variable |
| **JWT Errors** | Verify `JWT_SECRET` is set and strong |
| **WebSocket Connection Failed** | Check `FRONTEND_URL` for WebSocket origins |

### **Railway Logs to Check:**
```bash
# Database connection
"DataSource configured successfully"

# OAuth configuration
"OAuth2 client configured"

# CORS configuration
"CORS configuration loaded"

# WebSocket configuration
"WebSocket endpoints registered"
```

## 📋 **Environment Variables Checklist**

- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `GOOGLE_CLIENT_ID` - Google OAuth client ID
- [ ] `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- [ ] `FRONTEND_URL` - Frontend domain URL
- [ ] `JWT_SECRET` - Strong JWT secret key
- [ ] `CORS_ALLOWED_ORIGINS` - Allowed CORS origins
- [ ] `PORT` - Server port (Railway sets this automatically)
- [ ] `NODE_ENV` - Environment (set to production)

## 🎯 **Expected Results**

After proper configuration:

✅ **Database Connection**: Successfully connects to Railway PostgreSQL
✅ **Google OAuth**: OAuth flow works with proper redirect URIs
✅ **CORS**: Frontend can make API calls to backend
✅ **WebSocket**: WebSocket connections work with WSS protocol
✅ **JWT Authentication**: Token generation and validation works
✅ **Production Logging**: Appropriate logging levels for production

## 🚨 **Security Notes**

- **Never commit** environment variables to version control
- **Use strong secrets** for JWT_SECRET (min 32 characters)
- **Keep Google OAuth secrets** secure
- **Use HTTPS** for all production URLs
- **Regularly rotate** secrets in production

Your Railway backend deployment will now work correctly with all secrets from environment variables! 🚀
