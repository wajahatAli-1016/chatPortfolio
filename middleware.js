import { NextResponse } from 'next/server';

const locales = ['en', 'fr'];
const defaultLocale = 'en';

// Get the preferred locale from the request
function getLocale(request) {
  // Check for locale in the URL path first (highest priority)
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameLocale) {
    return pathnameLocale;
  }

  // Only use Accept-Language header for the root path "/"
  // This prevents browser language detection from overriding existing locale paths
  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      const preferredLocale = acceptLanguage
        .split(',')
        .map(lang => lang.split(';')[0].trim())
        .find(lang => locales.includes(lang.split('-')[0]));
      
      if (preferredLocale) {
        return preferredLocale.split('-')[0];
      }
    }
  }

  return defaultLocale;
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for API routes, static files, and specific routes
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.') ||
    pathname === '/add-new-project'
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // If the pathname is just "/", redirect to the default locale
  if (pathname === '/') {
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  // For other paths without locale, redirect to locale-specific path
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
}; 