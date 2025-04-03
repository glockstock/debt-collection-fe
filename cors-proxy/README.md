# CloudFlare Worker CORS Proxy

This is a simple CORS proxy implemented as a CloudFlare Worker. It forwards requests to your API and adds the necessary CORS headers to allow cross-origin requests from your GitHub Pages site.

## Setup and Deployment

### Prerequisites

1. A CloudFlare account (free tier is sufficient)
2. Node.js and npm installed
3. Wrangler CLI (CloudFlare's CLI tool for Workers)

### Installation Steps

1. Install Wrangler CLI globally:
   ```bash
   npm install -g wrangler
   ```

2. Login to your CloudFlare account:
   ```bash
   wrangler login
   ```

3. Configure your worker (optional):
   - Open `wrangler.toml` and update the account ID with your own CloudFlare account ID
   - Update the `API_HOSTNAME` and `ALLOWED_ORIGIN` in `worker.js` if needed

4. Deploy the worker:
   ```bash
   cd cors-proxy
   wrangler publish
   ```

5. After successful deployment, you'll get a URL for your worker, like:
   ```
   https://cors-proxy.your-username.workers.dev
   ```

6. Update your React application's API configuration to use this URL instead of the direct API URL.

## Usage in Your Application

Update your `axiosConfig.ts` file to use the CloudFlare Worker URL as the API base URL in production environments:

```typescript
const baseURL = isDevelopment 
  ? '/api' // This will be proxied via Vite
  : 'https://cors-proxy.your-username.workers.dev'; // Your CloudFlare Worker URL
```

## Maintenance

- CloudFlare Workers on the free plan have a limit of 100,000 requests per day
- If you need more, consider upgrading to a paid plan
- Monitor your usage in the CloudFlare dashboard 