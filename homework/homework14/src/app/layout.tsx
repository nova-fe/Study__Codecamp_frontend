import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local';
import './globals.css';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-global',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'homework 05',
  description: 'homework 05',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable} antialiased`}>{children}</body>
    </html>
  );
}
