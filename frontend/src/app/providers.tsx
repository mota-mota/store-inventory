'use client';

import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { AuthProvider } from '@/context/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <AuthProvider>
        <ToastProvider placement={'top-center'} />
        {children}
      </AuthProvider>
    </HeroUIProvider>
  );
}
