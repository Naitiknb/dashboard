"use client";

import DataTable from "@/themes/components/dataTable";

export default function Roles({ roles }) {
    const columns = [

        {
            key:"id",
            label:"id"
        },
        {
            key: "name",
            label: "Name",
        },
        {
            key: "status",
            label: "Status",
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={roles}
            createPageLink="/roles/create"
            editHref={(row) => `/roles/${row.id}/edit`}
            deleteUrl="/api/roles"
        />
    );
}