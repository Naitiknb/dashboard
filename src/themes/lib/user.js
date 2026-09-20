import { getAll, create } from "./db";

export const USERS_KEY = "users";

export const SUPER_USER = {
    name: "su1",
    email: "su1@gmail.com",
    password: "1234",
    role: "admin",
    description: "Default super user",
    isStatic: true,
};

export function seedUsers() {
    const exists = getAll(USERS_KEY).some(
        (u) => u.email.toLowerCase() === SUPER_USER.email.toLowerCase()
    );
    if (!exists) create(USERS_KEY, SUPER_USER);

}

export function emailExists(email, ignoreId) {
    return getAll(USERS_KEY).some(
        (u) =>
            u.email.toLowerCase() === email.toLowerCase() &&
            String(u.id) !== String(ignoreId)
    );
}