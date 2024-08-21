'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const queryclient = new QueryClient();

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
  );
};
