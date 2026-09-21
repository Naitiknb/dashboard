"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import DataForm from "@/themes/components/dataForm/index";
import FormInput from "@/themes/components/dataForm/FormInput";
import FormSelect from "@/themes/components/dataForm/FormSelect";

import { handleFormSubmit } from "@/themes/lib/formSubmit";

const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const STATUS_OPTIONS = [
  { value: "open", label: "Open" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export default function TasksForm({ task }) {
  const router = useRouter();

  const isEdit = Boolean(task);

  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [wells, setWells] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const result = await response.json();

        setUsers(result);
      } catch (error) {
        console.error("Users fetch error:", error);
      }
    }

    async function getWells() {
      try {
        const response = await fetch("/api/wells");

        if (!response.ok) {
          throw new Error("Failed to fetch wells");
        }

        const result = await response.json();

        setWells(result);
      } catch (error) {
        console.error("Wells fetch error:", error);
      }
    }

    getUsers();
    getWells();
  }, []);

  const USER_OPTIONS = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const WELL_OPTIONS = wells.map((well) => ({
    value: well.id,
    label: well.wellName,
  }));

  const form = useForm({
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      wellId: task?.wellId ?? "",
      assignedTo: task?.assignedTo ?? "",
      priority: task?.priority ?? "medium",
      status: task?.status ?? "open",
      dueDate: task?.dueDate ?? "",
    },
  });

  const onSubmit = (values) =>
    handleFormSubmit(values, {
      endpoint: "tasks",
      id: task?.id,
      setError: form.setError,
      setErrorState: setError,
      router,
      successRedirect: "/tasks",
      successMessage: isEdit
        ? "Task updated successfully."
        : "Task created successfully.",
    });

  return (
    <DataForm
      title={isEdit ? "Edit Task" : "Create Task"}
      data={{ id: task?.id ?? 0 }}
      form={form}
      onSubmitAction={onSubmit}
      error={error}
      backPageLink="/tasks"
      breadcrumbItems={[
        {
          label: "Tasks",
          href: "/tasks",
        },
        {
          label: isEdit ? "Edit Task" : "Create Task",
        },
      ]}
    >
      <div className="grid grid-cols-2 gap-3">
        <FormInput
          name="title"
          label="Task Title"
          placeholder="Enter task title"
          required
        />

        <FormSelect
          name="wellId"
          label="Well"
          required
          options={WELL_OPTIONS}
        />

        <FormSelect
          name="assignedTo"
          label="Assign To"
          required
          options={USER_OPTIONS}
        />

        <FormSelect
          name="priority"
          label="Priority"
          required
          options={PRIORITY_OPTIONS}
        />

        <FormSelect
          name="status"
          label="Status"
          required
          options={STATUS_OPTIONS}
        />

        <FormInput
          name="dueDate"
          label="Due Date"
          type="date"
        />

        <FormInput
          name="description"
          label="Description"
          placeholder="Enter task description"
        />
      </div>
    </DataForm>
  );
}