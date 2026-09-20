"use client";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function ProductionGrid({ data = [] }) {
  const columnDefs = [
    {
      field: "Well Name",
      headerName: "Well",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "Field Name",
      headerName: "Field",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "Timestamp",
      headerName: "Date",
      flex: 1,
      minWidth: 140,
    },
    {
      field: "Production_1D",
      headerName: "Production 1D",
      flex: 1,
      minWidth: 130,
      valueFormatter: (params) =>
        Number(params.value || 0).toFixed(2),
    },
    {
      field: "Production_7D",
      headerName: "Production 7D",
      flex: 1,
      minWidth: 130,
      valueFormatter: (params) =>
        Number(params.value || 0).toFixed(2),
    },
    {
      field: "Production Target",
      headerName: "Target",
      flex: 1,
      minWidth: 120,
      valueFormatter: (params) =>
        Number(params.value || 0).toFixed(2),
    },
    {
      field: "Average Cycle Time",
      headerName: "Cycle Time",
      flex: 1,
      minWidth: 120,
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="mb-4">
        <h2 className="text-sm font-semibold">
          Production Data
        </h2>

        <p className="text-xs text-slate-500">
          Detailed well production records
        </p>
      </div>

      <div
        className="ag-theme-alpine"
        style={{
          width: "100%",
          height: "500px",
        }}
      >
        <AgGridReact
          rowData={data}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          animateRows={true}
        />
      </div>
    </div>
  );
}