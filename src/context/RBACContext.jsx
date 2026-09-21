"use client";

import { createContext, useContext, useMemo } from "react";

const RBACContext = createContext(null);

export function RBACProvider({ children, user }) {
    const value = useMemo(() => {
        const permissions = user?.role?.permissions ?? [];
        const isAdmin = user?.role?.name?.toLowerCase() === "admin";

        const hasPermission = (permission) =>
            isAdmin || permissions.includes(permission);

        const hasAnyPermission = (required) =>
            isAdmin || required.some((p) => permissions.includes(p));

        const hasAllPermissions = (required) =>
            isAdmin || required.every((p) => permissions.includes(p));

        return {
            user,
            role: user?.role ?? null,
            permissions,
            isAdmin,
            hasPermission,
            hasAnyPermission,
            hasAllPermissions,
        };
    }, [user]);

    return (
        <RBACContext.Provider value={value}>
            {children}
        </RBACContext.Provider>
    );
}

export function useRBAC() {
    const context = useContext(RBACContext);

    if (!context) {
        throw new Error("useRBAC must be used inside RBACProvider");
    }

    return context;
}