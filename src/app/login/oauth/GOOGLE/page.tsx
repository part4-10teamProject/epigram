import { redirect } from 'next/navigation';

export async function getServerSideProps(context) {
  const codeToken = context.query.code;

  if (codeToken) {
    console.log('Authorization Code:', codeToken);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signIn/GOOGLE`,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          redirectUri: 'http://localhost:3000/login/oauth/GOOGLE',
          token: codeToken,
        }),
      },
    );
    if (response.status === 403) {
      return {
        redirect: { destination: '/signup', permanent: false },
      };
    }
    const data = await response.json();
    if (data.accessToken) {
      return {
        redirect: {
          destination: '/login',
          permanetnt: false,
        },
      };
    }
  }

  return { props: {} };
}

export default function OAuthCallback() {
  return null;
}
