import { NextResponse } from "next/server";
import { getWells, createWell } from "@/lib/wells";

export async function GET() {
  return NextResponse.json(await getWells());
}

export async function POST(request) {
  const body = await request.json();
  const result = await createWell(body);
  if (result.error) return NextResponse.json(result, { status: 409 });
  return NextResponse.json(result.well, { status: 201 });
}