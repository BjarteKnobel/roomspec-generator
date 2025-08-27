# Office Space Calculator

A sophisticated computing engine and modern web interface designed to calculate the required office space for a company. It takes into account various parameters such as the number of employees, workspace types, and government regulations to provide an accurate estimation of the space needed.

## 🏗️ Architecture

This project consists of two main components:

- **Backend Engine** (`src/`): TypeScript/Bun-based calculation engine with REST API
- **Frontend App** (`frontend/`): Next.js React application with modern UI

Read the [documentation](./docs/index.md) to learn more about the calculation engine.

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh/) (recommended) or [Node.js 18+](https://nodejs.org/)
- [Docker](https://www.docker.com/) (optional)

### Option 1: Full Stack Development (Recommended)

1. **Start the Backend Engine**
   ```bash
   # Install dependencies
   bun install
   
   # Start the calculation engine (port 1337)
   bun run src/index.ts
   ```

2. **Start the Frontend App** (in a new terminal)
   ```bash
   # Navigate to frontend
   cd frontend
   
   # Install dependencies
   npm install
   
   # Start the development server (port 3000)
   npm run dev
   ```

3. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:1337

### Option 2: Backend Only

```bash
# Install and run the calculation engine
bun install
bun run src/index.ts

# Test the API
curl -X POST http://localhost:1337/calculate \
  -H "Content-Type: application/json" \
  -d @postman_collection.json
```

### Option 3: Docker

```bash
# Backend only
docker compose up

# Or build manually
docker build -t agiliate-engine . && docker run -p 1337:1337 agiliate-engine
```

## 🛠️ Development

### Backend Development
```bash
# Hot reload development server
bun run --watch src/index.ts

# Run tests
bun test

# Lint code
bun lint
```

### Frontend Development
```bash
cd frontend

# Development server with hot reload
npm run dev

# Build for production
npm run build

# Lint and type check
npm run lint
```

## 📖 API Documentation

The backend exposes a REST API at `/calculate` that accepts workspace parameters and returns calculated space requirements.

**Example Request:**
```bash
POST /calculate?version=1
Content-Type: application/json

{
  "variables": {
    "numberOfEmployees": 180,
    "concurrencyAttendanceShare": 0.75,
    "coworkingShare": 0.45,
    "touchdownShare": 0.25,
    // ... more parameters
  },
  "customConstants": {
    "governmentMinimumSquaremetersPerWorkSpace": 6
  }
}
```

See `postman_collection.json` for complete examples.

## 🏢 Frontend Features

- **Interactive Form**: Real-time input validation and calculation
- **Visual Layout**: Dynamic floor plan with live area updates  
- **Professional UI**: Modern design with dark theme support
- **Responsive**: Works on desktop, tablet, and mobile
- **Real-time Connection**: Live status indicators and error handling

## 📁 Project Structure

```
├── src/                    # Backend calculation engine
│   ├── calculations/       # Core calculation logic
│   ├── config/            # Configuration files
│   └── index.ts           # API server
├── frontend/              # Next.js React application
│   ├── app/               # App Router pages and API routes
│   ├── components/        # Reusable UI components
│   └── package.json       # Frontend dependencies
├── docs/                  # Documentation
├── test/                  # Test files and scenarios
└── README.md             # This file
```

## 🧪 Testing

```bash
# Backend tests
bun test

# Frontend type checking and linting
cd frontend && npm run lint
```
