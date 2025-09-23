package com.primeproperties.controller;

import com.primeproperties.model.Property;
import com.primeproperties.model.User;
import com.primeproperties.repository.PropertyRepository;
import com.primeproperties.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/properties")
public class PropertyController {
    
    @Autowired
    PropertyRepository propertyRepository;
    
    @Autowired
    UserRepository userRepository;
    
    @GetMapping("/public")
    public ResponseEntity<List<Property>> getAllAvailableProperties() {
        List<Property> properties = propertyRepository.findByIsSoldFalse();
        return ResponseEntity.ok(properties);
    }
    
    @GetMapping("/developer")
    @PreAuthorize("hasRole('DEVELOPER')")
    public ResponseEntity<List<Property>> getDeveloperProperties() {
        User currentUser = getCurrentUser();
        List<Property> properties = propertyRepository.findByDeveloperId(currentUser.getId());
        return ResponseEntity.ok(properties);
    }
    
    @PostMapping("/developer")
    @PreAuthorize("hasRole('DEVELOPER')")
    public ResponseEntity<?> createProperty(@RequestBody Property property) {
        try {
            User currentUser = getCurrentUser();
            property.setDeveloper(currentUser);
            Property savedProperty = propertyRepository.save(property);
            return ResponseEntity.ok(savedProperty);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Error creating property: " + e.getMessage());
        }
    }
    
    @PutMapping("/developer/{id}")
    @PreAuthorize("hasRole('DEVELOPER')")
    public ResponseEntity<?> updateProperty(@PathVariable Long id, @RequestBody Property propertyDetails) {
        try {
            User currentUser = getCurrentUser();
            Optional<Property> propertyOptional = propertyRepository.findById(id);
            
            if (propertyOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Property property = propertyOptional.get();
            
            // Check if the property belongs to the current developer
            if (!property.getDeveloper().getId().equals(currentUser.getId())) {
                return ResponseEntity.forbidden().build();
            }
            
            // Update property details
            property.setTitle(propertyDetails.getTitle());
            property.setDescription(propertyDetails.getDescription());
            property.setPrice(propertyDetails.getPrice());
            property.setLocation(propertyDetails.getLocation());
            property.setPropertyType(propertyDetails.getPropertyType());
            property.setBedrooms(propertyDetails.getBedrooms());
            property.setBathrooms(propertyDetails.getBathrooms());
            property.setArea(propertyDetails.getArea());
            
            Property updatedProperty = propertyRepository.save(property);
            return ResponseEntity.ok(updatedProperty);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Error updating property: " + e.getMessage());
        }
    }
    
    @PutMapping("/developer/{id}/mark-sold")
    @PreAuthorize("hasRole('DEVELOPER')")
    public ResponseEntity<?> markPropertyAsSold(@PathVariable Long id) {
        try {
            User currentUser = getCurrentUser();
            Optional<Property> propertyOptional = propertyRepository.findById(id);
            
            if (propertyOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Property property = propertyOptional.get();
            
            // Check if the property belongs to the current developer
            if (!property.getDeveloper().getId().equals(currentUser.getId())) {
                return ResponseEntity.forbidden().build();
            }
            
            property.setIsSold(true);
            Property updatedProperty = propertyRepository.save(property);
            return ResponseEntity.ok(updatedProperty);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Error marking property as sold: " + e.getMessage());
        }
    }
    
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
