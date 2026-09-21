"use client";

import DataTable from "@/themes/components/dataTable";

export default function Wells({ wells }) {
  const columns = [
    {
      key: "wellName",
      label: "Well Name",
    },
    {
      key: "fieldName",
      label: "Field",
    },
    {
      key: "productionTarget",
      label: "Production Target",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "description",
      label: "Description",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={wells}
      permissionKey="wells"
      createPageLink="/wells/create"
      editHref={(row) => `/wells/${row.id}/edit`}
      deleteUrl="/api/wells"
    />
  );
}