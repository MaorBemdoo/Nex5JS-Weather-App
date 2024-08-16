import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login - NextJS Weather App",
};

export default function Layout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return children
}
