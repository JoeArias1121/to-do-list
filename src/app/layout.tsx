"use client";
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Home
          </Link>
          <Link href="/login" className={pathname === "/login" ? "active" : ""}>
            Login
          </Link>
          <Link href="/tasks" className={pathname === "/tasks" ? "active" : ""}>
            Tasks
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
