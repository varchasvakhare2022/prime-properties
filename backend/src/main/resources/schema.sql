-- Prime Properties Database Schema
-- This file is automatically executed when the PostgreSQL container starts

-- Create the database if it doesn't exist (handled by Docker)
-- CREATE DATABASE prime_properties;

-- Connect to the database
\c prime_properties;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- The tables will be created automatically by Hibernate JPA
-- This file is here for reference and potential manual setup

-- Sample data will be inserted by the DataInitializer class
-- The following are the expected table structures:

/*
-- Users table (created by Hibernate)
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('CUSTOMER', 'DEVELOPER')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Properties table (created by Hibernate)
CREATE TABLE properties (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(15,2) NOT NULL CHECK (price > 0),
    location VARCHAR(100) NOT NULL,
    property_type VARCHAR(50) NOT NULL,
    bedrooms INTEGER NOT NULL CHECK (bedrooms > 0),
    bathrooms INTEGER NOT NULL CHECK (bathrooms > 0),
    area DECIMAL(10,2) NOT NULL CHECK (area > 0),
    status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'SOLD')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    developer_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- Transactions table (created by Hibernate)
CREATE TABLE transactions (
    id BIGSERIAL PRIMARY KEY,
    amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    property_id BIGINT NOT NULL REFERENCES properties(id) ON DELETE CASCADE
);
*/

-- Create indexes for better performance (will be created by Hibernate if needed)
-- CREATE INDEX idx_users_email ON users(email);
-- CREATE INDEX idx_properties_status ON properties(status);
-- CREATE INDEX idx_properties_developer ON properties(developer_id);
-- CREATE INDEX idx_transactions_customer ON transactions(customer_id);
-- CREATE INDEX idx_transactions_property ON transactions(property_id);

-- Sample data will be inserted by the Spring Boot application
-- No manual data insertion needed here
