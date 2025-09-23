package com.primeproperties.config;

import org.springframework.boot.CommandLineRunner;

// Disabled - using data.sql for initialization instead
// @Component
public class DataInitializer implements CommandLineRunner {
    
    @Override
    public void run(String... args) throws Exception {
        // Data initialization is now handled by data.sql
        // This class is disabled to avoid conflicts
    }
}