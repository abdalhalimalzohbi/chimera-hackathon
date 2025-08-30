# Chimera Device Management Frontend

A React-based frontend application for managing network devices and their content filtering settings. This application provides a visualization-first interface for monitoring and controlling devices on your network.

## Features

- **Visualization-First Design**: Interactive charts and visual representations of device data
- **Device Management**: View, edit, and manage device properties
- **Quick Actions**: Perform device actions (isolate, release, toggle blocklist) with one click
- **Real-time Updates**: Live data from the Chimera API backend
- **Responsive Design**: Works on desktop and mobile devices
- **Material-UI**: Modern, accessible UI components

## Tech Stack

- **React 19** with TypeScript
- **Material-UI (MUI)** for UI components
- **Recharts** for data visualization
- **Axios** for API communication
- **Vite** for build tooling

## Prerequisites

- Node.js 18+ and npm
- Running Chimera backend API (see main project README)

## Installation

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   
   Create a `.env` file in the frontend directory:
   ```bash
   VITE_API_BASE_URL=http://localhost:8000
   ```
   
   Or set the environment variable:
   ```bash
   export VITE_API_BASE_URL=http://localhost:8000
   ```

## Development

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

3. **Make changes**
   
   The app will automatically reload when you make changes to the code.

## Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the build**
   ```bash
   npm run preview
   ```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard.tsx           # Main dashboard view
│   │   ├── DeviceActionDialog.tsx  # Device action dialog
│   │   └── DeviceDetailsDialog.tsx # Device details dialog
│   ├── context/             # React context for state management
│   │   └── DeviceContext.tsx       # Device state and API calls
│   ├── services/            # API services
│   │   └── api.ts                  # HTTP client and API endpoints
│   ├── types/               # TypeScript type definitions
│   │   └── device.ts               # Device-related interfaces
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## API Integration

The frontend communicates with the Chimera backend API through the following endpoints:

- `GET /api/devices` - Retrieve all devices
- `GET /api/summary` - Get summary statistics
- `PATCH /api/devices/{id}` - Update device properties
- `POST /api/devices/{id}/actions` - Perform device actions

## Key Components

### Dashboard
The main view showing:
- Summary statistics cards
- Interactive charts (pie chart for groups, bar chart for categories)
- Device grid with status indicators
- Quick action buttons

### Device Cards
Each device is represented as a card showing:
- Device name and status
- IP address and group
- AI classification category
- Blocklist status
- Quick action button

### Device Details Dialog
Comprehensive device information including:
- Basic network details
- Operating system information
- AI classification data
- Blocklist settings (editable)
- Group assignment (editable)

### Device Action Dialog
Perform quick actions:
- **Isolate**: Block all content categories
- **Release**: Unblock all content categories
- **Toggle Block**: Toggle specific blocklist categories

## Customization

### Themes
The application uses Material-UI theming. You can customize colors, typography, and other design tokens in `src/App.tsx`.

### Charts
Charts are built with Recharts. You can modify chart types, colors, and layouts in the Dashboard component.

### API Configuration
Modify the API base URL in the environment file or update the default in `src/services/api.ts`.

## Troubleshooting

### API Connection Issues
- Ensure the backend API is running on the configured URL
- Check CORS settings in the backend
- Verify the API endpoints are accessible

### Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript configuration in `tsconfig.json`
- Ensure all dependencies are properly installed

### Performance Issues
- Use React DevTools to identify unnecessary re-renders
- Consider implementing React.memo for expensive components
- Optimize chart rendering for large datasets

## Contributing

1. Follow the existing code style and patterns
2. Add TypeScript types for new features
3. Test components with different data scenarios
4. Update documentation for new features

## License

This project is part of the Chimera challenge and is intended for demonstration purposes.
