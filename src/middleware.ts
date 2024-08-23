import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { postCodeToken, postJWTToken } from '@/api/auth/oauth';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  //구글
  if (request.nextUrl.pathname === '/login/oauth/GOOGLE') {
    const pageUrl = new URL('/', request.url);
    const authCode = request.nextUrl.searchParams.get('code');

    const data = await postJWTToken(authCode);
    const res = NextResponse.redirect(pageUrl);
    res.headers.set('Set-Cookie', `token=${data.accessToken};Path=/`);
    res.headers.append('Set-Cookie', `refresh=${data.refreshToken};Path=/`);
    res.headers.append('Set-Cookie', `userId=${data.user.id};Path=/`);
    return res;
  }
  //카카오
  else if (request.nextUrl.pathname === '/login/oauth/KAKAO') {
    const pageUrl = new URL('/', request.url);

    const authCode = request.nextUrl.searchParams.get('code');
    const data = await postCodeToken(authCode, 'KAKAO');

    const res = NextResponse.redirect(pageUrl);
    res.headers.set('Set-Cookie', `token=${data.accessToken};Path=/`);
    res.headers.append('Set-Cookie', `refresh=${data.refreshToken};Path=/`);
    res.headers.append('Set-Cookie', `userId=${data.user.id};Path=/`);

    return res;
  }
}
