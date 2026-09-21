import Tasks from "@/themes/components/pages/tasks/List";
import { getTasks } from "@/lib/tasks";

export const dynamic = "force-dynamic";

export default async function Page() {
  const tasks = await getTasks();

  return <Tasks tasks={tasks} />;
}