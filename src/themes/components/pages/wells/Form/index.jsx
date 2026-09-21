"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import DataForm from "@/themes/components/dataForm/index";
import FormInput from "@/themes/components/dataForm/FormInput";
import FormSelect from "@/themes/components/dataForm/FormSelect";

import { handleFormSubmit } from "@/themes/lib/formSubmit";

const FIELD_OPTIONS = [
    { value: "Alpha 1", label: "Alpha 1" },
    { value: "Alpha 2", label: "Alpha 2" },
    { value: "Beta 1", label: "Beta 1" },
];

const STATUS_OPTIONS = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "maintenance", label: "Maintenance" },
    { value: "alert", label: "Alert" },
];

export default function WellsForm({ well }) {
    const router = useRouter();

    const isEdit = Boolean(well);

    const [error, setError] = useState(null);

    const form = useForm({
        defaultValues: {
            wellName: well?.wellName ?? "",
            fieldName: well?.fieldName ?? "",
            status: well?.status ?? "active",
            productionTarget: well?.productionTarget ?? "",
            description: well?.description ?? "",
        },
    });

    const onSubmit = (values) =>
        handleFormSubmit(values, {
            endpoint: "wells",
            id: well?.id,
            setError: form.setError,
            setErrorState: setError,
            router,
            successRedirect: "/wells",
            successMessage: isEdit
                ? "Well updated successfully."
                : "Well created successfully.",
        });

    return (
        <DataForm
            title={isEdit ? "Edit Well" : "Create Well"}
            data={{ id: well?.id ?? 0 }}
            form={form}
            onSubmitAction={onSubmit}
            error={error}
            backPageLink="/wells"
            breadcrumbItems={[
                { label: "Wells", href: "/wells" },
                {
                    label: isEdit ? "Edit Well" : "Create Well",
                },
            ]}
        > <div className="grid grid-cols-2 gap-3"> <FormInput
            name="wellName"
            label="Well Name"
            placeholder="Enter well name"
            required
        />


                <FormSelect
                    name="fieldName"
                    label="Field"
                    required
                    options={FIELD_OPTIONS}
                />

                <FormSelect
                    name="status"
                    label="Status"
                    required
                    options={STATUS_OPTIONS}
                />

                <FormInput
                    name="productionTarget"
                    label="Production Target"
                    type="number"
                    placeholder="Enter production target"
                />

                <FormInput
                    name="description"
                    label="Description"
                    placeholder="Enter well description"
                />
            </div>
        </DataForm>


    );
}
