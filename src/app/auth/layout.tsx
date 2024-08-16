"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Layout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const router = useRouter()
    const pathname = usePathname()

    const switchTab = (page: "login" | "register") => {
        if(page == "login"){
            if(pathname == "/auth/login"){
                return
            }
            router.push("/auth/login")
        }
        if(pathname == "/auth/register"){
            return
        }
        router.push("/auth/register")
    }

    return (
        <main id="auth" className="w-[400px] border border-indigo-300 rounded-md">
            <div className="flex w-full justify-evenly mb-4 border-b border-gray-200">
                <div className={`w-full text-center px-6 py-2 cursor-pointer hover:bg-blue-900 hover:text-white focus:bg-blue-900 focus:text-white ${pathname == "/auth/login" ? "bg-blue-900 text-white" : ""}`} onClick={() => switchTab("login")}>
                    Login
                </div>
                <div className={`w-full text-center px-6 py-2 cursor-pointer hover:bg-blue-900 hover:text-white focus:bg-blue-900 focus:text-white ${pathname == "/auth/register" ? "bg-blue-900 text-white" : ""}`} onClick={() => switchTab("register")}>
                    Register
                </div>
            </div>
            {children}
            <p className="px-8 pb-4 text-end">
                {pathname === "/auth/register" ? (
                    <>
                        Already have an account? <Link href="/auth/login" className="underline decoration-blue-900 underline-offset-4">Login</Link>
                    </>
                ) : (
                    <>
                        Don&apos;t have an account? <Link href="/auth/register" className="underline decoration-blue-900 underline-offset-4">Register</Link>
                    </>
                )}
            </p>

        </main>
    );
}
