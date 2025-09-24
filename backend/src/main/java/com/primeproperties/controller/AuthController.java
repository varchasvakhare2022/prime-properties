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
import org.springframework.security.core.userdetails.UserDetailsService;
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

    @Autowired
    private UserDetailsService userDetailsService;

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

        System.out.println("📝 Creating user: " + user.getUsername() + " with email: " + user.getEmail());
        User savedUser = userRepository.save(user);
        System.out.println("✅ User saved with ID: " + savedUser.getId());

        return ResponseEntity.ok(Map.of("message", "User registered successfully!"));
    }

    /**
     * Login user and return JWT token
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("=== LOGIN ATTEMPT START ===");
            System.out.println("Login attempt - Username/Email: " + loginRequest.getUsername());
            System.out.println("Login request object: " + loginRequest);

            // Check if request body is valid
            if (loginRequest == null || loginRequest.getUsername() == null || loginRequest.getPassword() == null) {
                System.out.println("❌ Invalid request body");
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Error: Invalid request body!"));
            }

            // Check total users in database first
            long totalUsers = userRepository.count();
            System.out.println("📊 Total users in database: " + totalUsers);
            
            if (totalUsers == 0) {
                System.out.println("❌ No users found in database! Data initialization may have failed.");
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Error: No users found in database. Please contact administrator."));
            }

            // Try to find user by username first, then by email
            System.out.println("🔍 Searching for user by username: " + loginRequest.getUsername());
            User user = userRepository.findByUsername(loginRequest.getUsername()).orElse(null);
            
            if (user == null) {
                System.out.println("🔍 User not found by username, trying email: " + loginRequest.getUsername());
                user = userRepository.findByEmail(loginRequest.getUsername()).orElse(null);
            }
            
            if (user == null) {
                System.out.println("❌ User not found with username/email: " + loginRequest.getUsername());
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Error: User not found!"));
            }

            System.out.println("✅ User found - Username: " + user.getUsername() + ", Email: " + user.getEmail() + ", Role: " + user.getRole());

            // Authenticate using the actual username from database
            System.out.println("🔐 Attempting authentication for username: " + user.getUsername());
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), loginRequest.getPassword())
            );

            System.out.println("✅ Authentication successful for user: " + user.getUsername());

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtUtils.generateToken(authentication.getName(), user.getRole());
            System.out.println("🎫 JWT token generated successfully");

            System.out.println("=== LOGIN ATTEMPT SUCCESS ===");
            return ResponseEntity.ok(new JwtResponse(
                jwt,
                user.getUsername(),
                user.getName(),
                user.getEmail(),
                user.getRole()
            ));
        } catch (Exception e) {
            System.out.println("❌ Authentication failed: " + e.getMessage());
            e.printStackTrace();
            System.out.println("=== LOGIN ATTEMPT FAILED ===");
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Error: Invalid username or password!"));
        }
    }

    /**
     * Simple health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<?> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "OK",
            "message", "Auth service is running",
            "timestamp", System.currentTimeMillis()
        ));
    }

    /**
     * Create sample users with different IDs to avoid conflicts
     */
    @PostMapping("/debug/create-sample-users")
    public ResponseEntity<?> createSampleUsers() {
        try {
            System.out.println("=== Creating Sample Users ===");
            
            // Create Developer User with ID 100 (to avoid conflicts)
            User developer = new User();
            developer.setId(100L);
            developer.setUsername("developer");
            developer.setName("Developer User");
            developer.setEmail("developer@prime.com");
            developer.setPassword(passwordEncoder.encode("DevPass123"));
            developer.setRole("DEVELOPER");
            
            userRepository.save(developer);
            System.out.println("✅ Created Developer User");

            // Create Customer User with ID 200 (to avoid conflicts)
            User customer = new User();
            customer.setId(200L);
            customer.setUsername("customer");
            customer.setName("Customer User");
            customer.setEmail("customer@prime.com");
            customer.setPassword(passwordEncoder.encode("CustPass123"));
            customer.setRole("CUSTOMER");
            
            userRepository.save(customer);
            System.out.println("✅ Created Customer User");
            
            long finalUserCount = userRepository.count();
            System.out.println("Final user count: " + finalUserCount);
            
            return ResponseEntity.ok(Map.of(
                "message", "Sample users created successfully!",
                "usersCreated", 2,
                "totalUsers", finalUserCount,
                "credentials", Map.of(
                    "developer", "developer@prime.com / DevPass123",
                    "customer", "customer@prime.com / CustPass123"
                )
            ));
        } catch (Exception e) {
            System.err.println("❌ Error creating sample users: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Manual data initialization endpoint
     */
    @PostMapping("/debug/init-data")
    public ResponseEntity<?> initializeData() {
        try {
            System.out.println("=== Manual Data Initialization Requested ===");
            
            long userCount = userRepository.count();
            System.out.println("Current user count: " + userCount);
            
            // Always create sample users (force creation)
            System.out.println("Force creating sample users...");
            
            // Create Developer User
            User developer = new User();
            developer.setId(1L);
            developer.setUsername("developer");
            developer.setName("Developer User");
            developer.setEmail("developer@prime.com");
            developer.setPassword(passwordEncoder.encode("DevPass123"));
            developer.setRole("DEVELOPER");
            
            userRepository.save(developer);
            System.out.println("✅ Created Developer User");

            // Create Customer User
            User customer = new User();
            customer.setId(2L);
            customer.setUsername("customer");
            customer.setName("Customer User");
            customer.setEmail("customer@prime.com");
            customer.setPassword(passwordEncoder.encode("CustPass123"));
            customer.setRole("CUSTOMER");
            
            userRepository.save(customer);
            System.out.println("✅ Created Customer User");
            
            long finalUserCount = userRepository.count();
            System.out.println("Final user count: " + finalUserCount);
            
            return ResponseEntity.ok(Map.of(
                "message", "Sample users created successfully!",
                "usersCreated", 2,
                "totalUsers", finalUserCount,
                "credentials", Map.of(
                    "developer", "developer@prime.com / DevPass123",
                    "customer", "customer@prime.com / CustPass123"
                )
            ));
        } catch (Exception e) {
            System.err.println("❌ Error in manual data initialization: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Test user lookup endpoint
     */
    @GetMapping("/debug/test-user-lookup/{username}")
    public ResponseEntity<?> testUserLookup(@PathVariable String username) {
        try {
            System.out.println("🔍 Testing user lookup for: " + username);
            
            // Test repository methods
            var userByUsername = userRepository.findByUsername(username);
            var userByEmail = userRepository.findByEmail(username);
            
            System.out.println("Repository findByUsername result: " + (userByUsername.isPresent() ? "Found" : "Not found"));
            System.out.println("Repository findByEmail result: " + (userByEmail.isPresent() ? "Found" : "Not found"));
            
            // Test UserDetailsService
            try {
                var userDetails = userDetailsService.loadUserByUsername(username);
                System.out.println("UserDetailsService result: Found user with authorities: " + userDetails.getAuthorities());
                
                return ResponseEntity.ok(Map.of(
                    "username", username,
                    "repositoryByUsername", userByUsername.isPresent(),
                    "repositoryByEmail", userByEmail.isPresent(),
                    "userDetailsService", "Found",
                    "authorities", userDetails.getAuthorities().toString()
                ));
            } catch (Exception e) {
                System.out.println("UserDetailsService error: " + e.getMessage());
                return ResponseEntity.ok(Map.of(
                    "username", username,
                    "repositoryByUsername", userByUsername.isPresent(),
                    "repositoryByEmail", userByEmail.isPresent(),
                    "userDetailsService", "Error: " + e.getMessage()
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Debug endpoint to check if sample users exist
     */
    @GetMapping("/debug/users")
    public ResponseEntity<?> debugUsers() {
        try {
            System.out.println("Debug: Checking users in database...");
            var users = userRepository.findAll();
            System.out.println("Debug: Found " + users.size() + " users in database");
            
            var userList = users.stream().map(user -> {
                System.out.println("Debug: User - ID: " + user.getId() + ", Username: " + user.getUsername() + ", Email: " + user.getEmail() + ", Role: " + user.getRole());
                return Map.of(
                    "id", user.getId(),
                    "username", user.getUsername(),
                    "email", user.getEmail(),
                    "role", user.getRole(),
                    "passwordLength", user.getPassword().length()
                );
            }).toList();
            
            return ResponseEntity.ok(Map.of(
                "totalUsers", users.size(),
                "users", userList,
                "message", "Database connection successful",
                "sampleCredentials", Map.of(
                    "note", "Use existing user credentials or create new ones",
                    "existingUser", userList.isEmpty() ? "None" : userList.get(0),
                    "suggestedLogin", userList.isEmpty() ? "No users found" : "Try username: " + userList.get(0).get("username")
                )
            ));
        } catch (Exception e) {
            System.out.println("Debug: Error checking users - " + e.getMessage());
            e.printStackTrace();
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