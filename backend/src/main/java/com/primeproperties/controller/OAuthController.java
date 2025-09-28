package com.primeproperties.controller;

import com.primeproperties.model.User;
import com.primeproperties.repository.UserRepository;
import com.primeproperties.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import jakarta.servlet.http.HttpServletResponse;

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
    public ResponseEntity<?> handleGoogleIdToken(@RequestBody Map<String, String> request) {
        try {
            System.out.println("=== Google ID Token Verification ===");
            
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
     * Simple health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<?> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "timestamp", System.currentTimeMillis(),
            "service", "Prime Properties OAuth Service"
        ));
    }

    /**
     * Test endpoint to verify COOP headers are being set
     */
    @GetMapping("/test-headers")
    public ResponseEntity<?> testHeaders(HttpServletResponse response) {
        // This endpoint will be intercepted by HttpHeadersConfig
        return ResponseEntity.ok(Map.of(
            "message", "Headers test endpoint",
            "timestamp", System.currentTimeMillis(),
            "note", "Check response headers for Cross-Origin-Opener-Policy"
        ));
    }

    /**
     * Handle Google OAuth callback (for server-side OAuth flow)
     */
    @GetMapping("/google/callback")
    public ResponseEntity<?> handleGoogleCallback(Authentication authentication) {
        try {
            System.out.println("=== Google OAuth Callback ===");
            
            if (authentication == null || !(authentication.getPrincipal() instanceof OAuth2User)) {
                System.out.println("❌ Invalid authentication");
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Authentication failed"));
            }

            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            
            // Extract user information from Google
            String googleId = oauth2User.getAttribute("sub");
            String email = oauth2User.getAttribute("email");
            String name = oauth2User.getAttribute("name");

            System.out.println("🔍 Google user info - ID: " + googleId + ", Email: " + email + ", Name: " + name);

            if (googleId == null || email == null || name == null) {
                System.out.println("❌ Missing required Google user information");
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Missing user information from Google"));
            }

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
            System.err.println("❌ Google OAuth callback error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(401)
                .body(Map.of("error", "Unauthorized", "message", "Google authentication failed"));
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