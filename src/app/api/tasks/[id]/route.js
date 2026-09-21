import { NextResponse } from "next/server";
import { getTasksById, updatetask, deletetask } from "@/lib/tasks";

export async function GET(_req, { params }) {
  const { id } = await params;
  const task = await getTasksById(id);
  return task
    ? NextResponse.json(task)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const result = await updatetask(id, await request.json());
  if (result.error) return NextResponse.json(result, { status: result.status });
  return NextResponse.json(result.task);
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  const result = await deletetask(id);
  if (result.error) return NextResponse.json(result, { status: result.status });
  return NextResponse.json(result);
}