"use client";

import { useSyncExternalStore } from "react";
import { Button } from "../../../components/ui/button";
import { PanelLeft, PanelRight } from "lucide-react";

const formatDate = () =>
  new Date().toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

function subscribe(callback) {
  const id = setInterval(callback, 60_000);
  return () => clearInterval(id);
}

export default function Header({ isSidebarOpen, setIsSidebarOpen }) {
  const now = useSyncExternalStore(subscribe, formatDate, () => "");

  return (
    <header
      className="sticky top-0 z-10 h-12 w-full border-b border-gray-200 bg-white"
    >
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle sidebar"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="h-9 w-9 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            {isSidebarOpen ? (
              <PanelLeft className="h-5 w-5" />
            ) : (
              <PanelRight className="h-5 w-5" />
            )}
          </Button>
          <div className="h-6 w-px bg-gray-200" />
          <h5 className="text-sm font-semibold tracking-tight text-muted-foreground">
            Well Production Monitor
          </h5>
        </div>

        <div className="text-right">
          <p className="text-[11px] font-bold uppercase tracking-wide text-gray-900">
            Last Updated
          </p>
          <p className="text-xs font-medium text-gray-700">{now || "\u00A0"}</p>
        </div>
      </div>
    </header>
  );
}