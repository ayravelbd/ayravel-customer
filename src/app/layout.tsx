import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/lib/providers";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AuthProvider } from "@/provider/AuthProvider";
import FacebookPixelWrapper from "@/components/FacebookPixelWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AYraveL",
  description: "Vendor management website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="LpZLw4YP3jVUhxNXTsq2lgGT18ZtmViLnqZ4GcMfR70" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <AuthProvider>
          <Providers>
            {children}
            <Toaster position="top-right" />
            <FacebookPixelWrapper />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
