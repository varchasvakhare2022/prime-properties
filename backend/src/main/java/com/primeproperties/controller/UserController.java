package com.primeproperties.controller;

import com.primeproperties.dto.AuthResponse;
import com.primeproperties.model.User;
import com.primeproperties.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    UserRepository userRepository;
    
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
                .badRequest()
                .body("Error: " + e.getMessage());
        }
    }
    
    /**
     * Get all users (Admin only)
     * @return List of all users
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            List<AuthResponse.UserInfo> userInfos = users.stream()
                .map(user -> new AuthResponse.UserInfo(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole()
                ))
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(userInfos);
            
        } catch (Exception e) {
            return ResponseEntity
                .badRequest()
                .body("Error: " + e.getMessage());
        }
    }
}
