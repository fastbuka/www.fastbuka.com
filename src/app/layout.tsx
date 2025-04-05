import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Theme } from '@radix-ui/themes';
import { Toaster } from '@/components/ui/toaster';
import ClientProviders from '@/components/providers/ClientProviders';

const satoshiFont = localFont({
  src: './fonts/Satoshi-Regular.woff',
  variable: '--font-satoshi',
  weight: '400 700',
});

export const metadata: Metadata = {
  title: 'Fast Buka',
  description: 'FastBuka – Order meals and pay with tokens',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang='en'>
      <body className={`antialiased`}>
        <Theme>
          <ClientProviders>
            <main>{children}</main>
          </ClientProviders>
        </Theme>
        <Toaster />
      </body>
    </html>
  );
}
