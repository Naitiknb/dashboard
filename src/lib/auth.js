import { cookies } from "next/headers";
import { getUsers, authenticateUser as verifyCredentials } from "@/lib/users";
import { getRolesById } from "@/lib/roles";
import { AUTH_COOKIE, MAX_AGE, createSessionToken, readSessionToken } from "@/lib/session";

export const authenticateUser = verifyCredentials;

export async function createAuthSession(userId) {
  (await cookies()).set(AUTH_COOKIE, await createSessionToken(userId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function getCurrentUser() {
  const userId = await readSessionToken((await cookies()).get(AUTH_COOKIE)?.value);
  if (!userId) return null;

  const user = (await getUsers()).find((u) => String(u.id) === userId);
  if (!user) return null;

  const role = user.isStatic
    ? { id: "0", name: user.role }
    : await getRolesById(user.roleId);
  if (!role) return null;

  return { id: user.id, name: user.name, email: user.email, roleId: user.roleId, role };
}

export async function logoutUser() {
  (await cookies()).delete(AUTH_COOKIE);
}