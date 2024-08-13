'use client';

import { UserData, AuthResponse, ButtonData } from '@/types/auth';
//import Cookies from 'js-cookie';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function postUserInput(
  buttonData: ButtonData,
): Promise<AuthResponse> {
  const buttonUserData = buttonData.userData;
  const buttonEndpointData = buttonData.endpoint;
  const response = await fetch(`${baseURL}/auth/${buttonEndpointData}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buttonUserData),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  const data: AuthResponse = await response.json();
  return data;
}

export async function getUserData(id: string) {
  const response = await fetch(`${baseURL}/user/${id}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user data'); // 오류 처리
  }
  const data: AuthResponse = await response.json();
  return data;
}
/*토큰 저장

  const token = data.accessToken;
  const expireDate = new Date(Date.now() + 86400e3).toUTCString;

  const userId = data.user.id;

  document.cookie =
    `userId=${userId};accessToken=${token};path=/;expires=` + expireDate;

  //console.log=""*/
