import { isAuthenticatedRequest } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const session = isAuthenticatedRequest(req);

  if (!session) {
    return res.status(401).json({
      authenticated: false,
      message: "Not authenticated.",
    });
  }

  return res.status(200).json({
    authenticated: true,
    user: { username: session.username },
  });
}
