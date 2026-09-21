import { promises as fs } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "wells.json");

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

export async function getWells() {
  return await read();
}

export async function getWellById(id) {
  const wells = await read();

  return (
    wells.find(
      (well) => String(well.id) === String(id)
    ) || null
  );
}

export async function createWell(data) {
  const wells = await read();

  const exists = wells.some(
    (well) =>
      well.wellName.toLowerCase() ===
      data.wellName.toLowerCase()
  );

  if (exists) {
    return {
      error: "A well with this name already exists.",
      status: 409,
    };
  }

  const well = {
    ...data,
    id: String(users.length + 1),
    createdAt: new Date().toISOString(),
  };

  await write([...wells, well]);

  return {
    well,
  };
}

export async function updateWell(id, updates) {
  const wells = await read();

  const target = wells.find(
    (well) => String(well.id) === String(id)
  );

  if (!target) {
    return {
      error: "Well not found.",
      status: 404,
    };
  }

  if (
    updates.wellName &&
    wells.some(
      (well) =>
        well.wellName.toLowerCase() ===
          updates.wellName.toLowerCase() &&
        well.id !== target.id
    )
  ) {
    return {
      error: "A well with this name already exists.",
      status: 409,
    };
  }

  const merged = {
    ...target,
    ...updates,
  };

  await write(
    wells.map((well) =>
      well.id === target.id ? merged : well
    )
  );

  return {
    well: merged,
  };
}

export async function deleteWell(id) {
  const wells = await read();

  const target = wells.find(
    (well) => String(well.id) === String(id)
  );

  if (!target) {
    return {
      error: "Well not found.",
      status: 404,
    };
  }

  await write(
    wells.filter(
      (well) => well.id !== target.id
    )
  );

  return {
    ok: true,
  };
}