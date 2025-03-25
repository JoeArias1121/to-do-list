"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Tasks() {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = sessionStorage.getItem("email");
    if (!user) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const loggedInUser = "123@gmail.com"
    if (loggedInUser === "123@gmail.com") {
      setUser(loggedInUser as string)
    } else {
      router.push('/login')
    }
  }, [])

  const logOut = () => {
    sessionStorage.removeItem("email");
    router.push('/login');
  }

  return (
    <>
      <button onClick={logOut}>Logout</button>
      <h1>Tasks</h1>
      { user ? <p>Welcome {user}</p> : <p>Loading...</p> }
    </>
  );
}