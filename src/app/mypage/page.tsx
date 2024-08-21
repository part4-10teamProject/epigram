'use client';
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const MyPage: React.FC = () => {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <div>
      <h1>Welcome to the MyPage!</h1>
      {isLoggedIn ? (
        <>
          <p>You are logged in!</p>
          <button onClick={logout}>로그아웃</button>
        </>
      ) : (
        <>
          <p>You are not logged in.</p>
          <button onClick={login}>로그인</button>
        </>
      )}
    </div>
  );
};
export default MyPage;
