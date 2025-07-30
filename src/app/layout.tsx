import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/AppProviders";
import Authentication from "@/components/auth/Authentication";
import AuthenticatedModals from "@/components/AuthenticatedModals";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "FastBuka Delivery",
  description: "Food & Grocery Delivery in Africa.",
  openGraph: {
    title: "FastBuka Delivery",
    description: "Food & Grocery Delivery in Africa.",
    url: "https://www.fastbuka.com",
    siteName: "FastBuka Delivery",
    images: [
      {
        url: "https://storage.fastbuka.com/images/fastbuka.jpg",
        width: 1200,
        height: 630,
        alt: "FastBuka Delivery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://www.fastbuka.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://storage.fastbuka.com/images/favicon.ico"
          sizes="any"
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <Providers>
          {children}
          <div className="fixed top-0 left-0 w-full @container">
            <Authentication />
            <AuthenticatedModals />
          </div>
        </Providers>
      </body>
    </html>
  );
}
