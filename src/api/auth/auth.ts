'use client';

import {
  UserData,
  AuthResponse,
  ButtonData,
  PostOauth,
  OauthResponse,
} from '@/types/auth';
import { instance } from '../AxiosInstance';

export async function postUserInput(
  buttonData: ButtonData,
): Promise<AuthResponse> {
  const buttonUserData = buttonData.userData;
  const buttonEndpointData = buttonData.endpoint;

  const response = await instance.post(
    `/auth/${buttonEndpointData}`,
    buttonUserData,
  );
  console.log('Response:', response.data);
  const data: AuthResponse = await response.data;
  return data;
}

//Oauth

export async function postCodeToken(
  requestBody: PostOauth,
): Promise<OauthResponse> {
  const postRequestBody = requestBody.postBody;
  const postRequestEndpoint = requestBody.endpoint;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signIn/${postRequestEndpoint}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postRequestBody),
    },
  );
  if (!response.ok) {
    const errorText = await response.text(); // 서버에서의 오류 메시지를 읽어옵니다.
    throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
  }

  const data = await response.json();
  return data;
}
