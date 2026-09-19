"use client";

import { useForm } from "react-hook-form";

import DataForm from "@/themes/components/dataForm";
import FormInput from "@/themes/components/dataForm/FormInput";
import FormTextArea from "@/themes/components/dataForm/FormTextArea";

export default function CreateUser() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      description: "",
    },
  });

  async function handleSubmit(data) {
    console.log(data);
  }

  return (
    <DataForm
      title="Create User"
      data={{ id: 0 }}
      requiredFields={["name", "email"]}
      form={form}
      onSubmitAction={handleSubmit}
      error={null}
    >
      <div className="grid grid-cols-2 gap-4">
        <FormInput name="name" label="Name" placeholder="Enter name" required />

        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="Enter email"
          required
        />

        <FormTextArea
          name="description"
          label="Description"
          placeholder="Enter description"
          className="col-span-2"
        />
      </div>
    </DataForm>
  );
}