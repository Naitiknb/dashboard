"use client";

export default function Rankings({ data = [] }) {
  const wellData = {};

  data.forEach((item) => {
    const well = item["Well Name"];

    if (!wellData[well]) {
      wellData[well] = {
        production: 0,
        target: 0,
      };
    }

    const production = Number(item.Production_1D);
    const target = Number(item["Production Target"]);

    if (Number.isFinite(production)) {
      wellData[well].production += production;
    }

    if (Number.isFinite(target)) {
      wellData[well].target += target;
    }
  });

  const wells = Object.entries(wellData).map(
    ([well, values]) => {
      const achievement =
        values.target > 0
          ? (values.production / values.target) * 100
          : 0;

      return {
        well,
        production: values.production,
        target: values.target,
        achievement,
      };
    }
  );

  const topPerforming = [...wells]
    .sort((a, b) => b.achievement - a.achievement)
    .slice(0, 5);

  const underPerforming = [...wells]
    .sort((a, b) => a.achievement - b.achievement)
    .slice(0, 5);

  return (
    <div className="rounded-xl border bg-white p-4">
      <h2 className="text-sm font-semibold">
        Well Performance
      </h2>

      <p className="mb-4 text-xs text-slate-500">
        Top and under-performing wells
      </p>

      <div className="space-y-5">
        <div>
          <h3 className="mb-2 text-xs font-semibold text-green-600">
            Top Performing
          </h3>

          <div className="space-y-2">
            {topPerforming.map((item) => (
              <div
                key={item.well}
                className="flex items-center justify-between rounded-lg bg-slate-50 p-2"
              >
                <span className="text-sm font-medium">
                  {item.well}
                </span>

                <span className="text-sm font-semibold">
                  {item.achievement.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-xs font-semibold text-red-600">
            Under Performing
          </h3>

          <div className="space-y-2">
            {underPerforming.map((item) => (
              <div
                key={item.well}
                className="flex items-center justify-between rounded-lg bg-slate-50 p-2"
              >
                <span className="text-sm font-medium">
                  {item.well}
                </span>

                <span className="text-sm font-semibold">
                  {item.achievement.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}