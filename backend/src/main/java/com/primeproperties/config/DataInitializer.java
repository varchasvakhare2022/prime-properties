package com.primeproperties.config;

import com.primeproperties.model.Role;
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
            User developer = new User(
                "John Developer",
                "developer@prime.com",
                passwordEncoder.encode("DevPass123"),
                Role.DEVELOPER
            );
            userRepository.save(developer);
            System.out.println("✅ Sample developer created: developer@prime.com / DevPass123");
        }
        
        // Create sample customer if not exists
        if (userRepository.findByEmail("customer@prime.com").isEmpty()) {
            User customer = new User(
                "Jane Customer",
                "customer@prime.com",
                passwordEncoder.encode("CustPass123"),
                Role.CUSTOMER
            );
            userRepository.save(customer);
            System.out.println("✅ Sample customer created: customer@prime.com / CustPass123");
        }
        
        // Create admin user if not exists
        if (userRepository.findByEmail("admin@prime.com").isEmpty()) {
            User admin = new User(
                "Admin User",
                "admin@prime.com",
                passwordEncoder.encode("AdminPass123"),
                Role.DEVELOPER // Using DEVELOPER role for admin functionality
            );
            userRepository.save(admin);
            System.out.println("✅ Sample admin created: admin@prime.com / AdminPass123");
        }
        
        System.out.println("🎉 Database initialization completed!");
        System.out.println("📊 Total users in database: " + userRepository.count());
        System.out.println("");
        System.out.println("🔐 Test Credentials:");
        System.out.println("   Developer: developer@prime.com / DevPass123");
        System.out.println("   Customer:  customer@prime.com / CustPass123");
        System.out.println("   Admin:     admin@prime.com / AdminPass123");
    }
}