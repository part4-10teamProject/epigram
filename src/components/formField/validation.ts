//이메일 형식 유효성

export const checkEmail = (email: string) => {
  const emailReg = /^A-Za-z0-9@A-Za-z0-9.[A-Za-z]{2,3}$/;
  return emailReg.test(email);
};

//비밀번호 형식 유효성

export const checkPasswordLength = (password: string) => {
  if (password.length > 12) {
    return false;
  } else {
    return true;
  }
};

//비밀번호 확인 비교

export const checkPasswordSame = (password: string, passwordCheck: string) => {
  if (password === passwordCheck) {
    return true;
  } else {
    return false;
  }
};

//닉네임 길이 유효성

export const checkNicknameLength = (nickname: string) => {
  if (nickname.length > 12) {
    return false;
  } else {
    return true;
  }
};
