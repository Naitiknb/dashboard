"use client";

import { Controller, useFormContext } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";

export default function FormInput({
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
  required = false,
  className = "",
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className={`gap-1 ${className || ""}`}
        >
          <FieldLabel htmlFor={field.name} className="text-[11px] leading-none">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </FieldLabel>

          <Input
            {...field}
            id={field.name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={fieldState.invalid}
            className="h-7 rounded-sm px-2 py-0 text-xs md:text-xs placeholder:text-xs"
          />

          {fieldState.invalid && (
            <FieldError
              errors={[fieldState.error]}
              className="text-[11px] leading-tight"
            />
          )}
        </Field>
      )}
    />
  );
}