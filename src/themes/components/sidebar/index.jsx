"use client";

import {
    LayoutDashboard,
    Waves,
    ClipboardList,
    Users,
    Zap,
    UserKey,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useRBAC } from "@/context/RBACContext";

const items = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", permission: "dashboard.view" },
    { key: "well", label: "Wells", icon: Waves, href: "/wells", permission: "wells.view" },
    { key: "task", label: "Tasks", icon: ClipboardList, href: "/tasks", permission: "tasks.view" },
    { key: "users", label: "Users", icon: Users, href: "/users", permission: "users.view" },
    { key: "roles", label: "Roles", icon: UserKey, href: "/roles", permission: "roles.view" },
];

export default function Sidebar({ isOpen }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, hasPermission } = useRBAC();

    const visibleItems = items.filter((item) => hasPermission(item.permission));

    const userName = user?.name ?? "";
    const roleName = user?.role?.name ?? "";
    const initial = userName.charAt(0).toUpperCase() || "?";

    async function handleLogout() {
        try {
            const response = await fetch("/api/auth/signout", {
                method: "POST",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Logout failed.");
            }

            toast.success("Logged out successfully.");

            router.push("/signin");
            router.refresh();
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Unable to logout. Please try again.");
        }
    }

    return (
        <aside
            className={`relative shrink-0 min-h-screen overflow-hidden border-r border-gray-200 bg-[#0E1E36] text-white transition-[width] duration-300 ease-in-out ${isOpen ? "w-60" : "w-16"}`}
        >
            {/* Header */}
            <div
                className={`flex h-14 items-center border-b border-gray-700 ${isOpen ? "px-4" : "justify-center px-0"}`}
            >
                <h1 className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold">
                    <Zap className="rounded-full bg-blue-700 p-1" />
                    {isOpen && "Dashboard"}
                </h1>
            </div>

            {/* Navigation */}
            <nav className="space-y-1 p-2">
                {visibleItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Button
                            key={item.key}
                            variant="ghost"
                            asChild
                            className={`h-9 w-full gap-2 text-sm font-medium ${
                                isOpen ? "justify-start px-3" : "justify-center px-0"
                            } ${
                                isActive
                                    ? "bg-primary text-white hover:bg-primary hover:text-white"
                                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            <Link
                                href={item.href}
                                title={item.label}
                                className={`flex w-full items-center gap-2 whitespace-nowrap text-inherit no-underline ${
                                    isOpen ? "" : "justify-center"
                                }`}
                            >
                                <Icon className="h-4 w-4 shrink-0" />
                                {isOpen && item.label}
                            </Link>
                        </Button>
                    );
                })}
            </nav>

            {/* User */}
            <div className="absolute bottom-0 left-0 w-full border-t border-gray-700 bg-blue-950">
                <div
                    className={`flex items-center gap-2 py-2 ${isOpen ? "px-3" : "justify-center px-0"}`}
                >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-medium text-white">
                        {initial}
                    </span>

                    {isOpen && (
                        <div className="leading-tight whitespace-nowrap">
                            <p className="text-sm font-medium text-white">{userName}</p>
                            <p className="text-xs text-gray-400">{roleName}</p>
                        </div>
                    )}
                </div>

                <Button
                    variant="default"
                    size="sm"
                    className="m-2 w-55"
                    onClick={handleLogout}
                >
                    Sign out
                </Button>
            </div>
        </aside>
    );
}