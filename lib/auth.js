import crypto from "crypto";

const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "makerspace@admin2026";
const COOKIE_NAME = "msm_admin_session";

// Secret for signing session tokens
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.ADMIN_PASSWORD ||
  "makerspace_secure_admin_jwt_secret_key_2026";

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || DEFAULT_USERNAME,
    password: process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD,
  };
}

export function createSessionToken(username) {
  const timestamp = Date.now();
  const payload = `${username}:${timestamp}`;
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("hex");

  return Buffer.from(`${payload}:${signature}`).toString("base64url");
}

export function verifySessionToken(token) {
  if (!token) return null;

  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [username, timestampStr, signature] = decoded.split(":");

    if (!username || !timestampStr || !signature) return null;

    const payload = `${username}:${timestampStr}`;
    const expectedSignature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(payload)
      .digest("hex");

    if (signature !== expectedSignature) return null;

    const timestamp = parseInt(timestampStr, 10);
    // Token expires after 7 days (604800000 ms)
    const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > MAX_AGE_MS) return null;

    return { username, timestamp };
  } catch (error) {
    return null;
  }
}

export function parseCookies(cookieHeader) {
  const list = {};
  if (!cookieHeader) return list;

  cookieHeader.split(";").forEach((cookie) => {
    let [name, ...rest] = cookie.split("=");
    name = name?.trim();
    if (!name) return;
    const value = rest.join("=").trim();
    list[name] = decodeURIComponent(value);
  });

  return list;
}

export function isAuthenticatedRequest(req) {
  // Check Authorization Bearer Header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    const session = verifySessionToken(token);
    if (session) return session;
  }

  // Check Cookie
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies[COOKIE_NAME];
  if (token) {
    const session = verifySessionToken(token);
    if (session) return session;
  }

  return null;
}

export function getSessionCookieHeader(token, isLogout = false) {
  const maxAge = isLogout ? 0 : 7 * 24 * 60 * 60; // 7 days in seconds
  const isProd = process.env.NODE_ENV === "production";
  
  return `${COOKIE_NAME}=${isLogout ? "" : token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${
    isProd ? "; Secure" : ""
  }`;
}
