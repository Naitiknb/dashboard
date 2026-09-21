import { promises as fs } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "users.json");

const SUPER_USER = {
  id: "su1",
  name: "su1",
  email: "su1@gmail.com",
  password: "1234",
  role: "admin",
  description: "Default super user",
  isStatic: true,
};

async function read() {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return [SUPER_USER]; // file missing on first run
  }
}

async function write(data) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(data, null, 2));
}

const safe = ({ password, ...rest }) => rest; 

export async function getUsers() {
  return (await read()).map(safe);
}

export async function getUserById(id) {
  const user = (await read()).find((u) => String(u.id) === String(id));
  return user ? safe(user) : null;
}

export async function createUser(data) {
  const users = await read();
  if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
    return { error: "A user with this email already exists." };
  }
  const user = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  await write([...users, user]);
  return { user: safe(user) };
}

export async function updateUser(id, updates) {
  const users = await read();
  const target = users.find((u) => String(u.id) === String(id));
  if (!target) return { error: "Not found", status: 404 };
  if (target.isStatic) return { error: "The default user can't be edited.", status: 403 };
  if (
    updates.email &&
    users.some((u) => u.email.toLowerCase() === updates.email.toLowerCase() && u.id !== target.id)
  ) {
    return { error: "A user with this email already exists.", status: 409 };
  }
  const merged = { ...target, ...updates };
  await write(users.map((u) => (u.id === target.id ? merged : u)));
  return { user: safe(merged) };
}

export async function deleteUser(id) {
  const users = await read();
  const target = users.find((u) => String(u.id) === String(id));
  if (!target) return { error: "Not found", status: 404 };
  if (target.isStatic) return { error: "The default user can't be deleted.", status: 403 };
  await write(users.filter((u) => u.id !== target.id));
  return { ok: true };
}


export async function authenticateUser(email, password) {
  const users = await read();

  const user = users.find(
    (u) =>
      u.email?.trim().toLowerCase() === email?.trim().toLowerCase() &&
      String(u.password) === String(password)
  );

  return user ? safe(user) : null;
}