package com.primeproperties.controller;

import com.primeproperties.dto.JwtResponse;
import com.primeproperties.dto.LoginRequest;
import com.primeproperties.dto.RegisterRequest;
import com.primeproperties.model.User;
import com.primeproperties.repository.UserRepository;
import com.primeproperties.util.JwtUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Authentication Controller for user registration and login
 */
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    /**
     * Register a new user
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        // Check if username already exists
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Error: Username is already taken!"));
        }

        // Check if email already exists
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Error: Email is already in use!"));
        }

        // Validate role
        if (!registerRequest.getRole().equals("CUSTOMER") && !registerRequest.getRole().equals("DEVELOPER")) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Error: Role must be either CUSTOMER or DEVELOPER!"));
        }

        // Create new user
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(registerRequest.getRole());

        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User registered successfully!"));
    }

    /**
     * Login user and return JWT token
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("Login attempt - Username/Email: " + loginRequest.getUsername());
            
            // Try to find user by username first, then by email
            User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElse(userRepository.findByEmail(loginRequest.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found")));
            
            System.out.println("User found - Username: " + user.getUsername() + ", Email: " + user.getEmail() + ", Role: " + user.getRole());
            
            // Authenticate using the actual username from database
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), loginRequest.getPassword())
            );

            System.out.println("Authentication successful for user: " + user.getUsername());

            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            String jwt = jwtUtils.generateToken(authentication.getName(), user.getRole());

            return ResponseEntity.ok(new JwtResponse(
                jwt,
                user.getUsername(),
                user.getName(),
                user.getEmail(),
                user.getRole()
            ));
        } catch (Exception e) {
            System.out.println("Authentication failed: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Error: Invalid username or password!"));
        }
    }

    /**
     * Debug endpoint to check if sample users exist
     */
    @GetMapping("/debug/users")
    public ResponseEntity<?> debugUsers() {
        try {
            var users = userRepository.findAll();
            var userList = users.stream().map(user -> Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "email", user.getEmail(),
                "role", user.getRole(),
                "passwordLength", user.getPassword().length()
            )).toList();
            
            return ResponseEntity.ok(Map.of(
                "totalUsers", users.size(),
                "users", userList
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Get current user profile
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("id", user.getId());
        userInfo.put("username", user.getUsername());
        userInfo.put("name", user.getName());
        userInfo.put("email", user.getEmail());
        userInfo.put("role", user.getRole());

        return ResponseEntity.ok(userInfo);
    }
}