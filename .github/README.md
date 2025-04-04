# GitHub Pages Deployment for Debt Collection Frontend

This document explains how the GitHub Pages deployment is set up for this project.

## Automatic Deployment

The project is set up to automatically deploy to GitHub Pages whenever changes are pushed to the `main` branch. This is handled by a GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

### How It Works

1. When code is pushed to the `main` branch, the GitHub Actions workflow is triggered
2. The workflow builds the application with the correct base URL for GitHub Pages
3. The built files are deployed to GitHub Pages automatically

## Manual Deployment

If you need to deploy manually, you can use the `deploy.sh` script at the root of the project:

```bash
./deploy.sh
```

This script will:
1. Build the project
2. Create or switch to the `gh-pages` branch
3. Replace the contents with the new build
4. Push the changes to GitHub
5. Switch back to the `main` branch

## Routing Configuration

Since this is a single-page application (SPA), we've added:

1. A custom `404.html` page that redirects to the main application with the requested path
2. A `RedirectHandler` component in `App.tsx` that handles the redirection

This ensures that direct navigation to routes like `https://glockstock.github.io/debt-collection-fe/dashboard` works correctly.

## Base URL Configuration

The application uses a dynamic base URL depending on the environment:
- In development: `/`
- In production: `/debt-collection-fe/`

This is configured in `vite.config.ts`. 