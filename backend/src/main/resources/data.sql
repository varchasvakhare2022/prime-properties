-- Prime Properties Sample Data
-- This file contains sample data for testing the Prime Properties application
-- Spring Boot will automatically execute this file on startup

-- Clear existing data (optional - uncomment if you want to reset data on each startup)
-- DELETE FROM transactions;
-- DELETE FROM properties;
-- DELETE FROM users;
-- DELETE FROM roles;

-- Insert default roles if they don't exist
INSERT INTO roles (name) VALUES ('CUSTOMER') ON CONFLICT (name) DO NOTHING;
INSERT INTO roles (name) VALUES ('DEVELOPER') ON CONFLICT (name) DO NOTHING;
INSERT INTO roles (name) VALUES ('ADMIN') ON CONFLICT (name) DO NOTHING;

-- Insert sample users
-- Note: Passwords are BCrypt hashed for security
-- Plaintext passwords are commented for reference

-- Developer User
-- Plaintext password: DevPass123
INSERT INTO users (id, username, name, email, password, role, created_at, updated_at) 
VALUES (
    1,
    'developer',
    'Developer User',
    'developer@prime.com',
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', -- DevPass123
    'DEVELOPER',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
) ON CONFLICT (id) DO UPDATE SET
    username = EXCLUDED.username,
    name = EXCLUDED.name,
    email = EXCLUDED.email,
    password = EXCLUDED.password,
    role = EXCLUDED.role,
    updated_at = CURRENT_TIMESTAMP;

-- Customer User
-- Plaintext password: CustPass123
INSERT INTO users (id, username, name, email, password, role, created_at, updated_at) 
VALUES (
    2,
    'customer',
    'Customer User',
    'customer@prime.com',
    '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', -- CustPass123
    'CUSTOMER',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
) ON CONFLICT (id) DO UPDATE SET
    username = EXCLUDED.username,
    name = EXCLUDED.name,
    email = EXCLUDED.email,
    password = EXCLUDED.password,
    role = EXCLUDED.role,
    updated_at = CURRENT_TIMESTAMP;

-- Insert sample properties
-- All properties are created by the Developer User (id = 1)

-- Luxury Apartment in Mumbai (Available)
INSERT INTO properties (
    id, title, description, price, location, property_type, 
    bedrooms, bathrooms, area, status, created_at, updated_at, developer_id
) VALUES (
    1,
    'Luxury Apartment in Mumbai',
    'Stunning 3BHK luxury apartment in the heart of Mumbai with panoramic city views. Features modern amenities, marble flooring, modular kitchen, and premium fixtures. Located in a prestigious building with 24/7 security, gym, swimming pool, and parking.',
    15000000.00, -- 1.5 Crore INR
    'Bandra West, Mumbai',
    'Apartment',
    3,
    2,
    1200.0,
    'AVAILABLE',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    1 -- Developer User
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    property_type = EXCLUDED.property_type,
    bedrooms = EXCLUDED.bedrooms,
    bathrooms = EXCLUDED.bathrooms,
    area = EXCLUDED.area,
    status = EXCLUDED.status,
    updated_at = CURRENT_TIMESTAMP;

-- Villa in Bangalore (Available)
INSERT INTO properties (
    id, title, description, price, location, property_type, 
    bedrooms, bathrooms, area, status, created_at, updated_at, developer_id
) VALUES (
    2,
    'Modern Villa in Bangalore',
    'Beautiful 4BHK independent villa in Bangalore with a private garden and terrace. Features contemporary design, spacious living areas, modern kitchen, and premium finishes. Perfect for families looking for luxury and privacy.',
    25000000.00, -- 2.5 Crore INR
    'Whitefield, Bangalore',
    'Villa',
    4,
    3,
    2500.0,
    'AVAILABLE',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    1 -- Developer User
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    property_type = EXCLUDED.property_type,
    bedrooms = EXCLUDED.bedrooms,
    bathrooms = EXCLUDED.bathrooms,
    area = EXCLUDED.area,
    status = EXCLUDED.status,
    updated_at = CURRENT_TIMESTAMP;

-- 2BHK in Delhi (Sold)
INSERT INTO properties (
    id, title, description, price, location, property_type, 
    bedrooms, bathrooms, area, status, created_at, updated_at, developer_id
) VALUES (
    3,
    'Cozy 2BHK in Delhi',
    'Well-designed 2BHK apartment in Delhi with modern amenities and excellent connectivity. Features spacious bedrooms, modern kitchen, and living area. Located near metro station with easy access to business districts.',
    8500000.00, -- 85 Lakh INR
    'Dwarka, Delhi',
    'Apartment',
    2,
    2,
    950.0,
    'SOLD',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    1 -- Developer User
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    property_type = EXCLUDED.property_type,
    bedrooms = EXCLUDED.bedrooms,
    bathrooms = EXCLUDED.bathrooms,
    area = EXCLUDED.area,
    status = EXCLUDED.status,
    updated_at = CURRENT_TIMESTAMP;

-- Insert sample transaction for the sold property
-- Transaction for the 2BHK in Delhi (property_id = 3) by Customer User (customer_id = 2)
INSERT INTO transactions (
    id, amount, transaction_date, created_at, customer_id, property_id
) VALUES (
    1,
    8500000.00, -- 85 Lakh INR
    CURRENT_TIMESTAMP - INTERVAL '30 days', -- Sold 30 days ago
    CURRENT_TIMESTAMP,
    2, -- Customer User
    3  -- 2BHK in Delhi
) ON CONFLICT (id) DO UPDATE SET
    amount = EXCLUDED.amount,
    transaction_date = EXCLUDED.transaction_date,
    updated_at = CURRENT_TIMESTAMP;

-- Reset sequences to ensure proper ID generation for new records
-- This ensures that new records get IDs starting from the next available number
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('properties_id_seq', (SELECT MAX(id) FROM properties));
SELECT setval('transactions_id_seq', (SELECT MAX(id) FROM transactions));

-- Display summary of inserted data
DO $$
BEGIN
    RAISE NOTICE 'Prime Properties Sample Data Loaded Successfully!';
    RAISE NOTICE 'Users: %', (SELECT COUNT(*) FROM users);
    RAISE NOTICE 'Properties: %', (SELECT COUNT(*) FROM properties);
    RAISE NOTICE 'Transactions: %', (SELECT COUNT(*) FROM transactions);
    RAISE NOTICE '';
    RAISE NOTICE 'Sample Login Credentials:';
    RAISE NOTICE 'Developer: developer@prime.com / DevPass123';
    RAISE NOTICE 'Customer: customer@prime.com / CustPass123';
END $$;
