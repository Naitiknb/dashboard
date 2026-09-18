import Papa from "papaparse";

export async function loadProductionData() {
  const response = await fetch("/data/frontend_sample_data.csv");

  if (!response.ok) {
    throw new Error("Failed to load CSV");
  }

  const csvText = await response.text();

  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return result.data;
}