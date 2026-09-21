import UserList from "@/themes/components/pages/users/List";
import { getUsers } from "@/lib/users";

export const dynamic = "force-dynamic"; 

export default async function Page() {
  return <UserList users={await getUsers()} />;
}