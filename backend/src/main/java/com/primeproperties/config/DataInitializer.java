package com.primeproperties.config;

import com.primeproperties.model.User;
import com.primeproperties.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Create sample developer if not exists
        if (userRepository.findByEmail("developer@prime.com").isEmpty()) {
            User developer = new User();
            developer.setUsername("developer");
            developer.setName("John Developer");
            developer.setEmail("developer@prime.com");
            developer.setPassword(passwordEncoder.encode("DevPass123"));
            developer.setRole("DEVELOPER");
            userRepository.save(developer);
            System.out.println("✅ Sample developer created: developer@prime.com / DevPass123");
        }
        
        // Create sample customer if not exists
        if (userRepository.findByEmail("customer@prime.com").isEmpty()) {
            User customer = new User();
            customer.setUsername("customer");
            customer.setName("Jane Customer");
            customer.setEmail("customer@prime.com");
            customer.setPassword(passwordEncoder.encode("CustPass123"));
            customer.setRole("CUSTOMER");
            userRepository.save(customer);
            System.out.println("✅ Sample customer created: customer@prime.com / CustPass123");
        }
        
        System.out.println("🎉 Database initialization completed!");
        System.out.println("📊 Total users in database: " + userRepository.count());
        System.out.println("");
        System.out.println("🔐 Test Credentials:");
        System.out.println("   Developer: developer@prime.com / DevPass123");
        System.out.println("   Customer:  customer@prime.com / CustPass123");
    }
}