import { notFound } from "next/navigation";

import TaskForm from "@/themes/components/pages/tasks/Form";
import { getTasksById } from "@/lib/tasks";

export const dynamic = "force-dynamic";

export default async function Page({ params }) {
    const { id } = await params;

    const task = await getTasksById(id);

    if (!task) {
        notFound();
    }

    return <TaskForm key={task.id} task={task} />;
}