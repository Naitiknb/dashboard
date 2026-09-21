import { SignJWT, jwtVerify } from "jose";

export const AUTH_COOKIE = "auth_session";

export const MAX_AGE = 60 * 60 * 24 * 7;

const secret = new TextEncoder().encode(
    process.env.SESSION_SECRET
);

export async function createSessionToken(userId) {
    return await new SignJWT({ userId: String(userId) })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);
}

export async function readSessionToken(token) {
    if (!token) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(token, secret);

        return payload.userId ?? null;
    } catch {
        return null;
    }
}