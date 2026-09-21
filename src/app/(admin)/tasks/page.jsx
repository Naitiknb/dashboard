import Tasks from "@/themes/components/pages/tasks/List";

import { getTasks } from "@/lib/tasks";
import { getUsers } from "@/lib/db";
import { getWells } from "@/lib/wells";

export const dynamic = "force-dynamic";

export default async function Page() {
  const tasks = await getTasks();

  const users = await getUsers();
  const wells = await getWells();

  const userMap = Object.fromEntries(
    users.map((user) => [user.id, user.name])
  );

  const wellMap = Object.fromEntries(
    wells.map((well) => [well.id, well.wellName])
  );

  const tableData = tasks.map((task) => ({
    ...task,

    assignedToName:
      userMap[task.assignedTo] ?? task.assignedTo,

    wellName:
      wellMap[task.wellId] ?? task.wellId,
  }));

  return <Tasks tasks={tableData} />;
}