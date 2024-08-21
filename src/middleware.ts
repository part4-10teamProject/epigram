import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { postCodeToken, postJWTToken } from '@/api/auth/oauth';

export function middleware(request: NextRequest, event: NextFetchEvent) {
  if (request.nextUrl.pathname === '/login/oauth/GOOGLE') {
    const pageUrl = new URL('/', request.url);
    const authCode = request.nextUrl.searchParams.get('code');

    event.waitUntil(postCodeToken(authCode, 'GOOGLE'));

    return NextResponse.redirect(pageUrl);
  } else if (request.nextUrl.pathname === '/login/oauth/KAKAO') {
    const pageUrl = new URL('/', request.url);
    const authCode = request.nextUrl.searchParams.get('code');

    event.waitUntil(postJWTToken(authCode, 'KAKAO'));

    return NextResponse.redirect(pageUrl);
  }
}
