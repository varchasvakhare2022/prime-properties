package com.primeproperties.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO for property response
 */
public class PropertyResponse {
    
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private String location;
    private String propertyType;
    private Integer bedrooms;
    private Integer bathrooms;
    private Double area;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String developerName;
    private String developerEmail;

    // Constructors
    public PropertyResponse() {}

    public PropertyResponse(Long id, String title, String description, BigDecimal price, String location,
                           String propertyType, Integer bedrooms, Integer bathrooms, Double area, String status,
                           LocalDateTime createdAt, LocalDateTime updatedAt, String developerName, String developerEmail) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.location = location;
        this.propertyType = propertyType;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.area = area;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.developerName = developerName;
        this.developerEmail = developerEmail;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getDeveloperName() {
        return developerName;
    }

    public void setDeveloperName(String developerName) {
        this.developerName = developerName;
    }

    public String getDeveloperEmail() {
        return developerEmail;
    }

    public void setDeveloperEmail(String developerEmail) {
        this.developerEmail = developerEmail;
    }
}
