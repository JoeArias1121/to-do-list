import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Fetch all tasks
export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

// Create a new task
export async function POST(req: Request) {
  const { title } = await req.json();
  const newTask = await prisma.task.create({ data: { title } });
  return NextResponse.json(newTask);
}
