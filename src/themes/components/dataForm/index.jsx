"use client";

import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { Save, Undo2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DataForm({
  title,
  data,
  requiredFields = [],
  form,
  onSubmitAction,
  error = null,
  children,
  backPageLink,
  showSaveButton = true,
  showBackPageLink = true,
  extraButton,
  className = "",
}) {
  const router = useRouter();

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = form;

  // disable the button until all required fields have a value
  const values = watch();
  const missingRequired = requiredFields.some((f) => !values?.[f]);
  const isDisabled = isSubmitting || missingRequired;

  function handleBack() {
    if (backPageLink) {
      router.replace(backPageLink);
    } else if (window.history.length > 1) {
      router.back();
    } else {
      router.replace("/");
    }
  }

  return (
    <FormProvider {...form} className="bg-white p-3">
      <div className="flex items-center justify-between border-b bg-gray-50 p-3 rounded">
        <h1 className="text-xl font-semibold">{title}</h1>

        <div className="flex items-center gap-2">
          {showSaveButton && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              // disabled={isDisabled}
              onClick={handleSubmit(onSubmitAction)}
              className="bg-primary text-white hover:bg-blue-900 hover:text-white"
            >
              <Save className="h-4 w-4 text-white " />
              {isSubmitting ? "Submitting..." : data?.id ? "Update" : "Create"}
            </Button>
          )}

          {showBackPageLink && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleBack}
            >
              <Undo2 className="h-4 w-4" />
              Back
            </Button>
          )}

          {extraButton}
        </div>
      </div>

      {/* Form body */}

      <form onSubmit={handleSubmit(onSubmitAction)} className="p-4">
        {children}

        {error && (
          <div className="mt-6 flex items-center gap-2 rounded border border-red-300 bg-red-50 p-3 text-sm font-bold text-red-700">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
      </form>

    </FormProvider>
  );
}