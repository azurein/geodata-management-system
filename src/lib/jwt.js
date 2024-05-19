import { jwtVerify, SignJWT } from "jose";

const DEFAULT_SIGN_OPTION = {
    expiresIn: "1h",
};

async function generateAccessToken(payload, options = DEFAULT_SIGN_OPTION) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    if (!secret) {
        throw new Error('Secret key is missing in environment variables');
    }

    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' }) // Adjust algorithm if needed
        .setIssuedAt() // Optional: Set issued at time (iat)
        .setExpirationTime('1h') // Optional: Set expiration time (exp)
        .sign(secret);

    return token;
}

async function verifyAccessToken(token) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        if (!secret) {
            throw new Error('Secret key is missing in environment variables');
        }
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (e) {
        console.error("JWT Verification Error:", e);
        return null;
    }
}

module.exports = { generateAccessToken, verifyAccessToken };
