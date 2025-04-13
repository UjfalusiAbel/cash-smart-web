"use client";

import AuthProvider from "./components/contexts/AuthProvider";
import "./globals.css";
import type { Metadata } from "next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en" style={{ height: "100%", width: "100%" }}>
        <body style={{ height: "100%", width: "100%" }}>{children}</body>
      </html>
    </AuthProvider>
  );
}
