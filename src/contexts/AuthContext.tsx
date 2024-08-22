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
  userInfo: UserInfo | null;
  isLoading: boolean; // 추가된 로딩 상태
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 초기 로딩 상태 추가
  const { data: userInfo, refetch } = useUserInfo();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      refetch().then(() => {
        setIsLoggedIn(true);
        setIsLoading(false); // 로딩 완료
      });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false); // 로딩 완료
    }
  }, [refetch]);

  const login = (token: string) => {
    Cookies.set('token', token);
    setIsLoggedIn(true);
    refetch();
  };

  const logout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userInfo, isLoading, login, logout }}
    >
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
