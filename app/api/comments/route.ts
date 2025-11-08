import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// =============================
// 📌 GET: Get all comments or by postId
// =============================
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const postId = url.searchParams.get("postId");

    const comments = await prisma.comment.findMany({
      where: postId ? { postId } : {},
      include: {
        author: { select: { id: true, name: true, avatarUrl: true } },
        post: { select: { id: true, content: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("❌ Failed to fetch comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

// =============================
// 📌 POST: Create comment
// =============================
export async function POST(req: Request) {
  try {
    const { content, authorId, postId } = await req.json();

    if (!content || !authorId || !postId)
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

    const newComment = await prisma.comment.create({
      data: { content, authorId, postId },
      include: { author: { select: { id: true, name: true, avatarUrl: true } } },
    });

    return NextResponse.json({ message: "Comment created", comment: newComment }, { status: 201 });
  } catch (error) {
    console.error("❌ Failed to create comment:", error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}
