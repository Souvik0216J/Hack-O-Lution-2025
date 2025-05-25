import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RateLimiterMemory } from 'rate-limiter-flexible'

// Single rate limiter for all endpoints
const generalRateLimiter = new RateLimiterMemory({
  points: 15, // 15 requests
  duration: 60, // per 60 seconds
  blockDuration: 180, // block for 3 minutes 
})

function getClientIp(request: NextRequest): string {
  const xForwardedFor = request.headers.get("x-forwarded-for")
  const xRealIp = request.headers.get("x-real-ip")
  const cfConnectingIp = request.headers.get("cf-connecting-ip")

  if (cfConnectingIp) return cfConnectingIp.trim()
  if (xRealIp) return xRealIp.trim()
  if (xForwardedFor) return xForwardedFor.split(",")[0].trim()

  return "127.0.0.1" // fallback for local dev only
}

async function handleRateLimit(ip: string) {
  try {
    await generalRateLimiter.consume(ip)
    return null // No rate limit exceeded
  } catch (rejRes: any) {
    const secs = Math.round((rejRes.msBeforeNext || 60000) / 1000)

    return new NextResponse('You are sending too many requests. Please try again later.', {
      status: 429,
      headers: {
        'Retry-After': String(secs),
        'X-RateLimit-Limit': String(generalRateLimiter.points),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(Math.round((Date.now() + (rejRes.msBeforeNext || 60000)) / 1000)),
      }
    })
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const ip = getClientIp(request)

  // Apply rate limiting to all matched routes
  const rateLimitResponse = await handleRateLimit(ip)
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  // Authentication logic
  const token = request.cookies.get("token")?.value
  const adminToken = request.cookies.get("adminToken")?.value

  const isPublicPath = path === '/login'
  const isProtectedPath = path === '/dashboard'
  const isAdminPublicPath = path === '/admin-login'
  const isAdminProtectedPath = path === '/admin-dashboard'

  // Redirect authenticated users away from login pages
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (isAdminPublicPath && adminToken) {
    return NextResponse.redirect(new URL('/admin-dashboard', request.url))
  }

  // Protect dashboard routes
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAdminProtectedPath && !adminToken) {
    return NextResponse.redirect(new URL('/admin-login', request.url))
  }

  // Add rate limit info to successful requests
  const response = NextResponse.next()

  try {
    const resRateLimiter = await generalRateLimiter.get(ip)
    if (resRateLimiter) {
      response.headers.set('X-RateLimit-Limit', String(generalRateLimiter.points))
      response.headers.set('X-RateLimit-Remaining', String(resRateLimiter.remainingPoints))
      response.headers.set('X-RateLimit-Reset', String(Math.round((Date.now() + resRateLimiter.msBeforeNext) / 1000)))
    }
  } catch (err) {
    // Ignore errors when getting rate limit info
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard',
    '/admin-dashboard',
    '/login',
    '/admin-login',
  ],
}