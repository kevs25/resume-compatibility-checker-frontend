# Resume Compatibility Checker - Frontend

A modern React + TypeScript frontend for the Resume Compatibility Checker application.

## Features

- 🎨 Beautiful UI built with Tailwind CSS and shadcn/ui
- 📄 Drag-and-drop resume upload (PDF/DOCX)
- 📝 Job description input
- 🔄 Basic vs AI analysis toggle
- 📊 Comprehensive results display
- 💾 Download analysis report

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## API Endpoints

The frontend communicates with the backend API at `http://localhost:8000`:

- `POST /api/analyze` - Basic analysis
- `POST /api/analyze-ai` - AI-powered analysis

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui components
│   ├── FileUpload.tsx
│   ├── JobDescriptionInput.tsx
│   ├── AnalysisTypeToggle.tsx
│   ├── LoadingSpinner.tsx
│   ├── ResultsCard.tsx
│   ├── SkillsList.tsx
│   └── RecommendationsList.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   └── Results.tsx
├── lib/                # Utilities
│   └── utils.ts
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## Build

```bash
npm run build
```

The build output will be in the `dist` directory.

