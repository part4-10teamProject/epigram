'use client';

export interface UserData {
  email: string;
  nickname?: string;
  password: string;
  passwordConfirmation?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    teamId: string;
    updatedAt: string;
    createdAt: string;
    image: null;
  };
}

export interface ButtonData {
  userData: UserData;
  endpoint: string;
}

export interface ErrorDataAxios {
  detail: {
    password: { message: string };
  };
  message: string;
}

//oauth

export interface PostOauth {
  redirectUri: string;
  token: string;
}

export interface OauthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    teamId: string;
    updatedAt: string;
    createdAt: string;
    image?: string;
  };
}
