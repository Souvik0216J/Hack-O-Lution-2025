import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login'
  const isProtectedPath = path === '/dashboard'

  const isAdminPublicPath = path === '/admin-login'
  const isAdminProtectedPath = path === '/admin-dashboard'

  const token = request.cookies.get("token")?.value
  const adminToken = request.cookies.get("adminToken")?.value

  // Redirect authenticated users trying to access public paths to dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Protect dashboard and API routes
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAdminPublicPath && adminToken) {
    return NextResponse.redirect(new URL('/admin-dashboard', request.url))
  }

  if (isAdminProtectedPath && !adminToken) {
    return NextResponse.redirect(new URL('/admin-login', request.url))
  }

  // Allow authenticated requests to proceed
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/admin-dashboard',
  ],
}