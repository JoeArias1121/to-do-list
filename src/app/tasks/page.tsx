"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Tasks() {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = "123@gmail.com"
    if (loggedInUser === "123@gmail.com") {
      setUser(loggedInUser as string)
    } else {
      router.push('/login')
    }
  }, [])

  return (
    <>
      <Link href='../'>
        <button>Home</button>
      </Link>
      <h1>Tasks</h1>
      { user ? <p>Welcome {user}</p> : <p>Loading...</p> }
    </>
  );
}