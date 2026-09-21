"use client";

import { useState } from "react";

import Sidebar from "./sidebar";
import Header from "./header";
import { Toaster } from "sonner";
import { RBACProvider } from "@/context/RBACContext";

export default function DashboardShell({ children, user }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <RBACProvider user={user}>
            <div className="flex h-screen overflow-hidden bg-background text-foreground">
                <Sidebar
                    isOpen={isSidebarOpen}
                    user={user}
                />

                <div className="flex min-w-0 min-h-0 flex-1 flex-col overflow-hidden">
                    <Header
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />

                    <main className="min-h-0 flex-1 overflow-y-auto">
                        {children}
                    </main>

                    <Toaster
                        position="top-right"
                        richColors
                        closeButton
                    />
                </div>
            </div>
        </RBACProvider>
    );
}