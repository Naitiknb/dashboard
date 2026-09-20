
"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Filter() {
  const [field, setField] = useState("");
  const [well, setWell] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

        {/* Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Field
          </label>

          <Select value={field} onValueChange={setField}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Fields" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="field-a">
                Field A
              </SelectItem>

              <SelectItem value="field-b">
                Field B
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Well */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Well
          </label>

          <Select value={well} onValueChange={setWell}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Wells" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="tango-1">
                Tango-1
              </SelectItem>

              <SelectItem value="tango-2">
                Tango-2
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* From Date */}
        <div className="space-y-2">
          <label
            htmlFor="fromDate"
            className="text-sm font-medium"
          >
            From Date
          </label>

          <input
            id="fromDate"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs outline-none"
          />
        </div>

        {/* To Date */}
        <div className="space-y-2">
          <label
            htmlFor="toDate"
            className="text-sm font-medium"
          >
            To Date
          </label>

          <input
            id="toDate"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs outline-none"
          />
        </div>

      </div>
    </div>
  );
}

