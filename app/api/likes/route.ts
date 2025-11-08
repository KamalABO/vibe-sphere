import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// =============================
// 📌 GET: Get all likes
// =============================
export async function GET() {
  try {
    const likes = await prisma.like.findMany({
      include: {
        user: { select: { id: true, name: true } },
        post: { select: { id: true, content: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(likes);
  } catch (error) {
    console.error("❌ Failed to fetch likes:", error);
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}

// =============================
// 📌 POST: Add like
// =============================
export async function POST(req: Request) {
  try {
    const { userId, postId } = await req.json();

    if (!userId || !postId)
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

    // ✅ Prevent duplicate likes
    const existing = await prisma.like.findUnique({ where: { userId_postId: { userId, postId } } });
    if (existing)
      return NextResponse.json({ error: "Already liked" }, { status: 400 });

    const newLike = await prisma.like.create({ data: { userId, postId } });

    return NextResponse.json({ message: "Liked successfully", like: newLike }, { status: 201 });
  } catch (error) {
    console.error("❌ Failed to add like:", error);
    return NextResponse.json({ error: "Failed to add like" }, { status: 500 });
  }
}

// =============================
// 📌 DELETE: Remove like
// =============================
export async function DELETE(req: Request) {
  try {
    const { userId, postId } = await req.json();

    if (!userId || !postId)
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

    await prisma.like.delete({ where: { userId_postId: { userId, postId } } });

    return NextResponse.json({ message: "Like removed" });
  } catch (error) {
    console.error("❌ Failed to remove like:", error);
    return NextResponse.json({ error: "Failed to remove like" }, { status: 500 });
  }
}
