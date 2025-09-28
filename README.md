# Prime Properties

<div align="center">

![Prime Properties](https://img.shields.io/badge/Prime%20Properties-Real%20Estate%20Platform-blue?style=for-the-badge&logo=home)

**A full-stack real estate platform with role-based access for Customers and Developers**

[![Java](https://img.shields.io/badge/Java-17+-orange?style=flat&logo=openjdk)](https://openjdk.java.net/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2+-green?style=flat&logo=spring)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![React](https://img.shields.io/badge/React-18+-blue?style=flat&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-blue?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Aceternity UI](https://img.shields.io/badge/Aceternity%20UI-Modern%20Components-purple?style=flat)](https://aceternity.com/)
[![Docker](https://img.shields.io/badge/Docker-Supported-blue?style=flat&logo=docker)](https://www.docker.com/)

</div>

## 📖 About

Prime Properties is a modern, full-stack real estate platform that connects property developers with potential customers. Built with cutting-edge technologies, it provides a seamless experience for both property listing and browsing.

### 🎯 Key Highlights

- **Role-Based Access**: Separate dashboards for Customers and Developers
- **Modern UI**: Beautiful interface with Aceternity UI components
- **Secure Authentication**: JWT-based authentication with Spring Security
- **Real-time Features**: Live property updates and search functionality
- **Mobile Responsive**: Works perfectly on all devices

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Backend** | Java 17+ | Core application logic |
| **Framework** | Spring Boot 3.2 | Rapid development framework |
| **Database** | PostgreSQL | Data persistence |
| **Frontend** | React 18 | User interface |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Components** | Aceternity UI | Modern UI components |
| **Containerization** | Docker | Easy deployment |

## ✨ Features

### 👥 Customer Features
- **Sign Up & Login**: Easy registration and authentication
- **Property Browsing**: View all available properties
- **Advanced Search**: Filter by location, price range, property type
- **Property Details**: Detailed information with images and specifications
- **Responsive Design**: Seamless experience across all devices

### 🏗️ Developer Features
- **Sign Up & Login**: Developer-specific registration
- **Property Management**: Add, edit, and delete properties
- **Status Updates**: Mark properties as sold
- **Portfolio Dashboard**: Track all listed properties
- **Analytics**: View property performance metrics

### 🔐 Authentication & Security
- **Google OAuth 2.0**: Secure authentication with Google Sign-In
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Dashboards**: Customized experience for each user type
- **Auto-Registration**: Users are automatically registered on first Google login
- **Protected Routes**: Secure API endpoints

## 🚀 Installation

### Prerequisites

Make sure you have these installed on your system:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **Java 17+** - [Download](https://openjdk.java.net/)
- **PostgreSQL 12+** - [Download](https://www.postgresql.org/)
- **Maven 3.6+** - [Download](https://maven.apache.org/)
- **Git** - [Download](https://git-scm.com/)

### Step-by-Step Setup

#### 1️⃣ Clone the Repository
```bash
git clone <repository-url>
cd prime-properties
```

#### 2️⃣ Setup Google OAuth 2.0

**Create Google OAuth Credentials:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure OAuth consent screen:
   - Application type: Web application
   - Authorized JavaScript origins: `https://prime-properties.up.railway.app`
   - Authorized redirect URIs: `https://prime-properties.up.railway.app/api/auth/callback/google`
6. Copy the Client ID and Client Secret

**Set Environment Variables in Railway:**

**Backend Service Environment Variables:**
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
JWT_SECRET=your-strong-jwt-secret
FRONTEND_URL=https://prime-properties.up.railway.app
```

**Frontend Service Environment Variables:**
```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_API_URL=https://prime-properties-production-d021.up.railway.app
NODE_ENV=production
```

#### 3️⃣ Setup PostgreSQL Database
```bash
# Start PostgreSQL service
sudo service postgresql start  # Linux/Mac
net start postgresql-x64-13    # Windows

# Create database
createdb prime_properties

# Or using psql
psql -U postgres
CREATE DATABASE prime_properties;
\q
```

#### 3️⃣ Run Backend
```bash
cd backend
mvn spring-boot:run
```
Backend will start on `http://localhost:8080`

#### 4️⃣ Run Frontend
```bash
cd frontend
npm install
npm start
```
Frontend will start on `http://localhost:3000`

### 🚀 Railway Deployment

The application is already deployed on Railway:

**Live URLs:**
- **Frontend**: https://prime-properties.vercel.app
- **Backend**: https://prime-properties.up.railway.app

**Environment Variables to Set in Railway:**

**Frontend Service:**
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
- `NEXT_PUBLIC_API_URL`: Backend API URL (https://prime-properties-production-d021.up.railway.app)
- `NODE_ENV`: production

**Backend Service:**
- `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret
- `JWT_SECRET`: Strong JWT secret key (min 32 characters)
- `FRONTEND_URL`: Frontend domain URL (https://prime-properties.up.railway.app)
- `DATABASE_URL`: PostgreSQL connection string (auto-provided by Railway)

## 🔑 Authentication

The application now uses **Google OAuth 2.0** for authentication. Users are automatically registered when they sign in with Google for the first time.

### 🔐 How to Test
1. Click "Sign In with Google" on the landing page
2. Complete Google authentication
3. You'll be automatically registered as a **CUSTOMER** and redirected to the customer dashboard
4. All users start with **CUSTOMER** role by default

### 👨‍💻 Developer Access
To access developer features, you'll need to manually update your role in the database:
```sql
UPDATE users SET role = 'DEVELOPER' WHERE email = 'your-email@gmail.com';
```

### 🏠 Sample Properties
The system includes preloaded properties from major Indian cities:
- **Luxury Apartment in Mumbai** - ₹1.5 Crore (Available)
- **Modern Villa in Bangalore** - ₹2.5 Crore (Available)
- **Cozy 2BHK in Delhi** - ₹85 Lakh (Sold)

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

### Manual Testing
1. Open `http://localhost:3000`
2. Click "Customer Login" or "Developer Login"
3. Use the sample credentials above
4. Explore the features:
   - **Customers**: Browse properties, use search/filters
   - **Developers**: Manage properties, add/edit/delete listings

### API Testing
Use Postman or curl to test the REST API:

```bash
# Login example
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "developer",
    "password": "DevPass123"
  }'
```

## 📱 Screenshots

> **Note**: Screenshots will be added here to showcase the application's beautiful UI and features.

### 🏠 Landing Page
![Landing Page](screenshots/landing-page.png)
*Modern landing page with hero section and smooth animations*

### 🔐 Authentication
![Login Page](screenshots/login-page.png)
*Beautiful login forms with Aceternity UI components*

### 👤 Customer Dashboard
![Customer Dashboard](screenshots/customer-dashboard.png)
*Property browsing with advanced search and filter capabilities*

### 🏗️ Developer Dashboard
![Developer Dashboard](screenshots/developer-dashboard.png)
*Property management with CRUD operations and portfolio analytics*

### 📱 Mobile View
![Mobile View](screenshots/mobile-view.png)
*Fully responsive design that works perfectly on mobile devices*

## 🏗️ Project Structure

```
prime-properties/
├── 📁 backend/                 # Spring Boot backend
│   ├── 📁 src/main/java/      # Java source code
│   ├── 📁 src/main/resources/ # Configuration files
│   └── 📄 pom.xml             # Maven dependencies
├── 📁 frontend/               # React frontend
│   ├── 📁 src/                # React source code
│   ├── 📁 public/             # Static assets
│   └── 📄 package.json        # Node dependencies
├── 📄 docker-compose.yml      # Docker orchestration
└── 📄 README.md              # This file
```

## 🔧 Configuration

### Database Configuration
Update `backend/src/main/resources/application.properties`:

```properties
# Database settings
spring.datasource.url=jdbc:postgresql://localhost:5432/prime_properties
spring.datasource.username=postgres
spring.datasource.password=postgres

# JWT settings
app.jwt.secret=your_secret_key_here
app.jwt.expiration=86400000
```

### Frontend Configuration
Update `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

## 🚨 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **Database Connection Error** | Ensure PostgreSQL is running and database exists |
| **Frontend Build Errors** | Run `npm install` and check Node.js version |
| **CORS Issues** | Verify backend is running on port 8080 |
| **Authentication Issues** | Use provided sample credentials |
| **Docker Issues** | Check if ports 3000, 8080, 5432 are available |

### Getting Help

1. Check the troubleshooting section above
2. Review application logs for error messages
3. Ensure all prerequisites are installed correctly
4. Create an issue with detailed information

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 1️⃣ Fork the Repository
Click the "Fork" button on GitHub

### 2️⃣ Create a Feature Branch
```bash
git checkout -b feature/amazing-feature
```

### 3️⃣ Make Your Changes
- Write clean, well-documented code
- Add tests for new features
- Follow existing code style

### 4️⃣ Commit Your Changes
```bash
git commit -m 'Add amazing feature'
```

### 5️⃣ Push to Your Branch
```bash
git push origin feature/amazing-feature
```

### 6️⃣ Create a Pull Request
Open a PR with a clear description of your changes

### Contribution Guidelines
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🎓 Skills Developed & Learning Outcomes

This project has been an incredible learning journey, allowing me to master a wide range of modern web development technologies and best practices. Here's what I've learned and the skills I've developed:

### 🛠️ **Technical Skills Mastered**

#### **Backend Development**
- **Java 17+**: Advanced Java programming with modern features like records, pattern matching, and enhanced switch expressions
- **Spring Boot 3.2**: Comprehensive understanding of Spring ecosystem including:
  - Spring Security for authentication and authorization
  - Spring Data JPA for database operations
  - Spring Web for RESTful API development
  - Spring OAuth2 for Google authentication integration
- **RESTful API Design**: Created well-structured APIs following REST principles
- **JWT Authentication**: Implemented secure token-based authentication system
- **Database Design**: PostgreSQL schema design with proper relationships and constraints
- **Maven**: Dependency management and project build automation

#### **Frontend Development**
- **React 18**: Modern React development with hooks, context API, and functional components
- **JavaScript ES6+**: Advanced JavaScript features including async/await, destructuring, and modules
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Aceternity UI**: Modern component library integration for beautiful interfaces
- **Responsive Design**: Mobile-first approach ensuring perfect experience across all devices
- **State Management**: React Context API for global state management

#### **Authentication & Security**
- **Google OAuth 2.0**: Complete OAuth flow implementation with Google Sign-In
- **JWT Token Management**: Secure token generation, validation, and refresh mechanisms
- **Role-Based Access Control**: Implemented different user roles (Customer/Developer) with appropriate permissions
- **CORS Configuration**: Proper cross-origin resource sharing setup for production environments
- **Password Security**: BCrypt password hashing and secure credential management

#### **DevOps & Deployment**
- **Docker**: Containerization for consistent development and deployment environments
- **Railway**: Cloud platform deployment and environment variable management
- **Environment Configuration**: Proper separation of development, staging, and production configurations
- **CI/CD**: Understanding of continuous integration and deployment practices

### 🧠 **Key Learning Outcomes**

#### **1. Full-Stack Architecture Understanding**
- Learned how frontend and backend communicate through REST APIs
- Understood the complete request-response cycle in web applications
- Gained experience in designing scalable application architecture

#### **2. Modern Authentication Patterns**
- Mastered OAuth 2.0 flow and Google Sign-In integration
- Learned JWT token lifecycle management
- Understood security best practices for web applications

#### **3. Database Design & Management**
- Designed normalized database schema for real estate platform
- Learned PostgreSQL-specific features and optimization techniques
- Gained experience in database migrations and data integrity

#### **4. User Experience Design**
- Created intuitive user interfaces with modern design principles
- Implemented responsive design that works across all devices
- Learned accessibility best practices for web applications

#### **5. Production Deployment**
- Deployed applications to cloud platforms (Railway)
- Learned environment variable management and configuration
- Understood production debugging and monitoring techniques

### 🚀 **Advanced Concepts Learned**

#### **Security Best Practices**
- Implemented proper CORS policies for production environments
- Learned about CSRF protection and security headers
- Understood authentication vs authorization concepts
- Implemented secure password policies and validation

#### **Performance Optimization**
- Database query optimization and indexing strategies
- Frontend bundle optimization and lazy loading
- API response caching and efficient data fetching
- Image optimization and CDN integration

#### **Error Handling & Debugging**
- Comprehensive error handling across the entire stack
- Logging strategies for production applications
- Debugging techniques for both frontend and backend issues
- User-friendly error messages and validation feedback

#### **Code Quality & Best Practices**
- Clean code principles and SOLID design patterns
- Proper code organization and modular architecture
- Comprehensive documentation and commenting
- Version control best practices with Git

### 🎯 **Real-World Problem Solving**

#### **Authentication Challenges**
- Solved complex OAuth integration issues
- Handled token expiration and refresh scenarios
- Implemented secure session management
- Resolved CORS issues in production environments

#### **Database Challenges**
- Optimized complex queries for better performance
- Handled database migrations and schema updates
- Implemented proper data validation and constraints
- Solved transaction isolation issues

#### **Frontend Challenges**
- Implemented responsive design for various screen sizes
- Solved state management complexity with Context API
- Handled async operations and loading states
- Created reusable component architecture

### 📈 **Professional Development**

#### **Project Management**
- Learned to break down complex features into manageable tasks
- Understood the importance of proper planning and documentation
- Gained experience in iterative development and testing

#### **Problem-Solving Skills**
- Developed systematic debugging approaches
- Learned to research and implement solutions independently
- Gained confidence in tackling complex technical challenges

#### **Communication Skills**
- Learned to document technical decisions and implementations
- Developed ability to explain complex concepts clearly
- Gained experience in collaborative development practices

### 🔮 **Future Learning Directions**

Based on this project, I'm excited to explore:
- **Microservices Architecture**: Breaking down monolithic applications
- **Advanced Security**: OAuth 2.1, OpenID Connect, and advanced authentication patterns
- **Performance Monitoring**: Application performance monitoring and optimization
- **Testing Strategies**: Comprehensive testing including unit, integration, and E2E tests
- **Cloud Native Development**: Kubernetes, serverless functions, and cloud-native patterns

### 💡 **Key Takeaways**

This project has taught me that building a production-ready application requires:
- **Attention to Detail**: Every configuration matters in production environments
- **Security First**: Security considerations must be built into every layer
- **User Experience**: Technical excellence must be paired with great user experience
- **Continuous Learning**: Technology evolves rapidly, and staying updated is crucial
- **Problem-Solving**: Complex problems often have elegant solutions when approached systematically

---

## 🎉 Success!

Once everything is running, you should see:

- ✅ **Backend API** running on `http://localhost:8080`
- ✅ **Frontend Application** on `http://localhost:3000`
- ✅ **Sample Users** created automatically
- ✅ **Beautiful UI** with Aceternity components
- ✅ **Full Authentication** and role-based access working

---

<div align="center">

**Ready to explore Prime Properties?** 🏠✨

[![Get Started](https://img.shields.io/badge/Get%20Started-Now-green?style=for-the-badge)](https://github.com/your-repo)

Made with ❤️ using Spring Boot and React

</div>