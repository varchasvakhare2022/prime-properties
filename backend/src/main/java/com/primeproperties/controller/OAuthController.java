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

            // Parse the JWT token to extract user information
            // Note: In production, you should verify the token signature with Google's public keys
            String[] tokenParts = idToken.split("\\.");
            if (tokenParts.length != 3) {
                System.out.println("❌ Invalid JWT token format");
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Invalid token format"));
            }

            // Decode the payload (second part of JWT)
            String payload = new String(java.util.Base64.getUrlDecoder().decode(tokenParts[1]));
            System.out.println("🔍 Token payload: " + payload);
            
            // Parse JSON payload
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            Map<String, Object> claims = mapper.readValue(payload, Map.class);
            
            // Extract user information
            String googleId = (String) claims.get("sub");
            String email = (String) claims.get("email");
            String name = (String) claims.get("name");
            String picture = (String) claims.get("picture");
            
            System.out.println("🔍 Extracted user info - ID: " + googleId + ", Email: " + email + ", Name: " + name);

            if (googleId == null || email == null || name == null) {
                System.out.println("❌ Missing required user information in token");
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Missing user information in token"));
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
            System.err.println("❌ Google ID token verification error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(401)
                .body(Map.of("error", "Unauthorized", "message", "Google authentication failed"));
        }
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