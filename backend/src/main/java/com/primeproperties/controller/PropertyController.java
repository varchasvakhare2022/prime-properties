package com.primeproperties.controller;

import com.primeproperties.dto.CreatePropertyRequest;
import com.primeproperties.dto.PropertyResponse;
import com.primeproperties.dto.UpdatePropertyRequest;
import com.primeproperties.model.User;
import com.primeproperties.repository.UserRepository;
import com.primeproperties.service.PropertyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Property Controller with CRUD endpoints and role-based security
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/properties")
public class PropertyController {
    
    @Autowired
    private PropertyService propertyService;
    
    @Autowired
    private UserRepository userRepository;
    
    /**
     * Get all properties (available to everyone)
     */
    @GetMapping
    public ResponseEntity<List<PropertyResponse>> getAllProperties() {
        List<PropertyResponse> properties = propertyService.getAllProperties();
        return ResponseEntity.ok(properties);
    }
    
    /**
     * Get property by ID (available to everyone)
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getPropertyById(@PathVariable Long id) {
        Optional<PropertyResponse> property = propertyService.getPropertyById(id);
        if (property.isPresent()) {
            return ResponseEntity.ok(property.get());
        } else {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Property not found");
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Get properties by developer (developer only)
     */
    @GetMapping("/developer/my-properties")
    @PreAuthorize("hasRole('DEVELOPER')")
    public ResponseEntity<List<PropertyResponse>> getMyProperties(Authentication authentication) {
        User currentUser = getCurrentUser(authentication);
        List<PropertyResponse> properties = propertyService.getPropertiesByDeveloper(currentUser.getId());
        return ResponseEntity.ok(properties);
    }
    
    /**
     * Create a new property (developer only)
     */
    @PostMapping("/developer")
    @PreAuthorize("hasRole('DEVELOPER')")
    public ResponseEntity<?> createProperty(@Valid @RequestBody CreatePropertyRequest request, 
                                          Authentication authentication) {
        try {
            User currentUser = getCurrentUser(authentication);
            PropertyResponse property = propertyService.createProperty(request, currentUser.getId());
            return ResponseEntity.ok(property);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error creating property: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Update a property (developer only - own properties)
     */
    @PutMapping("/developer/{id}")
    @PreAuthorize("hasRole('DEVELOPER')")
    public ResponseEntity<?> updateProperty(@PathVariable Long id, 
                                          @Valid @RequestBody UpdatePropertyRequest request,
                                          Authentication authentication) {
        try {
            User currentUser = getCurrentUser(authentication);
            PropertyResponse property = propertyService.updateProperty(id, request, currentUser.getId());
            return ResponseEntity.ok(property);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            if (e.getMessage().contains("not found")) {
                return ResponseEntity.notFound().build();
            } else if (e.getMessage().contains("own properties")) {
                return ResponseEntity.status(403).body(error);
            }
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Delete a property (developer only - own properties)
     */
    @DeleteMapping("/developer/{id}")
    @PreAuthorize("hasRole('DEVELOPER')")
    public ResponseEntity<?> deleteProperty(@PathVariable Long id, Authentication authentication) {
        try {
            User currentUser = getCurrentUser(authentication);
            propertyService.deleteProperty(id, currentUser.getId());
            Map<String, String> response = new HashMap<>();
            response.put("message", "Property deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            if (e.getMessage().contains("not found")) {
                return ResponseEntity.notFound().build();
            } else if (e.getMessage().contains("own properties")) {
                return ResponseEntity.status(403).body(error);
            }
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Mark property as sold (developer only - own properties)
     */
    @PutMapping("/developer/{id}/mark-sold")
    @PreAuthorize("hasRole('DEVELOPER')")
    public ResponseEntity<?> markPropertyAsSold(@PathVariable Long id, Authentication authentication) {
        try {
            User currentUser = getCurrentUser(authentication);
            PropertyResponse property = propertyService.markPropertyAsSold(id, currentUser.getId());
            return ResponseEntity.ok(property);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            if (e.getMessage().contains("not found")) {
                return ResponseEntity.notFound().build();
            } else if (e.getMessage().contains("own properties")) {
                return ResponseEntity.status(403).body(error);
            }
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get current authenticated user
     */
    private User getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}