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
   - Authorized JavaScript origins: `https://prime-properties.vercel.app`
   - Authorized redirect URIs: `https://prime-properties.up.railway.app/auth/google/callback`
6. Copy the Client ID and Client Secret

**Set Environment Variables:**

**Backend (.env or Railway environment variables):**
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Frontend (.env file):**
```bash
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_API_URL=https://prime-properties.up.railway.app
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
- `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret
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