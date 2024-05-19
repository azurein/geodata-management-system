// middleware.js (placed in your project's root directory)
import { NextResponse } from 'next/server';

import { verifyAccessToken } from '@/lib/jwt';

export async function middleware(request) {
  const origin = request.headers.get('origin');
  const privateEndpoints = ['/api/user/logout', '/api/geodata', '/api/geodata/file'];
  const url = request.nextUrl.clone();
  
  // Add the CORS headers to the response
  const response = NextResponse.next();
  response.headers.append('Access-Control-Allow-Origin', '*')
  response.headers.append('Access-Control-Allow-Methods', '*')
  response.headers.append('Access-Control-Allow-Headers', '*')

  // Check access token checking for all endpoint beside /api/user
  if (privateEndpoints.includes(url.pathname)) {

    // Check Access Token
    const accessToken = request.headers.get("Authorization");
    // Remove the Bearer prefix
    const token = accessToken?.split(" ")[1];
    // Verify the access token (your JWT verification logic)
    try {
      // Verify and decode the token (your JWT verification logic)
      const decodedToken = await verifyAccessToken(token);

      // Set a new response header `x-hello-from-middleware2`
      await response.headers.set('x-user-id', decodedToken.id)

    } catch (e) {
      console.error(e);

      return NextResponse.json({
        success: false,
        message: 'Invalid or expired token'
      }, { status: 401 });
    }
  }

  return response;
}