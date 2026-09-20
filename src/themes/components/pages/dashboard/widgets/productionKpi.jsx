import StatCard from "@/themes/components/pages/dashboard/components/Cards/index";

export default function ProductionKpi({ data = [] }) {
  const totalProduction = data.reduce((total, item) => {
    const production = Number(item.Production_1D);

    return total + (Number.isFinite(production) ? production : 0);
  }, 0);

  return (
    <StatCard
      title="Total Production"
      value={`${totalProduction.toFixed(1)} m³/d`}
      description="Current filtered production"
    />
  );
}