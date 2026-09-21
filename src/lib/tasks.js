import { promises as fs } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "tasks.json");

async function read() {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

async function write(data) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });

  await fs.writeFile(
    FILE,
    JSON.stringify(data, null, 2)
  );
}

export async function getTasks() {
  return await read();
}

export async function getTasksById(id) {
  const tasks = await read();

  return (
    tasks.find(
      (task) => String(task.id) === String(id)
    ) || null
  );
}

export async function createtask(data) {
  const tasks = await read();

  const exists = tasks.some(
    (task) =>
      task.title?.toLowerCase() ===
      data.title?.toLowerCase()
  );

  if (exists) {
    return {
      error: "A task with this title already exists.",
      status: 409,
    };
  }

  const nextId =
    tasks.length > 0
      ? Math.max(...tasks.map((task) => Number(task.id))) + 1
      : 1;

  const task = {
    ...data,
    id: String(nextId),
    createdAt: new Date().toISOString(),
  };

  await write([...tasks, task]);

  return {
    task,
  };
}

export async function updatetask(id, updates) {
  const tasks = await read();

  const target = tasks.find(
    (task) => String(task.id) === String(id)
  );

  if (!target) {
    return {
      error: "Task not found.",
      status: 404,
    };
  }

  if (
    updates.title &&
    tasks.some(
      (task) =>
        task.title?.toLowerCase() ===
        updates.title.toLowerCase() &&
        task.id !== target.id
    )
  ) {
    return {
      error: "A task with this title already exists.",
      status: 409,
    };
  }

  const merged = {
    ...target,
    ...updates,
  };

  await write(
    tasks.map((task) =>
      task.id === target.id ? merged : task
    )
  );

  return {
    task: merged,
  };
}

export async function deletetask(id) {
  const tasks = await read();

  const target = tasks.find(
    (task) => String(task.id) === String(id)
  );

  if (!target) {
    return {
      error: "Task not found.",
      status: 404,
    };
  }

  await write(
    tasks.filter(
      (task) => task.id !== target.id
    )
  );

  return {
    ok: true,
  };
}