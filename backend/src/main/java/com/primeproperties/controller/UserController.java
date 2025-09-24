package com.primeproperties.controller;

import com.primeproperties.model.User;
import com.primeproperties.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * User Controller for user-related operations
 */
@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    /**
     * Get current user profile
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
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

    /**
     * Get user by ID (for developers to see customer info)
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('DEVELOPER') or hasRole('ADMIN')")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("id", user.getId());
        userInfo.put("username", user.getUsername());
        userInfo.put("name", user.getName());
        userInfo.put("email", user.getEmail());
        userInfo.put("role", user.getRole());

        return ResponseEntity.ok(userInfo);
    }

    /**
     * Get all users (admin only)
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }
}