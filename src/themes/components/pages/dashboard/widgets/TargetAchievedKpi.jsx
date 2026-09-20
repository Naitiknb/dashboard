import StatCard from "@/themes/components/pages/dashboard/components/Cards/index";

export default function TargetAchievedKpi({ data = [] }) {
  const totalProduction = data.reduce((total, item) => {
    const production = Number(item.Production_1D);

    return total + (Number.isFinite(production) ? production : 0);
  }, 0);

  const totalTarget = data.reduce((total, item) => {
    const target = Number(item["Production Target"]);

    return total + (Number.isFinite(target) ? target : 0);
  }, 0);

  const targetAchieved =
    totalTarget > 0
      ? (totalProduction / totalTarget) * 100
      : 0;

  return (
    <StatCard
      title="Target Achieved"
      value={`${targetAchieved.toFixed(1)}%`}
      description="Production against target"
    />
  );
}