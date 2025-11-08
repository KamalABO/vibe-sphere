import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { checkAuth } from "@/app/api/utils/auth";
import { validateContent } from "@/app/api/utils/validate";

// ----------------------------
// GET: كل التعليقات على منشور محدد
// ----------------------------
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: params.id },
      include: { author: { select: { id: true, name: true, avatarUrl: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(comments);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

// ----------------------------
// POST: إضافة تعليق جديد
// ----------------------------
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const decoded = await checkAuth(req);
  if ("error" in decoded) return decoded;

  try {
    const { content } = await req.json();
    if (!validateContent(content))
      return NextResponse.json({ error: "Content required" }, { status: 400 });

    const comment = await prisma.comment.create({
      data: { content, authorId: decoded.userId, postId: params.id },
      include: { author: { select: { id: true, name: true, avatarUrl: true } } },
    });

    return NextResponse.json({ message: "Comment added", comment }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}
