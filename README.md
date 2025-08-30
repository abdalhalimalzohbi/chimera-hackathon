# Chimera Device Management System

A comprehensive system for managing network devices and their content filtering settings. This project includes both a FastAPI backend and a React frontend with visualization-first design.

## Project Overview

This challenge is about turning raw device inventory into insight at a glance. The system provides:
1. **Backend API** (FastAPI) - Device management and blocklist control
2. **Frontend Dashboard** (React + MUI) - Visualization-first interface for device monitoring and control

## Features

### Backend API
- **Device Management**: CRUD operations for network devices
- **Blocklist Control**: Manage content filtering for different categories
- **Device Actions**: Isolate, release, and toggle blocklist settings
- **Statistics**: Get summary data about devices and their distribution
- **CORS Support**: Ready for web and mobile client integration
- **Swagger Documentation**: Interactive API documentation

### Frontend Dashboard
- **Visualization-First Design**: Interactive charts and visual representations
- **Device Management**: View, edit, and manage device properties
- **Quick Actions**: Perform device actions with one click
- **Real-time Updates**: Live data from the API
- **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### Prerequisites
- Python 3.8+ and pip
- Node.js 18+ and npm
- Git

### 1. Clone and Setup Backend
```bash
# Clone the repository
git clone <repository-url>
cd chimera-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the API server
python main.py
```

The API will be available at `http://localhost:8000`

### 2. Setup Frontend
```bash
# In a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Create environment file
echo "VITE_API_BASE_URL=http://localhost:8000" > .env

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Core Endpoints
- `GET /api/devices` - Retrieve all devices
- `GET /api/summary` - Get summary statistics
- `PATCH /api/devices/{id}` - Update device properties
- `POST /api/devices/{id}/actions` - Perform device actions

### Device Actions
- **isolate**: Block all content categories (except safesearch)
- **release**: Unblock all content categories (keep safesearch enabled)
- **toggle_block**: Toggle specific blocklist categories

## API Documentation

Once the backend server is running, you can access:
- **Interactive API docs (Swagger UI)**: http://localhost:8000/docs
- **ReDoc documentation**: http://localhost:8000/redoc
- **OpenAPI schema**: http://localhost:8000/openapi.json

## Project Structure

```
chimera-backend/
├── app/
│   ├── routes/         # HTTP request handlers and endpoints
│   ├── controllers/    # Business logic and data management
│   ├── data/           # Data files (devices.sample.json)
│   ├── middlewares/    # Custom middleware
│   ├── schemas/        # Pydantic models for validation
│   └── utils/          # Utility functions
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── context/    # State management
│   │   ├── services/   # API services
│   │   └── types/      # TypeScript interfaces
│   └── package.json
├── main.py             # FastAPI application entry point
├── requirements.txt    # Python dependencies
└── README.md          # This file
```

## Frontend Components

### Dashboard
- Summary statistics cards
- Interactive charts (groups, categories)
- Device grid with status indicators
- Quick action buttons

### Device Management
- Device details dialog with comprehensive information
- Editable device properties (name, group, blocklist)
- Quick action dialogs for isolate/release/toggle

## Data Schema

Each device includes:
- Identity & Network information (MAC, IP, hostname)
- Operating System details
- Blocklist settings for various content categories
- AI classification data
- Group membership

## Development

### Backend Development
1. **New Endpoints**: Add to `app/routes/`
2. **Business Logic**: Extend `app/controllers/`
3. **Validation**: Update `app/schemas/`
4. **Middleware**: Add to `app/middlewares/`

### Frontend Development
1. **New Components**: Add to `frontend/src/components/`
2. **State Management**: Extend `frontend/src/context/`
3. **API Integration**: Update `frontend/src/services/`
4. **Types**: Update `frontend/src/types/`

## Testing

### Backend Testing
The API includes sample data for testing. You can test all endpoints using:
- Interactive documentation at `/docs`
- Tools like curl, Postman, or any HTTP client

### Frontend Testing
- Start the backend API first
- Use `npm run dev` to start the frontend
- Test device interactions and visualizations

## Configuration

### Backend Configuration
- CORS is enabled for all origins by default
- Data is stored in `app/data/devices.sample.json`
- API runs on port 8000 by default

### Frontend Configuration
- API base URL: Set in `.env` file or environment variable
- Development server runs on port 5173 by default
- Material-UI theme can be customized in `App.tsx`

## Troubleshooting

### Common Issues
1. **CORS Errors**: Ensure backend CORS is properly configured
2. **API Connection**: Verify backend is running and accessible
3. **Port Conflicts**: Check if ports 8000 (backend) or 5173 (frontend) are available
4. **Dependencies**: Ensure all packages are properly installed

### Backend Issues
- Check virtual environment is activated
- Verify Python dependencies are installed
- Check API logs for error messages

### Frontend Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript configuration
- Verify API base URL configuration

## Production Deployment

### Backend
- Use production WSGI server (Gunicorn, uvicorn)
- Configure CORS for specific domains
- Set up proper logging and monitoring
- Use environment variables for configuration

### Frontend
- Build with `npm run build`
- Serve static files from web server
- Configure API base URL for production
- Set up proper caching and CDN

## License

This project is part of the Chimera challenge and is intended for demonstration purposes.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review API documentation at `/docs`
4. Verify both backend and frontend are running
