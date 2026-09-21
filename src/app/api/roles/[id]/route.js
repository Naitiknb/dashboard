import { NextResponse } from "next/server";
import { getRolesById, updateRole, deleteRole } from "@/lib/roles";

export async function GET(_req, { params }) {
  const { id } = await params;
  const role = await getRolesById(id);
  return role
    ? NextResponse.json(role)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const result = await updateRole(id, await request.json());
  if (result.error) return NextResponse.json(result, { status: result.status });
  return NextResponse.json(result.role);
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  const result = await deleteRole(id);
  if (result.error) return NextResponse.json(result, { status: result.status });
  return NextResponse.json(result);
}