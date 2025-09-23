# Prime Properties - Full Stack Real Estate Platform

A complete full-stack web application for real estate management with modern UI and secure authentication.

## 🏗️ Architecture

- **Frontend**: React 18 + Tailwind CSS + Aceternity UI + Framer Motion
- **Backend**: Spring Boot 3.2 + Spring Security + JPA + PostgreSQL
- **Authentication**: JWT-based with role-based access control
- **Database**: PostgreSQL with auto-generated schema
- **Styling**: Tailwind CSS with Aceternity UI components

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Java 17+
- PostgreSQL 12+
- Maven 3.6+

### 1. Clone the Repository
```bash
git clone <repository-url>
cd prime-properties
```

### 2. Database Setup
```bash
# Start PostgreSQL
sudo service postgresql start

# Create database
createdb prime_properties

# Or using psql
psql -U postgres
CREATE DATABASE prime_properties;
\q
```

### 3. Backend Setup
```bash
cd backend

# Update database credentials in application.properties if needed
# Default values:
# - Database: prime_properties
# - Username: postgres  
# - Password: password

# Run the application
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### 4. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will start on `http://localhost:3000`

## 🔐 Sample Test Credentials

The application automatically creates sample users on startup:

| Role | Email | Password |
|------|-------|----------|
| Developer | developer@prime.com | DevPass123 |
| Customer | customer@prime.com | CustPass123 |

## 📱 Features

### Customer Features
- Browse available properties
- View detailed property information
- Create transactions for property purchases
- View transaction history

### Developer Features
- List properties for sale
- Edit property details
- Mark properties as sold
- Manage property portfolio
- View transaction history for their properties

### Authentication
- JWT-based authentication
- Role-based access control (Customer/Developer)
- Secure login/logout functionality

## 🎨 Frontend Features

- **Modern React 18** with hooks and functional components
- **Tailwind CSS** for utility-first styling
- **Aceternity UI Components** for stunning animations and effects
- **Framer Motion** for smooth animations and transitions
- **Lucide React** for beautiful icons
- **Responsive Design** that works on all devices
- **Dark Theme** with gradient backgrounds

## 🔧 Configuration

### Backend Configuration (`application.properties`)
```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/prime_properties
spring.datasource.username=postgres
spring.datasource.password=password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret=sample_secret_for_testing_change_in_production
jwt.expiration=86400000

# Server Configuration
server.port=8080
```

### Frontend Configuration
- API URL: `http://localhost:8080/api`
- Development server: `http://localhost:3000`

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/users/me` - Get current user profile

### Properties
- `GET /api/properties` - Get all available properties (public)
- `GET /api/properties/developer` - Get developer's properties (requires DEVELOPER role)
- `POST /api/properties/developer` - Create new property (requires DEVELOPER role)
- `PUT /api/properties/developer/{id}` - Update property (requires DEVELOPER role)
- `PUT /api/properties/developer/{id}/mark-sold` - Mark property as sold (requires DEVELOPER role)

### Transactions
- `GET /api/transactions/customer` - Get customer's transactions (requires CUSTOMER role)
- `GET /api/transactions/property/{propertyId}` - Get property transactions (requires DEVELOPER role)
- `POST /api/transactions/create` - Create new transaction (requires CUSTOMER role)
- `GET /api/transactions/{id}` - Get transaction by ID
- `DELETE /api/transactions/{id}` - Delete transaction (requires CUSTOMER role)

## 🧪 Testing

### Using Postman/curl

#### 1. Register a new user
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

#### 2. Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### 3. Use the token for protected endpoints
```bash
curl -X GET http://localhost:8080/api/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Using the Frontend
1. Open `http://localhost:3000`
2. Click "Customer Login" or "Developer Login"
3. Use the sample credentials provided above
4. Explore the dashboard features

## 🐳 Docker Support

### Using Docker Compose (Recommended)
```bash
# Start all services
docker-compose up --build

# Access points:
# Frontend: http://localhost:3000
# Backend: http://localhost:8080
# PostgreSQL: localhost:5432
```

### Manual Docker Setup
```bash
# Backend
cd backend
docker build -t prime-properties-backend .
docker run -p 8080:8080 prime-properties-backend

# Frontend
cd frontend
docker build -t prime-properties-frontend .
docker run -p 3000:3000 prime-properties-frontend
```

## 📁 Project Structure

```
prime-properties/
├── backend/
│   ├── src/main/java/com/primeproperties/
│   │   ├── config/          # Security and web configuration
│   │   ├── controller/      # REST API controllers
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── exception/      # Global exception handling
│   │   ├── model/          # JPA entities
│   │   ├── repository/     # Data access layer
│   │   ├── security/       # JWT and security components
│   │   └── service/        # Business logic
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── src/test/           # Test files
│   ├── Dockerfile
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   │   └── ui/         # Aceternity UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services and context
│   │   └── lib/           # Utility functions
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   └── Dockerfile
├── docker-compose.yml
├── README.md
└── AUTHENTICATION.md
```

## 🔒 Security Features

- **BCrypt Password Hashing**: All passwords are securely hashed
- **JWT Token Security**: Tokens are signed with HMAC-SHA256
- **Role-Based Access Control**: Method-level security with @PreAuthorize
- **CORS Configuration**: Configured for frontend origins
- **Input Validation**: Comprehensive validation using Bean Validation
- **Exception Handling**: Global exception handler for consistent error responses

## 🎨 UI Components

### Available Aceternity UI Components
- **AnimatedCard**: Cards with hover animations and smooth transitions
- **ShimmerButton**: Buttons with shimmer effects and animations
- **ShimmerCard**: Cards with animated shimmer backgrounds
- **GradientBorder**: Cards with animated gradient borders
- **GradientText**: Text with gradient color effects
- **Navbar**: Responsive navigation with mobile menu and animations
- **HeroSection**: Animated hero section with background effects

## 🚨 Security Notes

1. **JWT Secret**: Change the default secret in production
2. **Database Credentials**: Update database credentials for production
3. **HTTPS**: Use HTTPS in production
4. **Environment Variables**: Use environment variables for secrets in production

## 🔧 Development

### Backend Development
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend Development
```bash
cd frontend
npm start
```

### Running Tests
```bash
# Backend tests
cd backend
./mvnw test

# Frontend tests
cd frontend
npm test
```

## 📝 API Documentation

For complete API documentation, visit: `http://localhost:8080/swagger-ui.html` (if Swagger is enabled)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check database credentials in application.properties
   - Verify database exists

2. **Frontend Build Errors**
   - Run `npm install` to install dependencies
   - Check Node.js version (requires 18+)

3. **CORS Issues**
   - Verify backend is running on port 8080
   - Check CORS configuration in WebSecurityConfig

4. **Authentication Issues**
   - Use the provided sample credentials
   - Check JWT secret configuration
   - Verify token format (Bearer <token>)

### Getting Help

If you encounter issues:
1. Check the troubleshooting section above
2. Review the AUTHENTICATION.md file for detailed setup
3. Check the application logs for error messages
4. Ensure all prerequisites are installed correctly

## 🎉 Success!

Once everything is running, you should see:
- Backend API running on `http://localhost:8080`
- Frontend application on `http://localhost:3000`
- Sample users created automatically
- Beautiful UI with Aceternity components
- Full authentication and role-based access working

Enjoy building with Prime Properties! 🏠✨