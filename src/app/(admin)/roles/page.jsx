import Roles from "@/themes/components/pages/roles/List";
import { getRoles } from "@/lib/roles";

export default async function Page() {
  const roles = await getRoles();

  return <Roles roles={roles} />;
}