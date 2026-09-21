import { promises as fs } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "roles.json");

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

export async function getRoles() {
    return await read();
}

export async function getRolesById(id) {
    const roles = await read();

    return (
        roles.find(
            (role) => String(role.id) === String(id)
        ) || null
    );
}

export async function createRole(data) {    
    const roles = await read();

    const name = data.name?.trim();

    if (!name) {
        return {
            error: "Role name is required.",
            status: 400,
        };
    }

    const exists = roles.some(
        (role) => role.name?.trim().toLowerCase() === name.toLowerCase()
    );

    if (exists) {
        return {
            error: "A Role with this name already exists.",
            status: 409,
        };
    }

    const nextId =
        roles.length > 0
            ? Math.max(...roles.map((role) => Number(role.id))) + 1
            : 1;

    const role = {
        ...data,
        name,
        id: String(nextId),
        createdAt: new Date().toISOString(),
    };

    await write([...roles, role]);

    return {
        role,
    };
}

export async function updateRole(id, updates) {
    const roles = await read();

    const target = roles.find(
        (role) => String(role.id) === String(id)
    );

    if (!target) {
        return {
            error: "Role not found.",
            status: 404,
        };
    }

    if (
        updates.title &&
        roles.some(
            (role) =>
                role.title?.toLowerCase() ===
                updates.title.toLowerCase() &&
                role.id !== target.id
        )
    ) {
        return {
            error: "A Role with this title already exists.",
            status: 409,
        };
    }

    const merged = {
        ...target,
        ...updates,
    };

    await write(
        roles.map((role) =>
            role.id === target.id ? merged : role
        )
    );

    return {
        role: merged,
    };
}

export async function deleteRole(id) {
    const roles = await read();

    const target = roles.find(
        (role) => String(role.id) === String(id)
    );

    if (!target) {
        return {
            error: "Role not found.",
            status: 404,
        };
    }

    await write(
        roles.filter(
            (role) => role.id !== target.id
        )
    );

    return {
        ok: true,
    };
}  