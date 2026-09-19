"use client";

import { FormProvider } from "react-hook-form";

export default function DataForm({
  title,
  data,
  form,
  onSubmitAction,
  error,
  children,
}) {
  return (
    <FormProvider {...form} >
      <form onSubmit={form.handleSubmit(onSubmitAction)} className="space-y-6 p-5">
        {title && <h1 className="text-xl font-semibold">{title}</h1>}
        {error && <p className="text-sm text-red-600">{String(error)}</p>}

        {children}

        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          {data?.id ? "Update" : "Create"}
        </button>
      </form>
    </FormProvider>
  );
}