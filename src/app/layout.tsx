"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  

  useEffect(() => {
    setUser(sessionStorage.getItem("email"));
    if (user && user.length > 7) {
      setUser(user.slice(0, 7) + "...");
    }
  }, [user]);

  const logOut = () => {
    sessionStorage.removeItem("email");
    router.push("/login");
  };

  const login = () => {
    router.push("/login");
  }

  return (
    <html lang="en">
      <body>
        <div className="header">
          {user ? <p className="welcome">Welcome: { user }</p> : <p className="welcome">Welcome</p>}
          <nav className="navbar">
            <Link href="/" className={pathname === "/" ? "active" : ""}>
              Home
            </Link>
            <Link href="/tasks" className={pathname === "/tasks" ? "active" : ""}>
              Tasks
            </Link>
          </nav>
          <div className="logout-container">
            {user ? <button className="logout" onClick={login}>Logout</button> : <button className="login" onClick={logOut}>Login</button>}
          </div>  
        </div>
        <div className="page">{children}</div>
      </body>
    </html>
  );
}
