'use client';

import { useQuery } from '@tanstack/react-query';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

//validation에서 가져다 쓸 함수

async function getUserData(endPoint: string) {
  if (!baseURL) {
    throw new Error('undefined');
  }

  const response = await fetch(`${baseURL}/auth/signIn}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  const data = response.json();

  return data;
}

/*
if(isLoading){return <div>Loadings...</div>}

const {data,isLoading,error} =useQuery(['userData'], getUserData)
*/
