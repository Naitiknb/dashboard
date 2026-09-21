import { notFound } from "next/navigation";

import RoleForm from "@/themes/components/pages/roles/Form";
import { getRolesById } from "@/lib/roles";

export const dynamic = "force-dynamic";

export default async function Page({ params }) {
    const { id } = await params;

    const role = await getRolesById(id);

    if (!role) {
        notFound();
    }

    return <RoleForm role={role} />;
}