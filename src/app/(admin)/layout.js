import DashboardShell from "@/themes/components/DashboardLayout";
import { getCurrentUser } from "@/lib/auth";

export default async function AdminLayout({ children }) {
    const user = await getCurrentUser();

    return (
        <DashboardShell user={user}>
            {children}
        </DashboardShell>
    );
}