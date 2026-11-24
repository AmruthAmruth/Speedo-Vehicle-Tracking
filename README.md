# 🚗 Speedo - Enterprise-Grade Vehicle Telemetry & Trip Analysis System

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)

**Speedo** is a full-stack, real-time vehicle telemetry and trip analysis system designed to track movements, monitor driver behavior, and analyze fleet performance. It features real-time GPS tracking via WebSockets, high-throughput message queuing, resilient caching, and deep trip analytics with map visualizations.

---

## 🌟 Key Features

### 📡 Real-Time GPS Tracking & Mobile Sync
*   **Mobile Device Sync**: Instantly turn any mobile browser into a live GPS tracker using a QR-code handshake.
*   **Live Broadcasts**: Stream real-time coordinates over secure WebSockets (`Socket.io`) directly to the dashboard.
*   **Live Replay Simulation**: A built-in simulation service replays historical trips, making it easy to test and demo the tracking interface.

### 📊 Intelligent Trip Analysis & Analytics
*   **CSV Import**: Bulk-upload historical telemetry data via drag-and-drop with column and data validation.
*   **Automated Metrics**: Calculate precise trip duration, total distance (using geodetic Vincenty/Haversine distance algorithms), average speed, and maximum speed.
*   **Advanced Event Detection**:
    *   **Idling Detection**: Engine ON but vehicle speed is $< 1 \text{ km/h}$.
    *   **Stoppage Detection**: Engine OFF periods.
    *   **Overspeed Alerting**: Visual highlights on the map indicating speed violations.

### 🗺️ Visual Dashboards
*   **Interactive Maps**: OpenStreetMap visualization using Leaflet, complete with color-coded speed segments, stoppage markers, and idling flags.
*   **Analytical Charts**: Speed profiles, stoppage breakdowns, and driver behavior insights visualised using Recharts.

---

## 🏗️ Under the Hood (Architecture Highlights)

This project is built using production-grade engineering principles:

*   **Asynchronous Processing (BullMQ & Redis)**: High-frequency telemetry updates from WebSockets are pushed directly to a Redis-backed message queue to prevent blocking the Node event loop and keep database writes non-blocking.
*   **Dual-Layer Caching**: The application caches trip data using Redis. If Redis becomes unavailable, it automatically falls back to an in-memory cache with expiring entries, ensuring zero downtime.
*   **Clean Architecture (SOLID & TSyringe)**: Follows a decoupled architecture (Controllers -> Services -> Repositories) utilizing Microsoft's `tsyringe` for Dependency Injection.
*   **Transactional Integrity**: Uses MongoDB multi-document sessions (ACID transactions) during bulk CSV processing to guarantee data consistency.
*   **Security First**: Features JWT-based auth via secure `httpOnly` cookies, rate-limiting middlewares, bcrypt password hashing, and schema validation using Zod.

---

## 🛠️ Technology Stack

| Component | Technology Used | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, Material-UI, TanStack Query | Web dashboard, state caching, responsive styling, and fast builds. |
| **Maps & Charts**| Leaflet, React Leaflet, Recharts, Geolib | Geospatial visualization, trip profiling, and metric calculation. |
| **Backend** | Node.js, Express, TSyringe, Zod | API routing, Dependency Injection, schema validation. |
| **Real-Time** | Socket.io, Socket.io Redis Adapter | Real-time bi-directional messaging, cluster scaling support. |
| **Caching & Queues**| Redis (ioredis), BullMQ | High-frequency queuing and dual-layer caching. |
| **Database** | MongoDB, Mongoose | Schema-based document storage and transactional management. |

---

## 📁 Directory Structure

```
├── server/                     # Backend API & WebSocket Server
│   ├── src/
│   │   ├── controllers/        # Request Handlers
│   │   ├── di/                 # Dependency Injection Containers
│   │   ├── interfaces/         # TS Abstractions & Contracts
│   │   ├── middleware/         # Auth, Zod Validation, Upload handlers
│   │   ├── models/             # Mongoose Schemas (User, Trip, GPSPoint)
│   │   ├── repositories/       # Data Access Layer
│   │   ├── routes/             # Express API Endpoints
│   │   └── services/           # Business Logic (CSV, Queue, Cache, Simulation)
│   └── package.json
│
├── frontend/                   # Frontend Dashboard
│   ├── src/
│   │   ├── components/         # Shared & Protected UI elements
│   │   ├── context/            # Auth & State Contexts
│   │   ├── features/           # Feature Modules (Auth, Dashboard, Landing)
│   │   │   └── dashboard/
│   │   │       ├── components/ # Stats, Recharts, Leaflet TripMap
│   │   │       └── pages/      # Views: Overview, Trip Details, Upload
│   │   └── services/           # Axios API Clients
│   └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   MongoDB
*   Redis

### 1. Setup Backend
1. Go to the server directory and install dependencies:
   ```bash
   cd server
   npm install
   ```
2. Create a `.env` file:
   ```env
   MONGO_URI=mongodb://localhost:27017/speedo
   PORT=7000
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   # Redis config (defaults to localhost:6379)
   REDIS_HOST=localhost
   REDIS_PORT=6379
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### 2. Setup Frontend
1. Go to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Create a `.env.development` file:
   ```env
   VITE_API_BASE_URL=http://localhost:7000
   VITE_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
   VITE_DEFAULT_MAP_CENTER_LAT=12.9716
   VITE_DEFAULT_MAP_CENTER_LNG=77.5946
   VITE_DEFAULT_MAP_ZOOM=13
   VITE_OVERSPEED_THRESHOLD=60
   VITE_STOPPAGE_THRESHOLD=300
   VITE_IDLING_THRESHOLD=60
   ```
3. Start the application:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 📋 CSV Telemetry Format
When importing historical files, use a CSV format with the following columns:
```csv
latitude,longitude,timestamp,ignition
12.9716,77.5946,2024-01-01T10:00:00Z,ON
12.9717,77.5947,2024-01-01T10:00:30Z,ON
12.9718,77.5948,2024-01-01T10:01:00Z,OFF
```

---

Made with ❤️ by Amruth
