# Setup Instructions

## Prerequisites

- Node.js 18+ and npm installed
- Backend server running on `http://localhost:8000`

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. The frontend will be available at `http://localhost:3000`

3. Make sure your backend is running on `http://localhost:8000`

## Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Features

- ✅ Drag-and-drop resume upload (PDF/DOCX)
- ✅ Job description text input
- ✅ Basic vs AI analysis toggle
- ✅ Real-time analysis with loading states
- ✅ Comprehensive results display
- ✅ Download analysis report as JSON

## Troubleshooting

### CORS Issues
If you encounter CORS errors, make sure:
1. The backend CORS middleware allows `http://localhost:3000`
2. Both servers are running

### API Connection Issues
- Verify the backend is running on port 8000
- Check the Vite proxy configuration in `vite.config.ts`
- Ensure the API endpoints match: `/api/analyze` and `/api/analyze-ai`

