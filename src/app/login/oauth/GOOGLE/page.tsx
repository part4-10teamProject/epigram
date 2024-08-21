import { postCodeToken } from '@/api/auth/oauth';

function GooglePage({ searchParams }) {
  //param=>authCode
  const authCode = searchParams.code;
  if (!authCode) {
    return null;
  } else {
    postCodeToken(authCode, 'GOOGLE');
  }

  return <div></div>;
}
