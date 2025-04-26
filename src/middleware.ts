import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log("Middleware triggered.")
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login'
  const isProtectedPath = path === '/dashboard'

  const token = request.cookies.get("token")?.value || ''

  // Redirect authenticated users trying to access public paths to dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Protect dashboard and API routes
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Allow authenticated requests to proceed
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
  ],
}