import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextJS Weather App",
  description: "A NextJS Weather App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen has-[#auth]:grid has-[#auth]:place-content-center">{children}</body>
    </html>
  );
}
