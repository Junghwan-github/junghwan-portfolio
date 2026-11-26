import type { Metadata } from "next";
import type { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "JUNGHWAN PARK Portfolio",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body id="top">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
