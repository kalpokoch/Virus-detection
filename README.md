# Virus Insights

A React-based web application for virus prediction and insights.

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd virus-insights

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Backend Integration (FastAPI)

The prediction page is integrated with a FastAPI backend endpoint at `/predict`.

1. Copy `.env.example` to `.env`
2. Set `VITE_BACKEND_BASE_URL` to your backend URL
3. Start frontend and backend servers

Notes:

- Frontend sends all required backend fields for prediction.
- Frontend fetches location/encoder mappings from `/location-mappings` (or `/locations` alias).
- Frontend consumes `state_mapping` and `district_mapping` from backend for authoritative encoding.
- If backend location mappings are temporarily unavailable, it falls back to local state and district lists with deterministic index-based encoding.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Technologies

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn/ui** - Re-usable components
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Vitest** - Unit testing
- **Playwright** - E2E testing

## Project Structure

```
src/
├── components/     # React components
├── data/          # Static data and constants
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Page components
└── types/         # TypeScript type definitions
```

## License

This project is private and not licensed for public use.
