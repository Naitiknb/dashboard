"use client";

import ReactECharts from "echarts-for-react";

export default function ProductionTrend({ data = [] }) {
  const dates = data.map((item) =>
    new Date(item.Timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    })
  );

  const production1D = data.map((item) =>
    Number(item.Production_1D || 0)
  );

  const production7D = data.map((item) =>
    Number(item.Production_7D || 0)
  );

  const productionTarget = data.map((item) =>
    Number(item["Production Target"] || 0)
  );

  const option = {
    tooltip: {
      trigger: "axis",
    },

    legend: {
      top: 0,
      right: 0,
    },

    grid: {
      left: 50,
      right: 20,
      top: 50,
      bottom: 40,
    },

    xAxis: {
      type: "category",
      data: dates,
      boundaryGap: false,
    },

    yAxis: {
      type: "value",
      name: "Production",
    },

    series: [
      {
        name: "Production 1D",
        type: "line",
        data: production1D,
        smooth: true,
      },
      {
        name: "Production 7D",
        type: "line",
        data: production7D,
        smooth: true,
      },
      {
        name: "Production Target",
        type: "line",
        data: productionTarget,
        smooth: true,
      },
    ],
  };

  return (
    <div className="rounded-xl border bg-white p-3">
      <div className="mb-4">
        <h2 className="text-sm font-semibold">
          Production Trend
        </h2>

        <p className="text-sm text-slate-500">
          Production compared with target
        </p>
      </div>

      <ReactECharts
        option={option}
        style={{
          width: "100%",
          height: "420px",
        }}
      />
    </div>
  );
}