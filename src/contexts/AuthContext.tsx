'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useUserInfo } from '@/hooks/useUserInfo';

interface UserInfo {
  id: number;
  nickname: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  image: string | null;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userInfo: UserInfo | null; // userInfo가 없을 수도 있으므로 null을 허용합니다.
  login: (token: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { data: userInfo, refetch } = useUserInfo();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      refetch();
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [refetch]);

  const login = (token) => {
    // 로그인 후 쿠키에 토큰 저장
    Cookies.set('token', token);
    setIsLoggedIn(true);
    refetch();
  };

  const logout = () => {
    // 로그아웃 시 쿠키에서 토큰 제거
    Cookies.remove('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
