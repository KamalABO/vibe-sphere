import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { checkAuth } from "@/app/api/utils//auth";

export async function GET(req: Request) {
  const decoded = await checkAuth(req);
  if ("error" in decoded) return decoded;

  const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
  return NextResponse.json(user);
}
