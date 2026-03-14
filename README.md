# 🚗 Speedo - Vehicle Trip Tracking & Analysis System

<div align="center">

![Speedo Banner](https://img.shields.io/badge/Speedo-Vehicle%20Tracking-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em0tMS0xM2gtMnY2bDUuMjUgMy4xNS43NS0xLjIzLTQtMi40MnoiLz48L3N2Zz4=)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)

**A comprehensive, enterprise-grade vehicle tracking and trip analysis platform built with modern web technologies**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [API Documentation](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-features)
- [Technology Stack](#-tech-stack)
- [System Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Frontend Features](#-frontend-features)
- [Backend Features](#-backend-features)
- [Environment Variables](#-environment-variables)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Speedo** is a full-stack vehicle trip tracking and analysis system designed to provide comprehensive insights into vehicle movements, driver behavior, and fleet performance. Built with TypeScript, React, and Node.js, it offers real-time GPS tracking, intelligent trip analysis, and beautiful data visualizations.

### 🎯 What Makes Speedo Special?

- **🗺️ Interactive Map Visualization** - Beautiful Leaflet-powered maps with route tracking
- **⚡ Real-time Speed Analysis** - Instant overspeed detection and alerts
- **🅿️ Smart Stoppage Detection** - Automatic identification of vehicle stops with duration tracking
- **⏸️ Idling Monitoring** - Track and reduce unnecessary idling to save fuel
- **📊 Comprehensive Analytics** - Detailed trip statistics and performance metrics
- **🔒 Enterprise Security** - JWT authentication, httpOnly cookies, rate limiting
- **🎨 Modern UI/UX** - Clean, responsive design with Material-UI components
- **📁 CSV Import** - Easy bulk upload of GPS data via CSV files

---

## ✨ Features

### 🚀 Core Capabilities

#### 📍 GPS Trip Tracking
- Upload GPS data via CSV files with comprehensive validation
- Automatic trip creation with start/end time detection
- Precise distance calculation using the Geolib library
- Real-time speed computation between GPS points
- Support for multiple trips per user

#### 🗺️ Advanced Map Visualization
- **Interactive Route Display** - Full trip path rendering on OpenStreetMap
- **Overspeed Highlighting** - Red-colored sections for speed violations
- **Stoppage Markers** - Visual indicators with duration and time details
- **Idling Detection** - Track engine-on, no-movement periods
- **Start/End Markers** - Clear trip boundary indicators
- **Auto-fit Bounds** - Automatic map zoom to show entire route
- **Customizable Speed Limits** - Adjustable threshold for overspeed detection

#### 📊 Trip Analytics
- **Total Distance** - Accurate distance calculation in kilometers
- **Trip Duration** - Complete time tracking from start to finish
- **Average Speed** - Calculated from distance and duration
- **Maximum Speed** - Peak speed detection across all GPS points
- **Idling Time** - Total time with ignition on and speed = 0
- **Stoppage Time** - Total time with ignition off
- **GPS Point Count** - Number of data points in the trip

#### 🔐 Security & Authentication
- JWT-based authentication with httpOnly cookies
- Secure password hashing with bcrypt
- Rate limiting to prevent abuse
- Protected API routes with middleware
- User-specific data isolation
- CORS configuration for secure cross-origin requests

#### 🎨 User Experience
- Beautiful landing page with feature showcase
- Responsive dashboard with sidebar navigation
- Drag-and-drop CSV file upload
- Real-time trip list with search and filtering
- Detailed trip view with interactive controls
- Loading states and error handling
- Toast notifications for user feedback

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 19.2.0 |
| **TypeScript** | Type Safety | 5.9.3 |
| **Vite** | Build Tool | 7.2.4 |
| **Material-UI** | Component Library | 7.3.7 |
| **React Router** | Routing | 7.13.0 |
| **TanStack Query** | Data Fetching | 5.90.20 |
| **Leaflet** | Map Visualization | 1.9.4 |
| **React Leaflet** | React Bindings | 5.0.0 |
| **Recharts** | Data Visualization | 3.7.0 |
| **Axios** | HTTP Client | 1.13.4 |
| **React Hook Form** | Form Management | 7.71.1 |
| **Zod** | Schema Validation | 4.3.6 |
| **Tailwind CSS** | Styling | 3.4.1 |
| **date-fns** | Date Utilities | 4.1.0 |
| **Geolib** | Geo Calculations | 3.3.4 |

### Backend

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime | - |
| **Express** | Web Framework | 5.2.1 |
| **TypeScript** | Type Safety | 5.9.3 |
| **MongoDB** | Database | - |
| **Mongoose** | ODM | 9.1.5 |
| **TSyringe** | Dependency Injection | 4.10.0 |
| **JWT** | Authentication | 9.0.3 |
| **Bcrypt** | Password Hashing | 6.0.0 |
| **Multer** | File Upload | 2.0.2 |
| **CSV Parser** | CSV Processing | 3.2.0 |
| **Geolib** | Distance Calculation | 3.3.4 |
| **Zod** | Validation | 4.3.6 |
| **Express Rate Limit** | Rate Limiting | 8.2.1 |
| **CORS** | Cross-Origin | 2.8.6 |

---

## 🏗️ Architecture

### System Design

Speedo follows a **clean architecture** pattern with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌────────────┬────────────┬────────────┬─────────────┐    │
│  │  Landing   │    Auth    │ Dashboard  │  Trip View  │    │
│  │   Pages    │   Pages    │   Pages    │    Pages    │    │
│  └────────────┴────────────┴────────────┴─────────────┘    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Services (API, Auth, Trip)                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Node.js/Express)                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Routes (Auth, Trip)                        │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Middleware (Auth, Error, Rate Limit)           │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │      Controllers (Auth, Trip) - TSyringe DI            │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │   Services (Auth, TripUpload, CSV) - Business Logic    │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │   Repositories (User, Trip, GPSPoint) - Data Access    │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↕ Mongoose ODM
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Database                          │
│  ┌──────────────┬──────────────┬─────────────────────┐     │
│  │    Users     │    Trips     │     GPS Points      │     │
│  └──────────────┴──────────────┴─────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Design Patterns

#### 🎯 Dependency Injection (TSyringe)
- **Interface-based design** - All services and repositories implement interfaces
- **Loose coupling** - Components depend on abstractions, not concrete implementations
- **Testability** - Easy to mock dependencies for unit testing
- **Maintainability** - Clear dependency graph and easy to swap implementations

#### 🛡️ Repository Pattern
- **Data access abstraction** - Centralized database operations
- **Separation of concerns** - Business logic separated from data access
- **Reusability** - Common queries shared across services

#### ⚡ Service Layer
- **Business logic encapsulation** - Complex operations in dedicated services
- **Transaction management** - MongoDB sessions for atomic operations
- **Error handling** - Custom error classes with proper HTTP status codes

#### 🔄 Middleware Pipeline
- **Authentication** - JWT verification and user extraction
- **Validation** - Zod schema validation for request bodies
- **Error handling** - Global error handler with proper logging
- **Rate limiting** - Protection against abuse and DDoS
- **File upload** - Multer middleware for CSV processing

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/speedo.git
cd speedo
```

#### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
MONGO_URI=mongodb://localhost:27017/speedo
PORT=7000
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

The server will run on `http://localhost:7000`

#### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.development` file in the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:7000
VITE_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
VITE_DEFAULT_MAP_CENTER_LAT=12.9716
VITE_DEFAULT_MAP_CENTER_LNG=77.5946
VITE_DEFAULT_MAP_ZOOM=13
VITE_OVERSPEED_THRESHOLD=60
```

Start the frontend development server:

```bash
npm run dev
```

The app will run on `http://localhost:5173`

#### 4️⃣ Access the Application

1. Open your browser and navigate to `http://localhost:5173`
2. Register a new account
3. Upload a CSV file with GPS data
4. View your trips and analyze the data!

### CSV File Format

Your CSV file should have the following columns:

```csv
latitude,longitude,timestamp,ignition
12.9716,77.5946,2024-01-01T10:00:00Z,ON
12.9717,77.5947,2024-01-01T10:00:30Z,ON
12.9718,77.5948,2024-01-01T10:01:00Z,OFF
```

**Column Specifications:**
- `latitude`: Number between -90 and 90
- `longitude`: Number between -180 and 180
- `timestamp`: ISO 8601 date string
- `ignition`: "ON" or "OFF"

---

## 📁 Project Structure

### Backend Structure

```
server/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── auth.controller.ts
│   │   └── trip.controller.ts
│   ├── di/                   # Dependency injection setup
│   │   └── container.ts
│   ├── interfaces/           # TypeScript interfaces
│   │   ├── IAuthService.ts
│   │   ├── ICsvService.ts
│   │   ├── IGPSPointRepository.ts
│   │   ├── ITripRepository.ts
│   │   ├── ITripUploadService.ts
│   │   └── IUserRepository.ts
│   ├── middleware/           # Express middleware
│   │   ├── auth.middleware.ts
│   │   ├── errorHandler.middleware.ts
│   │   ├── rateLimit.middleware.ts
│   │   ├── upload.middleware.ts
│   │   └── validate.middleware.ts
│   ├── models/               # Mongoose schemas
│   │   ├── GPSPoint.model.ts
│   │   ├── Trip.model.ts
│   │   └── User.model.ts
│   ├── repositories/         # Data access layer
│   │   ├── gpspoint.repository.ts
│   │   ├── trip.repository.ts
│   │   └── user.repository.ts
│   ├── routes/               # API routes
│   │   ├── auth.routes.ts
│   │   └── trip.routes.ts
│   ├── services/             # Business logic
│   │   ├── auth.service.ts
│   │   ├── csv.service.ts
│   │   └── tripUpload.service.ts
│   ├── shared/               # Shared utilities
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── constants/
│   │   │   └── http.constants.ts
│   │   ├── types/
│   │   │   └── errors.ts
│   │   ├── utils/
│   │   │   ├── asyncHandler.ts
│   │   │   ├── jwt.util.ts
│   │   │   └── password.util.ts
│   │   └── validators/
│   │       └── auth.validator.ts
│   ├── app.ts                # Express app setup
│   └── server.ts             # Server entry point
├── test_data/                # Sample CSV files
├── package.json
└── tsconfig.json
```

### Frontend Structure

```
frontend/
├── src/
│   ├── components/           # Shared components
│   │   └── ProtectedRoute.tsx
│   ├── constants/            # App constants
│   │   ├── apiEndpoints.ts
│   │   ├── constants.ts
│   │   └── routes.ts
│   ├── context/              # React context
│   │   └── AuthContext.tsx
│   ├── features/             # Feature modules
│   │   ├── auth/
│   │   │   └── pages/
│   │   │       ├── Login.tsx
│   │   │       └── Register.tsx
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── TripMap.tsx
│   │   │   ├── layout/
│   │   │   │   └── DashboardLayout.tsx
│   │   │   ├── pages/
│   │   │   │   ├── DashboardOverview.tsx
│   │   │   │   ├── TripDetails.tsx
│   │   │   │   ├── TripList.tsx
│   │   │   │   └── TripUpload.tsx
│   │   │   └── styles/
│   │   └── landing/
│   │       ├── components/
│   │       │   ├── BenefitsSection.tsx
│   │       │   ├── CTASection.tsx
│   │       │   ├── FeaturesSection.tsx
│   │       │   ├── Footer.tsx
│   │       │   ├── HeroSection.tsx
│   │       │   ├── HowItWorksSection.tsx
│   │       │   └── Navbar.tsx
│   │       └── pages/
│   │           └── LandingPage.tsx
│   ├── services/             # API services
│   │   ├── api.ts
│   │   ├── authApi.ts
│   │   └── tripApi.ts
│   ├── types/                # TypeScript types
│   │   ├── auth.types.ts
│   │   └── trip.types.ts
│   ├── utils/                # Utility functions
│   │   ├── mapUtils.ts
│   │   └── tripUtils.ts
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🔌 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

#### Logout User
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Logout successful"
}
```

### Trip Endpoints

#### Upload Trip (CSV)
```http
POST /api/trips/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <csv_file>
```

**Response:**
```json
{
  "message": "Trip uploaded successfully",
  "tripId": "trip_id",
  "startTime": "2024-01-01T10:00:00Z",
  "endTime": "2024-01-01T12:00:00Z",
  "gpsPointsProcessed": 240
}
```

#### Get User Trips
```http
GET /api/trips
Authorization: Bearer <token>
```

**Response:**
```json
{
  "trips": [
    {
      "_id": "trip_id",
      "userId": "user_id",
      "name": "Trip",
      "startTime": "2024-01-01T10:00:00Z",
      "endTime": "2024-01-01T12:00:00Z",
      "totalDistance": 45000,
      "totalIdlingTime": 300,
      "totalStoppageTime": 600,
      "createdAt": "2024-01-01T12:05:00Z"
    }
  ],
  "count": 1
}
```

#### Get Trip by ID
```http
GET /api/trips/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "_id": "trip_id",
  "userId": "user_id",
  "name": "Trip",
  "startTime": "2024-01-01T10:00:00Z",
  "endTime": "2024-01-01T12:00:00Z",
  "totalDistance": 45000,
  "totalIdlingTime": 300,
  "totalStoppageTime": 600,
  "createdAt": "2024-01-01T12:05:00Z"
}
```

#### Get Trip GPS Points
```http
GET /api/trips/:id/gps
Authorization: Bearer <token>
```

**Response:**
```json
{
  "gpsPoints": [
    {
      "_id": "point_id",
      "tripId": "trip_id",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "timestamp": "2024-01-01T10:00:00Z",
      "ignition": true,
      "speed": 45.5
    }
  ],
  "count": 240
}
```

---

## 🎨 Frontend Features

### Landing Page
- **Hero Section** - Eye-catching introduction with CTA
- **Features Section** - Showcase of key capabilities
- **How It Works** - Step-by-step process explanation
- **Benefits Section** - Value propositions
- **CTA Section** - Call-to-action for registration
- **Footer** - Links and information

### Authentication
- **Login Page** - Secure user login with validation
- **Register Page** - New user registration
- **Protected Routes** - Automatic redirect for unauthenticated users
- **Auth Context** - Global authentication state management

### Dashboard
- **Sidebar Navigation** - Easy access to all features
- **Dashboard Overview** - Summary statistics and recent trips
- **Trip Upload** - Drag-and-drop CSV file upload
- **Trip List** - Searchable, filterable list of all trips
- **Trip Details** - Comprehensive trip analysis with map

### Trip Visualization
- **Interactive Map** - Leaflet-powered route visualization
- **Speed Controls** - Adjustable speed limit threshold
- **Toggle Controls** - Show/hide stoppages and idling
- **Color-coded Routes** - Normal (blue) and overspeed (red) sections
- **Custom Markers** - Start (green), end (red), stoppage, idling
- **Popup Information** - Detailed data on click
- **Auto-fit Bounds** - Automatic zoom to show full route

---

## ⚙️ Backend Features

### CSV Processing
- **Validation** - Comprehensive data validation
  - Latitude range: -90 to 90
  - Longitude range: -180 to 180
  - Valid timestamp format
  - Ignition values: ON/OFF
  - Required columns check
- **Error Handling** - Detailed error messages with row numbers
- **Streaming** - Efficient processing of large files

### Trip Analysis
- **Distance Calculation** - Geolib-based accurate distance
- **Speed Computation** - Real-time speed between GPS points
- **Idling Detection** - Ignition ON + Speed = 0
- **Stoppage Detection** - Ignition OFF periods
- **Transaction Safety** - MongoDB sessions for data integrity

### Security
- **JWT Authentication** - Secure token-based auth
- **httpOnly Cookies** - XSS protection
- **Password Hashing** - Bcrypt with salt rounds
- **Rate Limiting** - Protection against brute force
- **Input Validation** - Zod schema validation
- **Error Sanitization** - No sensitive data in responses

### Middleware
- **Authentication** - JWT verification and user extraction
- **Error Handler** - Global error handling with logging
- **Rate Limiter** - Configurable request limits
- **Upload Handler** - Multer for file processing
- **Validator** - Zod-based request validation

---

## 🌍 Environment Variables

### Backend (.env)

```env
# Database
MONGO_URI=mongodb://localhost:27017/speedo

# Server
PORT=7000
NODE_ENV=development

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Rate Limiting (optional)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env.development)

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:7000

# Map Configuration
VITE_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
VITE_DEFAULT_MAP_CENTER_LAT=12.9716
VITE_DEFAULT_MAP_CENTER_LNG=77.5946
VITE_DEFAULT_MAP_ZOOM=13

# Trip Configuration
VITE_OVERSPEED_THRESHOLD=60
VITE_STOPPAGE_THRESHOLD=300
VITE_IDLING_THRESHOLD=60
```

---

## 📸 Screenshots

### Landing Page
*Beautiful, modern landing page with feature showcase*

### Dashboard Overview
*Comprehensive dashboard with trip statistics and analytics*

### Trip Upload
*Drag-and-drop CSV file upload with validation*

### Trip List
*Searchable and filterable list of all trips*

### Trip Details - Map View
*Interactive map with route visualization, overspeed detection, stoppages, and idling*

### Trip Details - Analytics
*Detailed trip statistics with charts and metrics*

---

## 🎯 Key Highlights

### 🏆 Best Practices
- ✅ **TypeScript** throughout for type safety
- ✅ **Clean Architecture** with separation of concerns
- ✅ **Dependency Injection** for loose coupling
- ✅ **Repository Pattern** for data access
- ✅ **Interface-based Design** for flexibility
- ✅ **Global Error Handling** with custom error classes
- ✅ **Input Validation** with Zod schemas
- ✅ **Security Best Practices** (JWT, bcrypt, rate limiting)
- ✅ **Responsive Design** for all screen sizes
- ✅ **Code Organization** with feature-based structure

### 🚀 Performance
- ⚡ **Efficient GPS Processing** with streaming
- ⚡ **Optimized Map Rendering** with Leaflet
- ⚡ **Lazy Loading** for better initial load
- ⚡ **Database Indexing** for faster queries
- ⚡ **Transaction Management** for data integrity
- ⚡ **Caching** with TanStack Query

### 🔒 Security
- 🔐 **JWT Authentication** with httpOnly cookies
- 🔐 **Password Hashing** with bcrypt
- 🔐 **Rate Limiting** to prevent abuse
- 🔐 **Input Validation** on all endpoints
- 🔐 **CORS Configuration** for secure requests
- 🔐 **Error Sanitization** to prevent info leakage

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Amruth**

- GitHub: [@amruth](https://github.com/amruth)
- Project Link: [https://github.com/amruth/speedo](https://github.com/amruth/speedo)

---

## 🙏 Acknowledgments

- [OpenStreetMap](https://www.openstreetmap.org/) for map tiles
- [Leaflet](https://leafletjs.com/) for map visualization
- [Material-UI](https://mui.com/) for beautiful components
- [Geolib](https://github.com/manuelbieh/geolib) for geo calculations
- [TSyringe](https://github.com/microsoft/tsyringe) for dependency injection

---

<div align="center">

**Made with ❤️ by Amruth**

⭐ Star this repo if you find it useful!

</div>
