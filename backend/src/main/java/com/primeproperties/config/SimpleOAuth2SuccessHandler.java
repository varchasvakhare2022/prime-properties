package com.primeproperties.config;

import com.primeproperties.model.User;
import com.primeproperties.repository.UserRepository;
import com.primeproperties.util.JwtUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class SimpleOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, 
                                      Authentication authentication) throws IOException, ServletException {
        
        System.out.println("🎉 OAuth Success Handler called!");
        
        if (authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            
            String email = oauth2User.getAttribute("email");
            String name = oauth2User.getAttribute("name");
            String googleId = oauth2User.getAttribute("sub");
            
            System.out.println("🎉 User: " + name + " (" + email + ")");
            
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
            
            // Generate JWT and store in session
            String jwt = jwtUtils.generateToken(user.getUsername(), user.getRole());
            request.getSession().setAttribute("jwt", jwt);
            request.getSession().setAttribute("user", user);
            
            System.out.println("🎉 JWT generated and stored in session");
        }
        
        // Redirect to frontend
        response.sendRedirect("https://prime-properties.up.railway.app/properties");
    }
}
