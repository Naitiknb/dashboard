"use client";

import DataTable from "../../../dataTable";

const columns = [
  { key: "id", label: "id" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
];

export default function UserList({ users }) {
  return (
    <DataTable
      columns={columns}
      data={users}
      permissionKey="users"
      createPageLink="/users/create"
      editHref={(row) => `/users/${row.id}/edit`}
      deleteUrl="/api/users"
    />
  );
}