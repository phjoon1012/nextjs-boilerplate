import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/home/Navbar";
import AdminAuthProvider from "@/components/home/AdminAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hyeonjoon Park",
  description: "Portfolio and projects by Hyeonjoon Park",
  icons: {
    icon: [
      {
        url: "/michigan.png",
        type: "image/png",
      },
      {
        url: "/michigan.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AdminAuthProvider>
          <Navbar />
          {children}
        </AdminAuthProvider>
      </body>
    </html>
  );
}
