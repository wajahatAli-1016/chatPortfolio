import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export function middleware(request) {
  // Get the token from the Authorization header or cookies
  const token = request.headers.get('authorization')?.replace('Bearer ', '') ||
                request.cookies.get('authToken')?.value;

  if (!token) {
    // Redirect to login page with the current URL as redirect parameter
    const loginUrl = `/login?redirect=${encodeURIComponent(request.nextUrl.pathname)}`;
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if user has admin role
    if (decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/login?error=unauthorized', request.url));
    }

    // Token is valid, allow access
    return NextResponse.next();
  } catch (error) {
    // Token is invalid or expired, redirect to login
    const loginUrl = `/login?redirect=${encodeURIComponent(request.nextUrl.pathname)}`;
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }
}

export const config = {
  matcher: '/add-new-project'
}; 