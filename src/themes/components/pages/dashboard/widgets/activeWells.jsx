import StatCard from "@/themes/components/pages/dashboard/components/Cards/index";

export default function ActiveWellKpi({ data = [] }) {
  const activeWells = new Set(
    data
      .map((item) => item["Well Name"])
      .filter(Boolean)
  ).size;

  return (
    <StatCard
      title="Active Wells"
      value={activeWells}
      description="Currently active wells"
    />
  );
}