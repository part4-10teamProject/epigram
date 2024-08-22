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
  user: {
    id: number;
    email: string;
    nickname: string;
    teamId: string;
    updatedAt: string;
    createdAt: string;
    image?: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface GoogleOauthResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}
