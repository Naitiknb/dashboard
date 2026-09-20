import StatCard from "@/themes/components/pages/dashboard/components/Cards/index";

export default function AverageCycleTimeKpi({ data = [] }) {
  const validCycleTimes = data
    .map((item) => Number(item["Average Cycle Time"]))
    .filter(Number.isFinite);

  const averageCycleTime =
    validCycleTimes.length > 0
      ? validCycleTimes.reduce((total, value) => total + value, 0) /
        validCycleTimes.length
      : 0;

  const averageCycleTimeHours = averageCycleTime / 3600;

  return (
    <StatCard
      title="Avg Cycle Time"
      value={`${averageCycleTimeHours.toFixed(1)} hrs`}
      description="Average cycle time"
    />
  );
}