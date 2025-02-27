import React from 'react';
import AppNavBar from '@/components/AppNavBar';
import AppFooter from '@/components/AppFooter';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppNavBar />
      {children}
      <AppFooter />
    </div>
  );
}
