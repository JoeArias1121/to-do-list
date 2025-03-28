import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Fetch all tasks
export async function GET() {
  const tasks = await prisma.task.findMany({ select: { id: true, title: true, completed: true } });
  return NextResponse.json(tasks);
}

// Create a new task
export async function POST(req: Request) {
  const { title } = await req.json();
  const newTask = await prisma.task.create({ data: { title } });
  const { createdAt, ...res } = newTask
  console.log(res);
  return NextResponse.json(res);
}

export async function DELETE(req: Request) {
  const deleteTask = await req.json();
  const { id } = deleteTask;
  const task = await prisma.task.delete({ where: { id } });
  return NextResponse.json(task);
}
