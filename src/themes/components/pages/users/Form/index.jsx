"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import DataForm from "@/themes/components/dataForm/index";
import FormInput from "@/themes/components/dataForm/FormInput";
import FormSelect from "@/themes/components/dataForm/FormSelect";
import { handleFormSubmit } from "@/themes/lib/formSubmit";

export default function UserForm({ user }) {
    const router = useRouter();
    const isEdit = Boolean(user);

    const [error, setError] = useState(null);
    const [roles, setRoles] = useState([]);

    const form = useForm({
        defaultValues: {
            name: user?.name ?? "",
            email: user?.email ?? "",
            password: "",
            roleId: user?.roleId ?? "",
        },
    });

    useEffect(() => {
        async function getRoles() {
            try {
                const response = await fetch("/api/roles");

                if (!response.ok) {
                    throw new Error("Failed to fetch roles");
                }

                const result = await response.json();

                setRoles(result);
            } catch (error) {
                console.error("Roles fetch error:", error);
            }
        }

        getRoles();
    }, []);

    const ROLE_OPTIONS = roles.map((role) => ({
        value: role.id,
        label: role.name,
    }));

    const onSubmit = (values) =>
        handleFormSubmit(values, {
            endpoint: "users",
            id: user?.id,
            omitEmpty: isEdit ? ["password"] : [],
            setError: form.setError,
            setErrorState: setError,
            router,
            successRedirect: "/users",
            successMessage: isEdit
                ? "User updated successfully."
                : "User created successfully.",
        });

    return (
        <DataForm
            title={isEdit ? "Edit User" : "Create User"}
            data={{ id: user?.id ?? 0 }}
            form={form}
            onSubmitAction={onSubmit}
            error={error}
            backPageLink="/users"
            breadcrumbItems={[
                {
                    label: "Users",
                    href: "/users",
                },
                {
                    label: isEdit ? "Edit User" : "Create User",
                },
            ]}
        >
            <div className="grid grid-cols-2 gap-3">

                <FormInput
                    name="name"
                    label="Name"
                    placeholder="Enter name"
                    required
                />

                <FormInput
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    required
                />

                <FormInput
                    name="password"
                    label="Password"
                    type="password"
                    placeholder={
                        isEdit
                            ? "Leave blank to keep current"
                            : "Enter password"
                    }
                    required={!isEdit}
                />

                <FormSelect
                    name="roleId"
                    label="Role"
                    required
                    options={ROLE_OPTIONS}
                />

            </div>
        </DataForm>
    );
}