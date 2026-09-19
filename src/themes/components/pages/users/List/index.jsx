import DataTable from "../../../dataTable";

export default function UsersPage() {
    const columns = [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
        { key: "status", label: "Status" },
    ];

    // Temporary data, will come from the database later
    const users = [
        {
            id: 1,
            name: "Rahul",
            email: "rahul@demo.com",
            role: "Analyst",
            status: "Active",
        },
        {
            id: 2,
            name: "Amit",
            email: "amit@demo.com",
            role: "Operator",
            status: "Active",
        },
        {
            id: 3,
            name: "Naitik",
            email: "naitik@demo.com",
            role: "Admin",
            status: "Active",
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={users}
            createPageLink="/users/create"
            editHref="/users/edit"
            deleteUrl="/api/users" toolbar={undefined} renderActions={undefined} actionsBefore={undefined} actionsAfter={undefined}        />
    );
} 