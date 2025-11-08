import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { checkAuth } from "@/app/api/utils/auth";

export async function GET(req: Request) {
  const decoded = await checkAuth(req);
  if ("error" in decoded) return decoded;

  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, avatarUrl: true, bio: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
