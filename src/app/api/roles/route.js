import { NextResponse } from "next/server";
import { getRoles, createRole } from "@/lib/roles";

export async function GET() {
  return NextResponse.json(await getRoles());
}

export async function POST(request) {
  const body = await request.json();
  const result = await createRole(body);
  if (result.error) return NextResponse.json(result, { status: 409 });
  return NextResponse.json(result.role, { status: 201 });
}