// app/api/utils/auth.ts
import jwt from "jsonwebtoken";

export function generateToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d", // مدة صلاحية التوكن
  });
}

export async function checkAuth(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    return decoded as { userId: string };
  } catch (error) {
    console.error("❌ Invalid token:", error);
    return null;
  }
}
