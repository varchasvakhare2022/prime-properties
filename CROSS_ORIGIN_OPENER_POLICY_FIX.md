# Cross-Origin-Opener-Policy Fix for Google Sign-In

## 🚨 **Problem**
Google Sign-In popup is blocked by Cross-Origin-Opener-Policy (COOP) error when deployed on Railway.

## ✅ **Solution**
The issue is fixed on the **Spring Boot backend**, not the frontend, since this is a Create React App project.

### **Backend Fix (Spring Security Configuration)**

Updated `WebSecurityConfig.java` to include proper COOP header:

```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
            .cors(withDefaults())
            .csrf(csrf -> csrf.disable())
            // Configure headers to allow Google Sign-In popups
            .headers(headers -> headers
                    .crossOriginOpenerPolicy(opener -> opener.policy("same-origin-allow-popups")))
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/auth/**").permitAll()
                    .requestMatchers("/oauth2/**").permitAll()
                    .requestMatchers("/properties/**").permitAll()
                    .requestMatchers("/actuator/health", "/health").permitAll()
                    .anyRequest().authenticated())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .oauth2Login(oauth2 -> oauth2
                    .loginPage("/auth/google/login")
                    .defaultSuccessUrl("/auth/google/callback", true)
                    .failureUrl("/auth/google/error")
                    .userInfoEndpoint(userInfo -> userInfo
                            .userService(oauth2UserService())));

    http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
}
```

### **Application Properties Configuration**

Updated `application.properties` to include COOP header:

```properties
# Cross-Origin-Opener-Policy for Google Sign-In popups
server.servlet.session.cookie.cross-origin-opener-policy=${CROSS_ORIGIN_OPENER_POLICY:same-origin-allow-popups}
```

## 🔧 **Why This Fix Works**

### **Cross-Origin-Opener-Policy Values:**

| Value | Description | Google Sign-In Support |
|-------|-------------|----------------------|
| `same-origin` | Blocks all cross-origin popups | ❌ **Blocks Google Sign-In** |
| `same-origin-allow-popups` | Allows same-origin popups | ✅ **Allows Google Sign-In** |
| `unsafe-none` | Allows all popups (less secure) | ✅ **Allows Google Sign-In** |

### **Recommended Setting:**
```java
.crossOriginOpenerPolicy(opener -> opener.policy("same-origin-allow-popups"))
```

This setting:
- ✅ **Allows Google Sign-In popups** to work
- ✅ **Maintains security** by restricting to same-origin
- ✅ **Compatible with Railway deployment**

## 🚀 **Railway Environment Variables**

Add this environment variable to your Railway backend service:

```bash
CROSS_ORIGIN_OPENER_POLICY=same-origin-allow-popups
```

## 🔍 **Testing the Fix**

### **1. Deploy to Railway**
1. Commit the changes
2. Deploy to Railway
3. Wait for deployment to complete

### **2. Test Google Sign-In**
1. Go to your frontend: `https://prime-properties.up.railway.app`
2. Click "Sign in with Google"
3. Google popup should open without COOP errors
4. Complete the sign-in process

### **3. Check Browser Console**
- **Before fix**: `Cross-Origin-Opener-Policy` error
- **After fix**: No COOP errors, Google Sign-In works

## 🚨 **Important Notes**

### **Project Type Clarification:**
- **Your project**: Create React App (not Next.js)
- **Frontend**: Cannot set server headers (static hosting)
- **Backend**: Spring Boot (can set HTTP headers)
- **Solution**: Fix on backend, not frontend

### **Security Considerations:**
- `same-origin-allow-popups` is secure for Google OAuth
- Maintains same-origin policy for regular requests
- Only allows popups from same origin (your domain)

### **Railway Deployment:**
- Headers are set by Spring Boot backend
- Frontend receives headers from backend responses
- No frontend configuration needed

## 📋 **Verification Checklist**

- [ ] **Backend deployed** with COOP header configuration
- [ ] **Environment variable** `CROSS_ORIGIN_OPENER_POLICY=same-origin-allow-popups` set in Railway
- [ ] **Google Sign-In popup** opens without errors
- [ ] **Browser console** shows no COOP errors
- [ ] **Authentication flow** completes successfully

## 🎯 **Expected Results**

After deploying the fix:

✅ **Google Sign-In popup** opens successfully
✅ **No COOP errors** in browser console
✅ **Authentication flow** works end-to-end
✅ **JWT token** generated and stored
✅ **User redirected** to dashboard

## 🔧 **Alternative Solutions (if needed)**

### **Option 1: Disable COOP entirely**
```java
.headers(headers -> headers
        .crossOriginOpenerPolicy(opener -> opener.disable()))
```

### **Option 2: Use unsafe-none (less secure)**
```java
.headers(headers -> headers
        .crossOriginOpenerPolicy(opener -> opener.policy("unsafe-none")))
```

### **Option 3: Environment variable control**
```properties
# In application.properties
server.servlet.session.cookie.cross-origin-opener-policy=${CROSS_ORIGIN_OPENER_POLICY:same-origin-allow-popups}
```

## 🚀 **Deployment Steps**

1. **Update backend code** with COOP header configuration
2. **Set environment variable** in Railway dashboard
3. **Deploy backend** to Railway
4. **Test Google Sign-In** on frontend
5. **Verify** no COOP errors in browser console

Your Google Sign-In should now work without Cross-Origin-Opener-Policy errors! 🎉
