# CollectAI - Debt Collection Frontend

A modern, responsive React application for managing debt collection processes. This application provides property managers with an interface to track tenant delinquencies, view detailed tenant information, and manage collection activities.

![CollectAI Dashboard](https://via.placeholder.com/600x400?text=CollectAI+Dashboard)

## Features

- **User Authentication**: Secure login system
- **Dashboard View**: Overview of all delinquent tenants with total amount owed
- **Tenant Details**: Detailed view of each tenant's payment history and status
- **AI-Generated Insights**: Automatic summaries and recommendations for collection efforts
- **Action Tools**: Built-in communication options for contacting tenants

## Tech Stack

- **React**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and development server
- **React Router**: Client-side routing
- **CSS3**: Custom styling (no external UI libraries)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Google Cloud SDK (for deployment)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/debt-collection-fe.git
   cd debt-collection-fe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Project Structure

```
debt-collection-fe/
├── public/                 # Static files
├── src/                    # Source files
│   ├── components/         # React components
│   │   ├── Dashboard.tsx   # Dashboard view
│   │   ├── SplashPage.tsx  # Landing page
│   │   └── TenantDetails.tsx # Tenant details view
│   ├── icons/              # SVG icons
│   ├── App.css             # Global styles
│   ├── App.tsx             # Main application component
│   ├── index.css           # Base styles
│   └── main.tsx            # Entry point
├── index.html              # HTML template
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── Dockerfile              # Docker configuration for Google Cloud Run
└── app.yaml                # Configuration for Google App Engine
```

## Usage Flow

1. **Splash Page**: Initial landing page with the CollectAI logo and sign-in button
2. **Dashboard**: View all delinquent tenants and total amount owed
3. **Tenant Details**: Click on any tenant to view their detailed information
4. **Actions**: Use the action buttons to contact tenants or manage their records

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

### Google Cloud Deployment Options

This application can be deployed to Google Cloud using several methods:

#### 1. Google Cloud Run (Recommended)

Deploy as a containerized application with automatic scaling:

```bash
# Build the application
npm run build

# Build the Docker image
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/debt-collection-fe

# Deploy to Cloud Run
gcloud run deploy debt-collection-fe \
  --image gcr.io/YOUR_PROJECT_ID/debt-collection-fe \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### 2. Google App Engine

Deploy as a standard environment application:

```bash
# Build the application
npm run build

# Deploy to App Engine
gcloud app deploy
```

#### 3. Google Cloud Storage + Load Balancer

For a static site with custom domain:

```bash
# Build the application
npm run build

# Create a bucket (if it doesn't exist)
gsutil mb -l us-central1 gs://YOUR_BUCKET_NAME

# Upload the built application
gsutil -m cp -r dist/* gs://YOUR_BUCKET_NAME

# Make all objects publicly readable
gsutil -m acl ch -r -u AllUsers:R gs://YOUR_BUCKET_NAME
```

### Environment Variables

For production deployments, set the following environment variables:

- `VITE_API_BASE_URL`: Your API base URL

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Development Notes

- This project uses React Router for navigation between pages
- All styles are contained in App.css with no external UI libraries
- The application connects to a backend API for tenant data

## License

[MIT](LICENSE)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
