# Speedo - Vehicle Tracking System (Frontend)

## Overview
React + TypeScript frontend for vehicle trip tracking and analysis system with interactive map visualization.

## Tech Stack
- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Map**: Leaflet + React-Leaflet
- **UI**: Material-UI (MUI)
- **Routing**: React Router v6
- **State Management**: React Query + Context API
- **HTTP Client**: Axios
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Utilities**: geolib, date-fns

## Features
- 🗺️ Interactive map visualization with Leaflet
- 📊 Trip analytics (distance, duration, idling, stoppages)
- 🚗 Overspeed detection and visualization
- 📁 CSV file upload for GPS data
- 🔐 User authentication
- 📱 Responsive design

## Project Structure
```
src/
├── api/              # API integration layer
├── assets/           # Static assets
├── components/       # Reusable components
├── contexts/         # React contexts
├── hooks/            # Custom hooks
├── pages/            # Page components
├── routes/           # Routing configuration
├── services/         # Business logic
├── types/            # TypeScript types
└── utils/            # Utility functions
```

## Getting Started

### Install Dependencies
```bash
npm install
```

### Environment Variables
Copy `.env.example` to `.env.development` and configure:
```env
VITE_API_BASE_URL=http://localhost:3000
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Key Features Implementation

### Trip Calculations
- **Distance**: Calculated using geolib between consecutive GPS points
- **Speed**: Derived from distance and time difference
- **Idling**: Detected when ignition ON and speed = 0
- **Stoppage**: Detected when ignition OFF
- **Overspeed**: Highlighted when speed > 60 km/h (configurable)

### Map Visualization
- Normal trip path: Blue
- Overspeed segments: Cyan
- Stoppage markers: Red
- Idling markers: Yellow
- Start/End markers: Green/Red

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration
Backend API should be running on `http://localhost:3000` (configurable via env)

Endpoints:
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `POST /trip/upload` - Upload CSV trip data
- `GET /trip/all` - Get all user trips
- `GET /trip/:id` - Get trip details with GPS points

## License
MIT
