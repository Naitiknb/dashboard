import { NextResponse } from "next/server";
import { getUserById, updateUser, deleteUser } from "@/lib/db";

export async function GET(_req, { params }) {
  const { id } = await params;
  const user = await getUserById(id);
  return user
    ? NextResponse.json(user)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const result = await updateUser(id, await request.json());
  if (result.error) return NextResponse.json(result, { status: result.status });
  return NextResponse.json(result.user);
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  const result = await deleteUser(id);
  if (result.error) return NextResponse.json(result, { status: result.status });
  return NextResponse.json(result);
}