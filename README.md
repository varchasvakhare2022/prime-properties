# Prime Properties - Full Stack Web Application

A comprehensive real estate platform built with React frontend and Spring Boot backend, featuring JWT authentication with role-based access for customers and developers.

## 🏗️ Architecture

- **Frontend**: React 18 + Tailwind CSS + React Router
- **Backend**: Spring Boot 3.2 + Spring Security + JPA
- **Database**: PostgreSQL
- **Authentication**: JWT-based with role-based access control
- **Containerization**: Docker + Docker Compose

## 🚀 Features

### Customer Features
- Browse available properties
- View detailed property information
- Contact developers for inquiries

### Developer Features
- List properties for sale
- Edit property details
- Mark properties as sold
- Manage property portfolio

### Authentication
- JWT-based authentication
- Role-based access control (Customer/Developer)
- Secure login/logout functionality

## 📁 Project Structure

```
prime-properties/
├── backend/
│   ├── src/main/java/com/primeproperties/
│   │   ├── config/          # Security and web configuration
│   │   ├── controller/      # REST API controllers
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── model/          # JPA entities
│   │   ├── repository/     # Data access layer
│   │   ├── security/       # JWT and security components
│   │   └── service/        # Business logic
│   ├── src/main/resources/
│   │   └── application.yml # Application configuration
│   └── pom.xml            # Maven dependencies
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/         # Page components
│   │   └── services/      # API services and context
│   ├── package.json       # Node.js dependencies
│   └── tailwind.config.js # Tailwind CSS configuration
└── docker-compose.yml    # Docker orchestration
```

## 🛠️ Setup Instructions

### Prerequisites
- Java 17+
- Node.js 18+
- Docker & Docker Compose
- Maven 3.6+

### Option 1: Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd prime-properties
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - PostgreSQL: localhost:5432

### Option 2: Manual Setup

#### Backend Setup
1. **Start PostgreSQL**
   ```bash
   # Create database
   createdb prime_properties
   ```

2. **Build and run backend**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

#### Frontend Setup
1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

## 🔐 Authentication

### User Roles
- **CUSTOMER**: Browse and view properties
- **DEVELOPER**: Manage properties, edit details, mark as sold

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/register/customer` - Customer registration
- `POST /api/auth/register/developer` - Developer registration

#### Properties
- `GET /api/properties/public` - Get all available properties (public)
- `GET /api/properties/developer` - Get developer's properties (requires DEVELOPER role)
- `POST /api/properties/developer` - Create new property (requires DEVELOPER role)
- `PUT /api/properties/developer/{id}` - Update property (requires DEVELOPER role)
- `PUT /api/properties/developer/{id}/mark-sold` - Mark property as sold (requires DEVELOPER role)

## 🎨 Frontend Routes

- `/` - Landing page with login options
- `/customer-login` - Customer login page
- `/developer-login` - Developer login page
- `/customer-dashboard` - Customer dashboard (protected)
- `/developer-dashboard` - Developer dashboard (protected)

## 🐳 Docker Services

- **postgres**: PostgreSQL database
- **backend**: Spring Boot application
- **frontend**: React development server

## 🔧 Configuration

### Backend Configuration (`application.yml`)
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/prime_properties
    username: postgres
    password: password
  jpa:
    hibernate:
      ddl-auto: update

jwt:
  secret: mySecretKey123456789012345678901234567890
  expiration: 86400000 # 24 hours
```

### Frontend Configuration
- API URL: Configured via `REACT_APP_API_URL` environment variable
- Default: `http://localhost:8080/api`

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 Development Notes

- JWT tokens are stored in localStorage
- CORS is configured for development
- Database schema is auto-generated on startup
- Hot reload is enabled for both frontend and backend in Docker

## 🚀 Deployment

For production deployment:

1. Update database configuration
2. Set secure JWT secret
3. Configure CORS for production domain
4. Build production images:
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.
