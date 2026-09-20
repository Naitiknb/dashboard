"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function FieldPerformance({ data = [] }) {
  const fieldData = {};

  data.forEach((item) => {
    const field = item["Field Name"];

    if (!fieldData[field]) {
      fieldData[field] = {
        production: 0,
        target: 0,
      };
    }

    const production = Number(item.Production_1D);
    const target = Number(item["Production Target"]);

    if (Number.isFinite(production)) {
      fieldData[field].production += production;
    }

    if (Number.isFinite(target)) {
      fieldData[field].target += target;
    }
  });

  const fields = Object.keys(fieldData);

  const production = fields.map((field) =>
    Number(fieldData[field].production.toFixed(1))
  );

  const target = fields.map((field) =>
    Number(fieldData[field].target.toFixed(1))
  );

  const options = {
    chart: {
      type: "column",
      height: 400,
      backgroundColor: "transparent",
    },

    title: {
      text: "Field Performance",
      style: {
        color: "#ffffff",
      },
    },

    xAxis: {
      categories: fields,

      title: {
        text: "Field",
        style: {
          color: "#ffffff",
        },
      },

      labels: {
        style: {
          color: "#ffffff",
        },
      },
    },

    yAxis: {
      title: {
        text: "Production",
        style: {
          color: "#ffffff",
        },
      },

      labels: {
        style: {
          color: "#ffffff",
        },
      },

      gridLineColor: "#374151",
    },

    legend: {
      itemStyle: {
        color: "#ffffff",
      },
    },

    tooltip: {
      shared: true,
    },

    series: [
      {
        name: "Production",
        data: production,
      },
      {
        name: "Target",
        data: target,
      },
    ],

    credits: {
      enabled: false,
    },
  };

  return (
    <div className="rounded-xl border bg-slate-900 p-4">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-white">
          Fields Performance
        </h2>

        <p className="text-xs text-slate-400">
          Production compared with target
        </p>
      </div>

      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
}