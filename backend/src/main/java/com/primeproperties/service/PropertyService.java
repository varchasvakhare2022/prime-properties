package com.primeproperties.service;

import com.primeproperties.dto.CreatePropertyRequest;
import com.primeproperties.dto.PropertyResponse;
import com.primeproperties.dto.UpdatePropertyRequest;
import com.primeproperties.model.Property;
import com.primeproperties.model.User;
import com.primeproperties.repository.PropertyRepository;
import com.primeproperties.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service for property-related business logic
 */
@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Get all properties
     */
    public List<PropertyResponse> getAllProperties() {
        return propertyRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get property by ID
     */
    public Optional<PropertyResponse> getPropertyById(Long id) {
        return propertyRepository.findById(id)
                .map(this::convertToResponse);
    }

    /**
     * Get properties by developer
     */
    public List<PropertyResponse> getPropertiesByDeveloper(Long developerId) {
        return propertyRepository.findByDeveloperId(developerId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Create a new property
     */
    public PropertyResponse createProperty(CreatePropertyRequest request, Long developerId) {
        User developer = userRepository.findById(developerId)
                .orElseThrow(() -> new RuntimeException("Developer not found"));

        Property property = new Property();
        property.setTitle(request.getTitle());
        property.setDescription(request.getDescription());
        property.setPrice(request.getPrice());
        property.setLocation(request.getLocation());
        property.setPropertyType(request.getPropertyType());
        property.setBedrooms(request.getBedrooms());
        property.setBathrooms(request.getBathrooms());
        property.setArea(request.getArea());
        property.setDeveloper(developer);

        Property savedProperty = propertyRepository.save(property);
        return convertToResponse(savedProperty);
    }

    /**
     * Update a property
     */
    public PropertyResponse updateProperty(Long id, UpdatePropertyRequest request, Long developerId) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        // Check if the property belongs to the developer
        if (!property.getDeveloper().getId().equals(developerId)) {
            throw new RuntimeException("You can only update your own properties");
        }

        property.setTitle(request.getTitle());
        property.setDescription(request.getDescription());
        property.setPrice(request.getPrice());
        property.setLocation(request.getLocation());
        property.setPropertyType(request.getPropertyType());
        property.setBedrooms(request.getBedrooms());
        property.setBathrooms(request.getBathrooms());
        property.setArea(request.getArea());

        Property updatedProperty = propertyRepository.save(property);
        return convertToResponse(updatedProperty);
    }

    /**
     * Delete a property
     */
    public void deleteProperty(Long id, Long developerId) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        // Check if the property belongs to the developer
        if (!property.getDeveloper().getId().equals(developerId)) {
            throw new RuntimeException("You can only delete your own properties");
        }

        propertyRepository.delete(property);
    }

    /**
     * Mark property as sold
     */
    public PropertyResponse markPropertyAsSold(Long id, Long developerId) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        // Check if the property belongs to the developer
        if (!property.getDeveloper().getId().equals(developerId)) {
            throw new RuntimeException("You can only update your own properties");
        }

        property.setStatus("SOLD");
        Property updatedProperty = propertyRepository.save(property);
        return convertToResponse(updatedProperty);
    }

    /**
     * Convert Property entity to PropertyResponse DTO
     */
    private PropertyResponse convertToResponse(Property property) {
        return new PropertyResponse(
                property.getId(),
                property.getTitle(),
                property.getDescription(),
                property.getPrice(),
                property.getLocation(),
                property.getPropertyType(),
                property.getBedrooms(),
                property.getBathrooms(),
                property.getArea(),
                property.getStatus(),
                property.getCreatedAt(),
                property.getUpdatedAt(),
                property.getDeveloper().getName(),
                property.getDeveloper().getEmail()
        );
    }
}
