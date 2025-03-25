"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Tasks() {
  const router = useRouter();
  return (
    <>
      <Link href='../'>
        <button>Home</button>
      </Link>
      <h1>Tasks</h1>
    </>
  );
}