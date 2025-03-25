"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => { 
    const savedEmail = sessionStorage.getItem("email");
    if (savedEmail) {
      router.push("/tasks");
    }
  }, [router]);

  const handleLogin = (e: any) => {
    e.preventDefault()
    if(email === "123@gmail.com" && password === "a") {
      alert("Logged in");
      sessionStorage.setItem("email", email);
      router.push("/tasks");
    } else {
      alert("Invalid credentials");
    }
  }
  return (
    <>
      <Link href="/">
        <button>Home</button>
      </Link>
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input type="email" placeholder="123@gmail.com" value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button type="submit">Login</button>
      </form>
      <h1>Email: {email}</h1>
      <h1>Password: {password}</h1>
    </>
  );
}