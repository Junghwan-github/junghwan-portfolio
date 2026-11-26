import type { Metadata } from "next";
import type { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "@/styles/globals.css";
import { siteUrl as metadataBase } from "./site-url";

const title = "박정환 | 풀스택 개발자 포트폴리오";
const description = "풀스택 개발자 박정환의 포트폴리오입니다. 기능별 구현 사례와 사용 기술을 소개합니다.";
const indexable = process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== "preview";
const shareImage = "/images/about-clay-portrait-white.webp";

export const metadata: Metadata = {
  metadataBase,
  title,
  description,
  authors: [{ name: "박정환" }],
  robots: { index: indexable, follow: indexable },
  alternates: metadataBase ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "JUNGHWAN PARK Portfolio",
    title,
    description,
    ...(metadataBase && {
      url: "/",
      images: [{ url: shareImage, width: 900, height: 900, alt: "박정환 포트폴리오 프로필 이미지" }],
    }),
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: metadataBase ? [{ url: shareImage, alt: "박정환 포트폴리오 프로필 이미지" }] : undefined,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body id="top">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
