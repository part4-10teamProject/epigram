'use client';
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const MyPage: React.FC = () => {
  const { logout } = useAuth();
  // 이런식으로 로그인 상태쓰면 됩니다.
  return (
    <div>
      <h1>Welcome to the MyPage!</h1>
      <p>You are logged in!</p>
      <button className="border bg-yellow-300" onClick={logout}>
        로그아웃
      </button>
    </div>
  );
};
export default MyPage;
