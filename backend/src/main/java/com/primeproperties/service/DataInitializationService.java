package com.primeproperties.service;

import com.primeproperties.model.User;
import com.primeproperties.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


/**
 * Service to initialize sample data if not already present
 * This ensures sample users exist even if data.sql doesn't execute properly
 */
@Service
public class DataInitializationService implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("=== Data Initialization Service Starting ===");
        
        // Check if users already exist
        long userCount = userRepository.count();
        System.out.println("Current user count: " + userCount);
        
        if (userCount == 0) {
            System.out.println("No users found. Creating sample users...");
            createSampleUsers();
        } else {
            System.out.println("Users already exist. Skipping user creation.");
        }
        
        System.out.println("=== Data Initialization Service Complete ===");
    }

    private void createSampleUsers() {
        try {
            // Create Developer User
            User developer = new User();
            developer.setId(1L);
            developer.setUsername("developer");
            developer.setName("Developer User");
            developer.setEmail("developer@prime.com");
            developer.setPassword(passwordEncoder.encode("DevPass123"));
            developer.setRole("DEVELOPER");
            
            userRepository.save(developer);
            System.out.println("✅ Created Developer User: developer@prime.com / DevPass123");

            // Create Customer User
            User customer = new User();
            customer.setId(2L);
            customer.setUsername("customer");
            customer.setName("Customer User");
            customer.setEmail("customer@prime.com");
            customer.setPassword(passwordEncoder.encode("CustPass123"));
            customer.setRole("CUSTOMER");
            
            userRepository.save(customer);
            System.out.println("✅ Created Customer User: customer@prime.com / CustPass123");
            
            System.out.println("🎉 Sample users created successfully!");
            System.out.println("📝 Login Credentials:");
            System.out.println("   Developer: developer@prime.com / DevPass123");
            System.out.println("   Customer: customer@prime.com / CustPass123");
            
        } catch (Exception e) {
            System.err.println("❌ Error creating sample users: " + e.getMessage());
            e.printStackTrace();
        }
    }
}