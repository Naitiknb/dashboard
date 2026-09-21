import { notFound } from "next/navigation";

import WellsForm from "@/themes/components/pages/wells/Form";
import { getWellById } from "@/lib/wells";

export const dynamic = "force-dynamic";

export default async function Page({ params }) {
    const { id } = await params;

    const well = await getWellById(id);

    if (!well) {
        notFound();
    }

    return <WellsForm key={well.id} well={well} />;
}