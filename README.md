# Campaign Monitoring Dashboard

A functional dashboard for monitoring campaign performance, built with Next.js and TypeScript. This application fetches campaign data from a backend API and displays key metrics, performance charts, and campaign details in an interactive interface.

## Live Demo

View the live application at: [https://mixo-adsfrontend-engineer-challeng.netlify.app/](https://mixo-adsfrontend-engineer-challeng.netlify.app/)

## Features

- **KPI Cards**: Display key performance indicators including impressions, clicks, CTR (Click-Through Rate), and spend
- **Performance Chart**: Interactive line chart showing impressions and clicks over time using Recharts
- **Campaign Filters**: Filter campaigns by specific campaign selection and search by campaign name
- **Campaign Table**: Comprehensive table displaying campaign details including:
  - Campaign name and status
  - Budget and daily budget
  - Start and end dates (mocked based on creation date)
  - Supported platforms
- **Responsive Design**: Mobile-friendly layout using Tailwind CSS

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **API**: Fetches data from https://mixo-fe-backend-task.vercel.app/

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mixo-campaign-monitoring-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main dashboard page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── chart/            # Performance chart component
│   ├── filters/          # Filter controls
│   ├── kpi/              # KPI card component
│   └── table/            # Campaign table component
├── lib/                   # Utility functions and types
│   ├── api.ts            # API functions
│   ├── types.ts          # TypeScript interfaces
│   └── format.ts         # Formatting utilities
└── public/               # Static assets
```

## API Integration

The application integrates with a backend API at `https://mixo-fe-backend-task.vercel.app/` to fetch campaign data. The API provides campaign details, while KPIs and timeline data are mocked for demonstration purposes.

## Deployment

The application is deployed on Vercel and can be accessed at the live URL provided above. To deploy your own version:

1. Push the code to a Git repository
2. Connect the repository to Vercel
3. Deploy automatically or manually trigger a deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
