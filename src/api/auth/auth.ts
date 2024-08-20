'use client';

import { AuthResponse, ButtonData } from '@/types/auth';
import { instance } from '@/api/client/AxiosInstance';

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
