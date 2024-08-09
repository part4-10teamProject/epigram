import React from 'react';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

//interface propsType =

//해당 유저 정보 유무 판단

//export function getUserData:React.FC<propsType>() {}

//onSubmit에 줄 post 함수

//export function postUserData:React.FC<>'

export async function fetchData(url: string): Promise<propsType> {
  const response = await fetch(baseURL);
}
