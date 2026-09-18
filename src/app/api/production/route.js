import { NextResponse } from "next/server";
import Papa from "papaparse";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "frontend_sample_data.csv"
    );

    const csvText = fs.readFileSync(filePath, "utf8");

    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    return NextResponse.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to load production data",
      },
      { status: 500 }
    );
  }
}