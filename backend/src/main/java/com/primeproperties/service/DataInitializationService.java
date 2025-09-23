package com.primeproperties.service;

import org.springframework.boot.CommandLineRunner;

/**
 * Data initialization service to preload sample users and properties
 * Disabled - using data.sql for initialization instead
 */
// @Service
public class DataInitializationService implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        // Data initialization is now handled by data.sql
        // This class is disabled to avoid conflicts
    }
}