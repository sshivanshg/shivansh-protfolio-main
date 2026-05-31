import type { Metadata } from "next";
import { Geist, Geist_Mono, Kalam, Permanent_Marker } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const permanentMarker = Permanent_Marker({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-permanent-marker",
});

const kalam = Kalam({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-kalam",
});


export const metadata: Metadata = {
  title: "Shivansh Gupta — AI & Full-Stack Engineer",
  description:
    "Portfolio of Shivansh Gupta — founder, AI & full-stack engineer with a cloud/DevOps streak. ML research, agentic AI products, and the infrastructure behind them.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${permanentMarker.variable} ${kalam.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
