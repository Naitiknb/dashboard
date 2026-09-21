"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import DataForm from "@/themes/components/dataForm/index";
import FormInput from "@/themes/components/dataForm/FormInput";
import FormSelect from "@/themes/components/dataForm/FormSelect";
import { handleFormSubmit } from "@/themes/lib/formSubmit";

import PermissionCheckboxes from "../components/PermissionCheckboxes";

export default function RoleForm({ role }) {
    const router = useRouter();
    const isEdit = Boolean(role);

    const [error, setError] = useState(null);

    const STATUS_OPTIONS = [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
    ];

    const form = useForm({
        defaultValues: {
            name: role?.name ?? "",
            description: role?.description ?? "",
            status: role?.status ?? "active",
            permissions: role?.permissions ?? [],
        },
    });

    const onSubmit = (values) =>
        handleFormSubmit(values, {
            endpoint: "roles",
            id: role?.id,
            setError: form.setError,
            setErrorState: setError,
            router,
            successRedirect: "/roles",
            successMessage: isEdit
                ? "Role updated successfully."
                : "Role created successfully.",
        });

    return (
        <DataForm
            title={isEdit ? "Edit Role" : "Create Role"}
            data={{ id: role?.id ?? 0 }}
            form={form}
            onSubmitAction={onSubmit}
            error={error}
            backPageLink="/roles"
            breadcrumbItems={[
                {
                    label: "Roles",
                    href: "/roles",
                },
                {
                    label: isEdit ? "Edit Role" : "Create Role",
                },
            ]}
        >
            <div className="grid grid-cols-2 gap-3">

                <FormInput
                    name="name"
                    label="Role Name"
                    placeholder="Enter role name"
                    required
                />

                <FormSelect
                    name="status"
                    label="Status"
                    options={STATUS_OPTIONS}
                    required
                />

            </div>

            <div className="mt-6">
                <h2 className="mb-4 text-lg font-semibold">
                    Permissions
                </h2>

                <PermissionCheckboxes
                    value={form.watch("permissions")}
                    onChange={(permissions) =>
                        form.setValue("permissions", permissions)
                    }
                />
            </div>
        </DataForm>
    );
}