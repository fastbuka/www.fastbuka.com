import React from 'react';
import NavBar from '@/components/AppNavBar';
import Footer from '@/components/AppFooter';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
