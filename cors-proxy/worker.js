/**
 * CORS Proxy CloudFlare Worker
 * 
 * This worker proxies requests to the target API and adds CORS headers to allow
 * cross-origin requests from your GitHub Pages site.
 */

// The API hostname to proxy requests to
const API_HOSTNAME = 'collect-ai-service-337679415316.us-central1.run.app';

// Allowed origins for CORS (update with your GitHub Pages URL)
const ALLOWED_ORIGIN = 'https://glockstock.github.io';

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // Get the pathname to forward to the API
  let pathname = url.pathname;
  
  // Remove any proxy path prefix if you added one (e.g., /proxy/*)
  // pathname = pathname.replace(/^\/proxy/, '');
  
  // Create the API URL
  const apiUrl = `https://${API_HOSTNAME}${pathname}${url.search}`;
  
  console.log(`Proxying request to: ${apiUrl}`);
  
  // Clone the request headers
  const headers = new Headers(request.headers);
  
  // Forward the request to the API
  let response = await fetch(apiUrl, {
    method: request.method,
    headers: headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.blob() : undefined,
  });
  
  // Clone the response and add CORS headers
  response = new Response(response.body, response);
  
  // Add CORS headers
  response.headers.set('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Max-Age', '86400');
  
  return response;
}

// Handle OPTIONS requests for CORS preflight
function handleOptions(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
  
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

addEventListener('fetch', event => {
  const request = event.request;
  
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    event.respondWith(handleOptions(request));
    return;
  }
  
  // Handle the request
  event.respondWith(handleRequest(request));
}); 