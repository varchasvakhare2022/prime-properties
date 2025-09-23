package com.primeproperties.controller;

import com.primeproperties.dto.LoginRequest;
import com.primeproperties.dto.RegisterRequest;
import com.primeproperties.dto.AuthResponse;
import com.primeproperties.model.Role;
import com.primeproperties.model.User;
import com.primeproperties.repository.UserRepository;
import com.primeproperties.security.JwtUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    AuthenticationManager authenticationManager;
    
    @Autowired
    UserRepository userRepository;
    
    @Autowired
    PasswordEncoder encoder;
    
    @Autowired
    JwtUtils jwtUtils;
    
    /**
     * User registration endpoint
     * @param registerRequest Registration data
     * @return AuthResponse with JWT token
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            // Check if email already exists
            if (userRepository.existsByEmail(registerRequest.getEmail())) {
                return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("Error: Email is already in use!"));
            }
            
            // Validate role
            if (registerRequest.getRole() == null) {
                return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("Error: Role is required!"));
            }
            
            // Create new user
            User user = new User(
                registerRequest.getName(),
                registerRequest.getEmail(),
                encoder.encode(registerRequest.getPassword()),
                registerRequest.getRole()
            );
            
            userRepository.save(user);
            
            // Generate JWT token
            List<String> roles = Collections.singletonList("ROLE_" + user.getRole().name());
            String jwt = jwtUtils.generateTokenFromUsername(user.getEmail(), roles);
            
            // Create response
            AuthResponse.UserInfo userInfo = new AuthResponse.UserInfo(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
            );
            
            AuthResponse response = new AuthResponse(
                jwt,
                jwtUtils.getExpirationTime(),
                userInfo
            );
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            return ResponseEntity
                .badRequest()
                .body(new ErrorResponse("Error: " + e.getMessage()));
        }
    }
    
    /**
     * User login endpoint
     * @param loginRequest Login credentials
     * @return AuthResponse with JWT token
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            
            // Get user details
            User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Create response
            AuthResponse.UserInfo userInfo = new AuthResponse.UserInfo(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
            );
            
            AuthResponse response = new AuthResponse(
                jwt,
                jwtUtils.getExpirationTime(),
                userInfo
            );
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Error: Invalid credentials"));
        }
    }
    
    /**
     * Get current user profile
     * @param authentication Current authentication
     * @return User profile information
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            AuthResponse.UserInfo userInfo = new AuthResponse.UserInfo(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
            );
            
            return ResponseEntity.ok(userInfo);
            
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Error: " + e.getMessage()));
        }
    }
    
    /**
     * Error response class
     */
    public static class ErrorResponse {
        private String message;
        
        public ErrorResponse(String message) {
            this.message = message;
        }
        
        public String getMessage() {
            return message;
        }
        
        public void setMessage(String message) {
            this.message = message;
        }
    }
}