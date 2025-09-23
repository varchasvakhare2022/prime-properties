# Prime Properties - JWT Authentication Setup

## 🔐 JWT-Based Authentication System

This backend implements secure JWT-based authentication with role-based access control for the Prime Properties application.

## 🚀 Quick Start

### 1. Environment Setup

#### Database Configuration
```bash
# Start PostgreSQL
sudo service postgresql start

# Create database
createdb prime_properties

# Or using psql
psql -U postgres
CREATE DATABASE prime_properties;
```

#### Environment Variables (Recommended)
Create a `.env` file in the backend directory:
```bash
# Database Configuration
DB_URL=jdbc:postgresql://localhost:5432/prime_properties
DB_USERNAME=postgres
DB_PASSWORD=your_password_here

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_at_least_32_characters_long
JWT_EXPIRATION=86400000
```

#### Or Update application.properties
```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/prime_properties
spring.datasource.username=postgres
spring.datasource.password=your_password_here

# JWT Configuration
jwt.secret=your_super_secret_jwt_key_here_at_least_32_characters_long
jwt.expiration=86400000
```

### 2. Run the Application
```bash
cd backend
./mvnw spring-boot:run
```

## 🔑 Authentication Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "CUSTOMER"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 86400000,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "CUSTOMER"
  }
}
```

### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 86400000,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "CUSTOMER"
  }
}
```

### Get Current User Profile
```http
GET /api/users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🛡️ Protected Endpoints

### Developer Endpoints (Require ROLE_DEVELOPER)
- `POST /api/properties/developer` - Create property
- `PUT /api/properties/developer/{id}` - Update property
- `PUT /api/properties/developer/{id}/mark-sold` - Mark property as sold
- `GET /api/properties/developer` - Get developer's properties

### Customer Endpoints (Require ROLE_CUSTOMER)
- `GET /api/customer/properties` - Get available properties
- `POST /api/customer/transactions` - Create transaction

### Public Endpoints (No Authentication Required)
- `GET /api/properties` - Get all available properties
- `GET /api/properties/public` - Get public property listings

## 🧪 Test Credentials

The application automatically creates sample users on startup:

| Role | Email | Password |
|------|-------|----------|
| Developer | developer@prime.com | DevPass123 |
| Customer | customer@prime.com | CustPass123 |
| Admin | admin@prime.com | AdminPass123 |

## 📋 Testing with Postman/curl

### 1. Register a new user
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "CUSTOMER"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Use the token for protected endpoints
```bash
curl -X GET http://localhost:8080/api/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## 🔒 Security Features

- **BCrypt Password Hashing**: All passwords are securely hashed using BCrypt
- **JWT Token Security**: Tokens are signed with HMAC-SHA256
- **Role-Based Access Control**: Method-level security with @PreAuthorize
- **CORS Configuration**: Configured for frontend origins (localhost:3000, localhost:5173)
- **Input Validation**: Comprehensive validation using Bean Validation
- **Exception Handling**: Global exception handler for consistent error responses

## 🏗️ Architecture

### Security Components
- `JwtUtils`: JWT token generation and validation
- `AuthTokenFilter`: JWT authentication filter
- `UserDetailsServiceImpl`: User details service implementation
- `WebSecurityConfig`: Security configuration with CORS
- `GlobalExceptionHandler`: Global exception handling

### DTOs
- `LoginRequest`: Login request validation
- `RegisterRequest`: Registration request validation
- `AuthResponse`: Authentication response with user info

### Controllers
- `AuthController`: Authentication endpoints (/api/auth/*)
- `UserController`: User profile endpoints (/api/users/*)
- `PropertyController`: Property management with role-based access

## 🚨 Security Notes

1. **JWT Secret**: Use a strong, random secret key (at least 32 characters)
2. **Token Expiration**: Default 24 hours, adjust as needed
3. **HTTPS**: Use HTTPS in production
4. **Environment Variables**: Keep secrets out of version control
5. **Password Policy**: Implement strong password requirements in production

## 🔧 Configuration Options

### JWT Configuration
```properties
# Token expiration time in milliseconds (24 hours)
jwt.expiration=86400000

# JWT secret key (use environment variable in production)
jwt.secret=your_secret_key_here
```

### CORS Configuration
The application is configured to allow requests from:
- `http://localhost:3000` (React default)
- `http://localhost:5173` (Vite default)
- `http://127.0.0.1:3000`
- `http://127.0.0.1:5173`

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('CUSTOMER', 'DEVELOPER')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check database credentials
   - Verify database exists

2. **JWT Token Invalid**
   - Check JWT secret configuration
   - Verify token format (Bearer <token>)
   - Check token expiration

3. **CORS Issues**
   - Verify frontend URL is in allowed origins
   - Check CORS configuration in WebSecurityConfig

4. **Role-Based Access Denied**
   - Verify user has correct role
   - Check @PreAuthorize annotations
   - Ensure JWT contains role claims

## 📝 API Documentation

For complete API documentation, visit: `http://localhost:8080/swagger-ui.html` (if Swagger is enabled)

## 🔄 Next Steps

1. Implement refresh token mechanism
2. Add email verification
3. Implement password reset functionality
4. Add rate limiting
5. Implement audit logging
6. Add API versioning
