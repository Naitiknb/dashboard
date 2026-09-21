import { NextResponse } from "next/server";
import { getTasks, createtask } from "@/lib/tasks";

export async function GET() {
  return NextResponse.json(await getTasks());
}

export async function POST(request) {
  const body = await request.json();
  const result = await createtask(body);
  if (result.error) return NextResponse.json(result, { status: 409 });
  return NextResponse.json(result.task, { status: 201 });
}