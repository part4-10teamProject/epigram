'use client';

export interface UserData {
  email: string;
  nicknam?: string;
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
