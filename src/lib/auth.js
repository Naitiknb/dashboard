import { cookies } from "next/headers";

import { getUsers, authenticateUser as verifyCredentials } from "@/lib/users";
import { getRolesById } from "@/lib/roles";

const AUTH_COOKIE = "auth_user_id";

export async function authenticateUser(email, password) {
    return await verifyCredentials(email, password);
}

export async function createAuthSession(userId) {
    const cookieStore = await cookies();

    cookieStore.set(AUTH_COOKIE, String(userId), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });
}

export async function getCurrentUser() {
    const cookieStore = await cookies();

    const userId = cookieStore.get(AUTH_COOKIE)?.value;

    if (!userId) return null;

    const users = await getUsers();
    const user = users.find((item) => String(item.id) === String(userId));

    if (!user) return null;

    const role = await getRolesById(user.roleId);

    if (!role) return null;

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        role,
    };
}

export async function logoutUser() {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE);
}