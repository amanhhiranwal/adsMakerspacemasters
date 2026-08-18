import {
  getAdminCredentials,
  createSessionToken,
  getSessionCookieHeader,
} from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both username and password.",
      });
    }

    const { username: validUsername, password: validPassword } = getAdminCredentials();

    // Constant-time-like comparison
    const isUserValid = username.trim().toLowerCase() === validUsername.trim().toLowerCase();
    const isPassValid = password === validPassword;

    if (!isUserValid || !isPassValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials. Please try again.",
      });
    }

    const token = createSessionToken(username);
    const cookieHeader = getSessionCookieHeader(token);

    res.setHeader("Set-Cookie", cookieHeader);

    return res.status(200).json({
      success: true,
      message: "Authentication successful.",
      token,
      user: { username: validUsername },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal authentication error.",
    });
  }
}
