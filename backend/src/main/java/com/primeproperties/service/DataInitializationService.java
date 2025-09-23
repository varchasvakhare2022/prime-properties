package com.primeproperties.service;

import com.primeproperties.model.Property;
import com.primeproperties.model.User;
import com.primeproperties.repository.PropertyRepository;
import com.primeproperties.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

/**
 * Data initialization service to preload sample users and properties
 */
@Service
public class DataInitializationService implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initializeSampleUsers();
        initializeSampleProperties();
    }

    /**
     * Initialize sample users for testing
     */
    private void initializeSampleUsers() {
        // Check if users already exist
        if (userRepository.count() > 0) {
            return; // Users already exist, skip initialization
        }

        // Create sample developer user
        User developer = new User();
        developer.setUsername("developer");
        developer.setName("John Developer");
        developer.setEmail("developer@prime.com");
        developer.setPassword(passwordEncoder.encode("DevPass123"));
        developer.setRole("DEVELOPER");
        userRepository.save(developer);

        // Create sample customer user
        User customer = new User();
        customer.setUsername("customer");
        customer.setName("Jane Customer");
        customer.setEmail("customer@prime.com");
        customer.setPassword(passwordEncoder.encode("CustPass123"));
        customer.setRole("CUSTOMER");
        userRepository.save(customer);

        System.out.println("Sample users initialized successfully!");
        System.out.println("Developer: developer@prime.com / DevPass123");
        System.out.println("Customer: customer@prime.com / CustPass123");
    }

    /**
     * Initialize sample properties for testing
     */
    private void initializeSampleProperties() {
        // Check if properties already exist
        if (propertyRepository.count() > 0) {
            return; // Properties already exist, skip initialization
        }

        // Get the developer user
        User developer = userRepository.findByUsername("developer")
                .orElseThrow(() -> new RuntimeException("Developer user not found"));

        // Create sample properties
        Property property1 = new Property();
        property1.setTitle("Luxury Apartment in Downtown");
        property1.setDescription("Beautiful 3-bedroom apartment with stunning city views. Modern amenities, granite countertops, hardwood floors, and a private balcony.");
        property1.setPrice(new BigDecimal("750000.00"));
        property1.setLocation("Downtown, New York");
        property1.setPropertyType("Apartment");
        property1.setBedrooms(3);
        property1.setBathrooms(2);
        property1.setArea(120.5);
        property1.setStatus("AVAILABLE");
        property1.setDeveloper(developer);
        propertyRepository.save(property1);

        Property property2 = new Property();
        property2.setTitle("Modern Family House");
        property2.setDescription("Spacious 4-bedroom family home with a large backyard, updated kitchen, and finished basement. Perfect for families.");
        property2.setPrice(new BigDecimal("950000.00"));
        property2.setLocation("Suburbs, California");
        property2.setPropertyType("House");
        property2.setBedrooms(4);
        property2.setBathrooms(3);
        property2.setArea(250.0);
        property2.setStatus("AVAILABLE");
        property2.setDeveloper(developer);
        propertyRepository.save(property2);

        Property property3 = new Property();
        property3.setTitle("Commercial Office Space");
        property3.setDescription("Prime commercial space in business district. Ideal for offices, retail, or restaurants. High foot traffic area.");
        property3.setPrice(new BigDecimal("1200000.00"));
        property3.setLocation("Business District, Chicago");
        property3.setPropertyType("Commercial");
        property3.setBedrooms(0);
        property3.setBathrooms(2);
        property3.setArea(500.0);
        property3.setStatus("SOLD");
        property3.setDeveloper(developer);
        propertyRepository.save(property3);

        System.out.println("Sample properties initialized successfully!");
        System.out.println("Created 3 sample properties for testing");
    }
}
