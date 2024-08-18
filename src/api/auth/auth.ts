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

  const response = await instance.post(
    `/auth/signIn/${postRequestEndpoint}`,
    postRequestBody,
  );
  console.log(`Response:`, response.data);
  const data: OauthResponse = await response.data;
  return data;
}
