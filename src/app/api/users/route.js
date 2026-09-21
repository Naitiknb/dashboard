import { NextResponse } from "next/server";
import { getUsers, createUser } from "@/lib/users";

export async function GET() {
  return NextResponse.json(await getUsers());
}

export async function POST(request) {
  const body = await request.json();
  const result = await createUser(body);
  if (result.error) return NextResponse.json(result, { status: 409 });
  return NextResponse.json(result.user, { status: 201 });
}