package com.primeproperties.controller;

import com.primeproperties.model.User;
import com.primeproperties.repository.UserRepository;
import com.primeproperties.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;
import jakarta.servlet.http.HttpServletRequest;

/**
 * OAuth Controller for handling Google Sign-In authentication
 */
@RestController
@RequestMapping("/auth")
public class OAuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    /**
     * Handle Google ID token verification from frontend
     */
    @PostMapping("/google")
    public ResponseEntity<?> handleGoogleIdToken(@RequestBody Map<String, String> request, HttpServletRequest httpRequest) {
        try {
            System.out.println("=== Google ID Token Verification ===");
            
            // Log proxy headers for debugging
            String forwardedProto = httpRequest.getHeader("X-Forwarded-Proto");
            String forwardedHost = httpRequest.getHeader("X-Forwarded-Host");
            System.out.println("🔍 Request Headers:");
            System.out.println("  X-Forwarded-Proto: " + forwardedProto);
            System.out.println("  X-Forwarded-Host: " + forwardedHost);
            System.out.println("  Request Scheme: " + httpRequest.getScheme());
            System.out.println("  Request URL: " + httpRequest.getRequestURL());
            
            String idToken = request.get("credential");
            if (idToken == null || idToken.isEmpty()) {
                System.out.println("❌ Missing Google ID token");
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Missing Google ID token"));
            }

            System.out.println("🔍 Received Google ID token: " + idToken.substring(0, Math.min(50, idToken.length())) + "...");

            // For demo purposes, we'll create a user with sample data
            // In production, you should verify the token signature with Google's public keys
            String email = "demo.user@gmail.com";
            String name = "Demo User";
            String googleId = "demo_google_id_123";
            
            System.out.println("🔍 Using demo user info - ID: " + googleId + ", Email: " + email + ", Name: " + name);

            // Check if user already exists
            User user = userRepository.findByGoogleId(googleId).orElse(null);
            
            if (user == null) {
                // Check if user exists with same email but different provider
                user = userRepository.findByEmail(email).orElse(null);
                
                if (user != null) {
                    // Link Google account to existing user
                    user.setGoogleId(googleId);
                    user.setProvider("GOOGLE");
                    userRepository.save(user);
                    System.out.println("✅ Linked Google account to existing user: " + email);
                } else {
                    // Create new user
                    user = new User();
                    user.setGoogleId(googleId);
                    user.setEmail(email);
                    user.setName(name);
                    user.setUsername(email); // Use email as username for OAuth users
                    user.setRole("CUSTOMER"); // Default role for OAuth users
                    user.setProvider("GOOGLE");
                    
                    userRepository.save(user);
                    System.out.println("✅ Created new Google user: " + email);
                }
            } else {
                System.out.println("✅ Existing Google user found: " + email);
            }

            // Generate JWT token
            String jwt = jwtUtils.generateToken(user.getUsername(), user.getRole());
            System.out.println("🎫 JWT token generated for user: " + user.getUsername());

            // Return success response with JWT
            return ResponseEntity.ok(Map.of(
                "message", "Google authentication successful",
                "token", jwt,
                "user", Map.of(
                    "id", user.getId(),
                    "username", user.getUsername(),
                    "name", user.getName(),
                    "email", user.getEmail(),
                    "role", user.getRole(),
                    "provider", user.getProvider()
                )
            ));

        } catch (Exception e) {
            System.err.println("❌ Google ID token verification error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(401)
                .body(Map.of("error", "Unauthorized", "message", "Google authentication failed"));
        }
    }

    /**
     * Test endpoint to verify COOP headers are being set
     */
    @GetMapping("/test-headers")
    public ResponseEntity<?> testHeaders() {
        return ResponseEntity.ok(Map.of(
            "message", "Headers test endpoint",
            "timestamp", System.currentTimeMillis(),
            "note", "Check response headers for Cross-Origin-Opener-Policy"
        ));
    }

    /**
     * Handle Google OAuth callback
     */
    @GetMapping("/google/callback")
    public ResponseEntity<?> handleGoogleCallback(Authentication authentication) {
        try {
            System.out.println("🔍 OAuth callback received");
            System.out.println("🔍 Authentication: " + authentication);
            
            // Try to get authentication from SecurityContext if not provided
            if (authentication == null) {
                System.out.println("🔍 Getting authentication from SecurityContext");
                org.springframework.security.core.context.SecurityContext context = 
                    org.springframework.security.core.context.SecurityContextHolder.getContext();
                authentication = context.getAuthentication();
                System.out.println("🔍 SecurityContext Authentication: " + authentication);
            }
            
            if (authentication != null && authentication.getPrincipal() instanceof OAuth2User) {
                OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
                
                String email = oauth2User.getAttribute("email");
                String name = oauth2User.getAttribute("name");
                String googleId = oauth2User.getAttribute("sub");
                
                System.out.println("🔍 User: " + name + " (" + email + ")");
                
                // Create or find user
                User user = userRepository.findByEmail(email).orElse(null);
                if (user == null) {
                    user = new User();
                    user.setEmail(email);
                    user.setName(name);
                    user.setUsername(email);
                    user.setRole("CUSTOMER");
                    user.setProvider("GOOGLE");
                    user.setGoogleId(googleId);
                    userRepository.save(user);
                    System.out.println("✅ Created new user: " + email);
                } else {
                    System.out.println("✅ Found existing user: " + email);
                }
                
                // Generate JWT
                String jwt = jwtUtils.generateToken(user.getUsername(), user.getRole());
                
                // Redirect to frontend
                String frontendUrl = "https://prime-properties.up.railway.app/login?success=true&token=" + jwt;
                return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create(frontendUrl))
                    .build();
            }
            
            System.out.println("❌ No valid authentication found");
            return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("https://prime-properties.up.railway.app/login?error=auth_failed"))
                .build();
                
        } catch (Exception e) {
            System.err.println("❌ OAuth callback error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("https://prime-properties.up.railway.app/login?error=auth_failed"))
                .build();
        }
    }

    /**
     * Get Google OAuth login URL
     */
    @GetMapping("/google/login")
    public ResponseEntity<?> getGoogleLoginUrl() {
        try {
            // This endpoint can be used to get the Google OAuth URL
            // In a real implementation, you might want to generate the URL dynamically
            String googleLoginUrl = "/oauth2/authorization/google";
            
            return ResponseEntity.ok(Map.of(
                "message", "Redirect to this URL for Google login",
                "loginUrl", googleLoginUrl
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Failed to get Google login URL", "message", e.getMessage()));
        }
    }

    /**
     * Test OAuth configuration endpoint
     */
    @GetMapping("/oauth/test")
    public ResponseEntity<?> testOAuthConfig() {
        try {
            return ResponseEntity.ok(Map.of(
                "message", "OAuth Test Endpoint",
                "timestamp", System.currentTimeMillis(),
                "note", "This endpoint tests OAuth configuration",
                "oauthUrl", "https://prime-properties-production-d021.up.railway.app/oauth2/authorization/google"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "OAuth test failed", "message", e.getMessage()));
        }
    }

    /**
     * Test endpoint to generate the exact OAuth URL
     */
    @GetMapping("/oauth/test-url")
    public ResponseEntity<?> testOAuthUrl() {
        try {
            String baseUrl = "https://prime-properties-production-d021.up.railway.app";
            String oauthUrl = baseUrl + "/oauth2/authorization/google";
            
            return ResponseEntity.ok(Map.of(
                "message", "OAuth URL Test",
                "baseUrl", baseUrl,
                "oauthUrl", oauthUrl,
                "expectedCallback", baseUrl + "/auth/google/callback",
                "note", "Use this URL to test OAuth flow"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "URL test failed", "message", e.getMessage()));
        }
    }

    /**
     * Debug endpoint to check OAuth configuration
     */
    @GetMapping("/oauth/debug")
    public ResponseEntity<?> debugOAuthConfig() {
        try {
            // Get OAuth configuration from environment
            String clientId = System.getenv("GOOGLE_CLIENT_ID");
            String clientSecret = System.getenv("GOOGLE_CLIENT_SECRET");
            String callbackUrl = System.getenv("GOOGLE_CALLBACK_URL");
            
            return ResponseEntity.ok(Map.of(
                "message", "OAuth Debug Information",
                "timestamp", System.currentTimeMillis(),
                "clientId", clientId != null ? clientId.substring(0, Math.min(20, clientId.length())) + "..." : "null",
                "clientSecret", clientSecret != null ? "***" + clientSecret.substring(Math.max(0, clientSecret.length() - 4)) : "null",
                "callbackUrl", callbackUrl != null ? callbackUrl : "null",
                "note", "Check Railway logs for OAuth configuration details"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Debug failed", "message", e.getMessage()));
        }
    }

    /**
     * Health check for OAuth endpoints
     */
    @GetMapping("/oauth/health")
    public ResponseEntity<?> oauthHealthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "OK",
            "message", "OAuth service is running",
            "timestamp", System.currentTimeMillis()
        ));
    }
}