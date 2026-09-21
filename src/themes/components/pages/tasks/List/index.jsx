"use client";

import DataTable from "@/themes/components/dataTable";

export default function tasks({ tasks }) {
  const columns = [
    {
      key: "title",
      label: "Task",
    },
    {
      key: "wellName",
      label: "Well",
    },
    {
      key: "priority",
      label: "Priority",
    },
    {
      key: "assignedToName",
      label: "Assignee",
    },
    {
      key: "status",
      label: "Status",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={tasks}
      permissionKey="tasks"
      createPageLink="/tasks/create"
      editHref={(row) => `/tasks/${row.id}/edit`}
      deleteUrl="/api/tasks"
    />
  );
}