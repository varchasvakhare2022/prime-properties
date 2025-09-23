package com.primeproperties.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "properties")
public class Property {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Size(max = 200)
    private String title;
    
    @NotBlank
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotNull
    @Positive
    private BigDecimal price;
    
    @NotBlank
    @Size(max = 100)
    private String location;
    
    @NotBlank
    @Size(max = 50)
    private String propertyType; // e.g., "Apartment", "House", "Commercial"
    
    @NotNull
    @Positive
    private Integer bedrooms;
    
    @NotNull
    @Positive
    private Integer bathrooms;
    
    @NotNull
    @Positive
    private Double area; // in square meters
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PropertyStatus status = PropertyStatus.AVAILABLE;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "developer_id", nullable = false)
    private User developer;
    
    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Transaction> transactions;
    
    // Constructors
    public Property() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public Property(String title, String description, BigDecimal price, String location, 
                   String propertyType, Integer bedrooms, Integer bathrooms, Double area, User developer) {
        this();
        this.title = title;
        this.description = description;
        this.price = price;
        this.location = location;
        this.propertyType = propertyType;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.area = area;
        this.developer = developer;
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
    
    public PropertyStatus getStatus() {
        return status;
    }
    
    public void setStatus(PropertyStatus status) {
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
    
    public User getDeveloper() {
        return developer;
    }
    
    public void setDeveloper(User developer) {
        this.developer = developer;
    }
    
    public List<Transaction> getTransactions() {
        return transactions;
    }
    
    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
