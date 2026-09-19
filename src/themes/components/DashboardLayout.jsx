"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="">{children}</main>
      </div>
    </div>
  );
}