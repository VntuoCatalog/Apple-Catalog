import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apple Catalog",
  description: "A minimal Apple product catalog built with Next.js, TypeScript and Tailwind CSS.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
