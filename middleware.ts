import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { COOKIE_NAME } from './utils/constants'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) { 
    if (!request.cookies.has(COOKIE_NAME)) {
      return NextResponse.redirect(new URL('/signin', request.url)) 
    }
  }

  if (request.nextUrl.pathname === '/') {
    // not quite working as expected... 
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/'],
}

// must make this file at root level
// Runs on edge run time > not node run time - protects routes from being exposed to the client

// ### **Key Use Cases for Middleware**
// - **Authentication and Authorization**: Verify user identity and session status before allowing access to specific pages or resources.
// - **Server-Side Redirects**: Redirect users dynamically based on criteria like locale or user roles without reaching the client-side.
// - **Path Rewriting**: Dynamically modify paths, which is useful for A/B testing, feature rollouts, or supporting legacy URLs.
// - **Bot Detection**: Identify and block bot traffic to protect your resources. // set up rate limiting or DDOS protection
// - **Logging and Analytics**: Capture request data for analysis before it is processed further, enhancing insights into application usage.
// - **Feature Flagging**: Dynamically toggle features on or off for users, facilitating seamless feature testing and rollout.

// https://clumsy-humor-894.notion.site/7-Protect-Routes-with-Middleware-2824779bed824fea8fb96a665fca2253