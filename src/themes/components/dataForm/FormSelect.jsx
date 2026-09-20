"use client";

import { Controller, useFormContext } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "../../../components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

export default function FormSelect({
  control: controlProp, // optional, falls back to the DataForm context
  name,
  label,
  placeholder = "Select...",
  options = [],
  required = false,
  readonly = false,
  autoFocus = false,
  className = "",
}) {
  const formContext = useFormContext();
  const control = controlProp ?? formContext?.control;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `${label || name} is required` : false,
      }}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className={`gap-1 ${className || ""}`}
        >
          {label && (
            <FieldLabel
              htmlFor={field.name}
              className="text-[11px] leading-none"
            >
              {label}
              {required && <span className="text-red-500"> *</span>}
            </FieldLabel>
          )}

          <Select
            disabled={readonly}
            value={
              field.value !== undefined && field.value !== null
                ? String(field.value)
                : ""
            }
            onValueChange={(value) => {
              if (!value) {
                field.onChange(null);
              } else if (value.trim() !== "" && !isNaN(Number(value))) {
                field.onChange(Number(value));
              } else {
                field.onChange(value);
              }
            }}
          >
            <SelectTrigger
              id={field.name}
              ref={field.ref}
              onBlur={field.onBlur}
              autoFocus={autoFocus}
              aria-invalid={fieldState.invalid}
              className="h-7 w-full truncate rounded-sm px-2 py-0 text-xs data-[size=default]:h-7 data-[placeholder]:text-xs"
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={String(opt.value)}
                  className="text-xs"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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