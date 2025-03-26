import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local';
import './globals.css';
import Layout from '@/commons/layout';

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

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
