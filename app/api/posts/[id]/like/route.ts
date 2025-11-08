import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { checkAuth } from "@/app/api/utils/auth";

// ----------------------------
// GET: كل اللايكات على منشور
// ----------------------------
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const likes = await prisma.like.findMany({
      where: { postId: params.id },
      include: { user: { select: { id: true, name: true, avatarUrl: true } } },
    });
    return NextResponse.json(likes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}

// ----------------------------
// POST: إضافة لايك
// ----------------------------
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const decoded = await checkAuth(req);
  if ("error" in decoded) return decoded;

  try {
    const existing = await prisma.like.findUnique({
      where: { userId_postId: { userId: decoded.userId, postId: params.id } },
    });
    if (existing) return NextResponse.json({ error: "Already liked" }, { status: 400 });

    const like = await prisma.like.create({
      data: { userId: decoded.userId, postId: params.id },
    });
    return NextResponse.json({ message: "Liked successfully", like }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add like" }, { status: 500 });
  }
}

// ----------------------------
// DELETE: إزالة لايك
// ----------------------------
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const decoded = await checkAuth(req);
  if ("error" in decoded) return decoded;

  try {
    await prisma.like.delete({
      where: { userId_postId: { userId: decoded.userId, postId: params.id } },
    });
    return NextResponse.json({ message: "Like removed" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to remove like" }, { status: 500 });
  }
}
