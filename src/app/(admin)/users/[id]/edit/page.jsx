import { notFound, redirect } from "next/navigation";
import UserForm from "@/themes/components/pages/users/Form";
import { getUserById } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Page({ params }) {
  const { id } = await params;

  const user = await getUserById(id);
  if (!user) notFound();
  if (user.isStatic) redirect("/users"); 

  return <UserForm key={user.id} user={user} />;
}