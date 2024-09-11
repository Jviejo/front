'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import { ethers } from "ethers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WrapperAcountProvider } from "@/components/context";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const account = {
    wallet: null,
  };
  return (
    <WrapperAcountProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <div className="p-10 space-y-10">{children}
          </div>
          {/* <Footer /> */}
        </body>
      </html>
    </WrapperAcountProvider>
  );
}
