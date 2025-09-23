package com.primeproperties.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

/**
 * DTO for updating a property
 */
public class UpdatePropertyRequest {
    
    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private BigDecimal price;

    @NotBlank(message = "Location is required")
    @Size(max = 100, message = "Location must not exceed 100 characters")
    private String location;

    @NotBlank(message = "Property type is required")
    @Size(max = 50, message = "Property type must not exceed 50 characters")
    private String propertyType;

    @NotNull(message = "Number of bedrooms is required")
    @Positive(message = "Bedrooms must be positive")
    private Integer bedrooms;

    @NotNull(message = "Number of bathrooms is required")
    @Positive(message = "Bathrooms must be positive")
    private Integer bathrooms;

    @NotNull(message = "Area is required")
    @Positive(message = "Area must be positive")
    private Double area;

    // Constructors
    public UpdatePropertyRequest() {}

    public UpdatePropertyRequest(String title, String description, BigDecimal price, String location,
                                String propertyType, Integer bedrooms, Integer bathrooms, Double area) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.location = location;
        this.propertyType = propertyType;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.area = area;
    }

    // Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public Integer getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(Integer bedrooms) {
        this.bedrooms = bedrooms;
    }

    public Integer getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(Integer bathrooms) {
        this.bathrooms = bathrooms;
    }

    public Double getArea() {
        return area;
    }

    public void setArea(Double area) {
        this.area = area;
    }
}
