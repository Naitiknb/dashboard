"use client";

import { Checkbox } from "@/components/ui/checkbox";

const PERMISSION_GROUPS = [
    {
        title: "Dashboard",
        resources: [
            { key: "dashboard", label: "Dashboard", permissions: { view: "dashboard.view" } },
            { key: "productionKpi", label: "Production", permissions: { view: "dashboard.productionKpi" } },
            { key: "targetKpi", label: "Production Target", permissions: { view: "dashboard.targetKpi" } },
            { key: "targetAchieved", label: "Target Achieved", permissions: { view: "dashboard.targetAchieved" } },
            { key: "activeWells", label: "Active Wells", permissions: { view: "dashboard.activeWells" } },
            { key: "averageCycleTime", label: "Average Cycle Time", permissions: { view: "dashboard.averageCycleTime" } },
            { key: "productionTrend", label: "Production Trend", permissions: { view: "dashboard.productionTrend" } },
            { key: "fieldPerformance", label: "Field Performance", permissions: { view: "dashboard.fieldPerformance" } },
            { key: "rankings", label: "Rankings", permissions: { view: "dashboard.rankings" } },
            { key: "productionGrid", label: "Production Grid", permissions: { view: "dashboard.productionGrid" } },
        ],
    },

    {
        title: "Management",
        resources: [
            {
                key: "wells",
                label: "Wells",
                permissions: {
                    view: "wells.view",
                    create: "wells.create",
                    edit: "wells.edit",
                    delete: "wells.delete",
                },
            },
            {
                key: "tasks",
                label: "Tasks",
                permissions: {
                    view: "tasks.view",
                    create: "tasks.create",
                    edit: "tasks.edit",
                    delete: "tasks.delete",
                },
            },
            {
                key: "users",
                label: "Users",
                permissions: {
                    view: "users.view",
                    create: "users.create",
                    edit: "users.edit",
                    delete: "users.delete",
                },
            },
            {
                key: "roles",
                label: "Roles",
                permissions: {
                    view: "roles.view",
                    create: "roles.create",
                    edit: "roles.edit",
                    delete: "roles.delete",
                },
            },
        ],
    },
];

const ALL_ACTIONS = ["view", "create", "edit", "delete"];


const getGroupActions = (group) =>
    ALL_ACTIONS.filter((action) =>
        group.resources.some((resource) => resource.permissions[action])
    );

export default function PermissionCheckboxes({
    value = [],
    onChange,
}) {
    const handleChange = (permission, checked) => {
        if (checked) {
            onChange([...new Set([...value, permission])]);
        } else {
            onChange(value.filter((item) => item !== permission));
        }
    };

    return (
        <div className="space-y-4">
            {PERMISSION_GROUPS.map((group) => {
                const actions = getGroupActions(group);
                const gridStyle = {
                    gridTemplateColumns: `minmax(0,1fr) repeat(${actions.length}, 70px)`,
                };

                return (
                    <div key={group.title}>
                        <h3 className="mb-3 text-sm font-semibold">
                            {group.title}
                        </h3>

                        <div className="w-full overflow-hidden rounded-md border">
                            {/* Header */}
                            <div
                                className="grid items-center border-b bg-gray-50 px-4 py-3"
                                style={gridStyle}
                            >
                                <span className="text-sm font-medium">
                                    Permission
                                </span>

                                {actions.map((action) => (
                                    <span
                                        key={action}
                                        className="text-center text-sm font-medium capitalize"
                                    >
                                        {action}
                                    </span>
                                ))}
                            </div>

                            {/* Rows */}
                            {group.resources.map((resource) => (
                                <div
                                    key={resource.key}
                                    className="grid items-center border-b px-4 py-3 last:border-b-0"
                                    style={gridStyle}
                                >
                                    <span className="min-w-0 text-sm">
                                        {resource.label}
                                    </span>

                                    {actions.map((action) => {
                                        const permission =
                                            resource.permissions[action];

                                        return (
                                            <div
                                                key={action}
                                                className="flex justify-center"
                                            >
                                                {permission && (
                                                    <Checkbox
                                                        checked={value.includes(permission)}
                                                        onCheckedChange={(checked) =>
                                                            handleChange(
                                                                permission,
                                                                checked === true
                                                            )
                                                        }
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}