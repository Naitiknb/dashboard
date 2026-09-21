import { NextResponse } from "next/server";
import { getWellById, updateWell, deleteWell } from "@/lib/wells";

export async function GET(_req, { params }) {
  const { id } = await params;
  const well = await getWellById(id);
  return well
    ? NextResponse.json(well)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const result = await updateWell(id, await request.json());
  if (result.error) return NextResponse.json(result, { status: result.status });
  return NextResponse.json(result.well);
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  const result = await deleteWell(id);
  if (result.error) return NextResponse.json(result, { status: result.status });
  return NextResponse.json(result);
}