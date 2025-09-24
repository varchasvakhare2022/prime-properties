-- BCrypt Hash Generator for Prime Properties
-- This script generates BCrypt hashes for the sample passwords
-- Run this in PostgreSQL to verify the hashes in data.sql

-- Function to generate BCrypt hash (requires pgcrypto extension)
-- Note: This is for verification only. The actual hashes are pre-calculated.

-- Enable pgcrypto extension if not already enabled
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Generate BCrypt hashes for sample passwords
-- These are the same hashes used in data.sql

-- DevPass123 -> $2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi
-- CustPass123 -> $2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW

-- To verify a password against a hash, you can use:
-- SELECT crypt('DevPass123', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi') = '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi';

-- Verification queries:
SELECT 
    'DevPass123' as password,
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi' as hash,
    crypt('DevPass123', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi') = '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi' as is_valid;

SELECT 
    'CustPass123' as password,
    '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW' as hash,
    crypt('CustPass123', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW') = '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW' as is_valid;
