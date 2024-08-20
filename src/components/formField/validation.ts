'use client';

//이메일 형식 유효성

export const checkEmail = (email: string) => {
  const emailReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailReg.test(email);
};

//비밀번호 형식 유효성

export const checkPassword = (password: string) => {
  const passwordReg =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordReg.test(password);
};

//닉네임 0자 이상 입력 필요 조건

export const checkNickname = (nickname: string) => {
  if (nickname.length === 0) {
    return false;
  } else {
    return true;
  }
};
