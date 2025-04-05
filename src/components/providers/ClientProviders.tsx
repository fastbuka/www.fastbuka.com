'use client';

import { FastBukaProvider } from '@/context';
import { ReactNode } from 'react';
import LocationCheck from '@/components/LocationCheck';

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <FastBukaProvider>
      <LocationCheck />
      {children}
    </FastBukaProvider>
  );
} 