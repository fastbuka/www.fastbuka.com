import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/css/satoshi.css";
import "@/css/style.css";
import { AppContext } from '@/hooks/AppContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FastBuka",
  description: "Your No. 1 food delivery App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContext>
          {children}
        </AppContext>
        </body>
    </html>
  );
}