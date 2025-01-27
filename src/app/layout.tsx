import './globals.css';
import Providers from '@/Providers';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Theme } from '@radix-ui/themes';

const satoshiFont = localFont({
  src: './fonts/Satoshi-Regular.woff',
  variable: '--font-satoshi',
  weight: '400 700',
});

export const metadata: Metadata = {
  title: 'Fast Buka',
  description: 'FastBuka – Order meals and pay with tokens',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`antialiased`}>
        <Providers>
          <Theme>
            <main>{children}</main>
          </Theme>
        </Providers>
      </body>
    </html>
  );
}
