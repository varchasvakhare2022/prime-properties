package com.primeproperties.config;

import com.primeproperties.model.User;
import com.primeproperties.repository.UserRepository;
import com.primeproperties.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, 
                                      Authentication authentication) throws IOException, ServletException {
        
        System.out.println("🚨 OAuth2SuccessHandler.onAuthenticationSuccess called");
        System.out.println("🔍 Request URI: " + request.getRequestURI());
        System.out.println("🔍 Authentication: " + authentication);
        System.out.println("🔍 Principal: " + authentication.getPrincipal());
        
        try {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            System.out.println("✅ OAuth2User obtained successfully");
            
            // Extract user information from Google
            String googleId = oauth2User.getAttribute("sub");
            String email = oauth2User.getAttribute("email");
            String name = oauth2User.getAttribute("name");

            System.out.println("🔍 Google user info - ID: " + googleId + ", Email: " + email + ", Name: " + name);

            if (googleId == null || email == null || name == null) {
                System.out.println("❌ Missing required Google user information");
                response.sendRedirect("https://prime-properties.up.railway.app/login?error=missing_info");
                return;
            }

            // Check if user already exists
            User user = userRepository.findByGoogleId(googleId).orElse(null);
            System.out.println("🔍 User lookup by Google ID: " + (user != null ? "Found" : "Not found"));
            
            if (user == null) {
                // Check if user exists with same email but different provider
                user = userRepository.findByEmail(email).orElse(null);
                System.out.println("🔍 User lookup by email: " + (user != null ? "Found" : "Not found"));
                
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
            System.out.println("🎫 JWT token length: " + jwt.length());

            // Redirect to frontend with success and token
            String frontendUrl = "https://prime-properties.up.railway.app/login?success=true&token=" + jwt;
            System.out.println("🔄 Redirecting to: " + frontendUrl);
            response.sendRedirect(frontendUrl);

        } catch (Exception e) {
            System.err.println("❌ OAuth Success Handler error: " + e.getMessage());
            e.printStackTrace();
            response.sendRedirect("https://prime-properties.up.railway.app/login?error=auth_failed");
        }
    }
}
