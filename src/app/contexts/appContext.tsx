'use client';
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
