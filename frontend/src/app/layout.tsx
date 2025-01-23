import type { Metadata } from "next";

import "./globals.css";
import {twMerge } from "tailwind-merge";
import localFont from 'next/font/local'




const Aeonik = localFont({
  src: [
    {
      path: '../fonts/A-Bold.otf',
      weight: '400',
      style: 'bold',
    },
    {
      path: '../fonts/A-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/A-Light.otf',
      weight: '400',
      style: 'light',
    },
   
  ],
})

export const metadata: Metadata = {
  title: "AI Startup Landing Page",
  description: "A landing page for an AI startup created with Frontend Tribe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge(Aeonik.className, "bg-[#efefef] text-black antialised)")}>{children}</body>
    </html>
  );
}
