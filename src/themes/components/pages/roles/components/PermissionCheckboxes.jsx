"use client";

import { Checkbox } from "@/components/ui/checkbox";

const PERMISSION_GROUPS = [
    {
        title: "Dashboard",
        permissions: [
            {
                value: "dashboard.view",
                label: "View Dashboard",
            },
        ],
    },
    {
        title: "Dashboard Widgets",
        permissions: [
            {
                value: "dashboard.widgets.production",
                label: "Production",
            },
            {
                value: "dashboard.widgets.target",
                label: "Production Target",
            },
            {
                value: "dashboard.widgets.performance",
                label: "Performance",
            },
            {
                value: "dashboard.widgets.topWells",
                label: "Top Wells",
            },
            {
                value: "dashboard.widgets.underPerforming",
                label: "Under Performing",
            },
            {
                value: "dashboard.widgets.fieldPerformance",
                label: "Field Performance",
            },
        ],
    },
    {
        title: "Wells",
        permissions: [
            {
                value: "wells.view",
                label: "View",
            },
            {
                value: "wells.create",
                label: "Create",
            },
            {
                value: "wells.edit",
                label: "Edit",
            },
            {
                value: "wells.delete",
                label: "Delete",
            },
        ],
    },
    {
        title: "Tasks",
        permissions: [
            {
                value: "tasks.view",
                label: "View",
            },
            {
                value: "tasks.create",
                label: "Create",
            },
            {
                value: "tasks.edit",
                label: "Edit",
            },
            {
                value: "tasks.delete",
                label: "Delete",
            },
        ],
    },
    {
        title: "Users",
        permissions: [
            {
                value: "users.view",
                label: "View",
            },
            {
                value: "users.create",
                label: "Create",
            },
            {
                value: "users.edit",
                label: "Edit",
            },
            {
                value: "users.delete",
                label: "Delete",
            },
        ],
    },
    {
        title: "Roles",
        permissions: [
            {
                value: "roles.view",
                label: "View",
            },
            {
                value: "roles.create",
                label: "Create",
            },
            {
                value: "roles.edit",
                label: "Edit",
            },
            {
                value: "roles.delete",
                label: "Delete",
            },
        ],
    },
];

export default function PermissionCheckboxes({
    value = [],
    onChange,
}) {
    const handleChange = (permission, checked) => {
        if (checked) {
            onChange([...value, permission]);
        } else {
            onChange(value.filter((item) => item !== permission));
        }
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {PERMISSION_GROUPS.map((group) => (
                <div key={group.title}>
                    <h3 className="mb-3 text-sm font-semibold">
                        {group.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-3 rounded-md border p-4">
                        {group.permissions.map((permission) => (
                            <label
                                key={permission.value}
                                className="flex cursor-pointer items-center gap-2"
                            >
                                <Checkbox
                                    checked={value.includes(permission.value)}
                                    onCheckedChange={(checked) =>
                                        handleChange(
                                            permission.value,
                                            checked
                                        )
                                    }
                                />

                                <span className="text-sm">
                                    {permission.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}