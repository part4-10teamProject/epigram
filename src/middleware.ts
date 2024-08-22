import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { postCodeToken } from '@/api/auth/oauth';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  if (request.nextUrl.pathname === '/login/oauth/GOOGLE') {
    const pageUrl = new URL('/', request.url);

    const authCode = request.nextUrl.searchParams.get('code');
    const data = await postCodeToken(authCode, 'GOOGLE');

    const res = NextResponse.redirect(pageUrl);
    res.headers.set('Set-Cookie', `accessToken=${data.accessToken};Path=/`);
    res.headers.append(
      'Set-Cookie',
      `refreshToken=${data.refreshToken};Path=/`,
    );

    return res;
  } else if (request.nextUrl.pathname === '/login/oauth/KAKAO') {
    const pageUrl = new URL('/', request.url);

    const authCode = request.nextUrl.searchParams.get('code');
    const data = await postCodeToken(authCode, 'KAKAO');

    const res = NextResponse.redirect(pageUrl);
    res.headers.set('Set-Cookie', `accessToken=${data.accessToken};Path=/`);
    res.headers.append(
      'Set-Cookie',
      `refreshToken=${data.refreshToken};Path=/`,
    );
    res.headers.append('Set-Cookie', `userId=${data.user.id};Path=/`);

    return res;
  }
}
