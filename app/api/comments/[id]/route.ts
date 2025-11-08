import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { checkAuth } from "@/app/api/utils/auth";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const decoded = await checkAuth(req);
  if ("error" in decoded) return decoded;

  try {
    const comment = await prisma.comment.findUnique({ where: { id: params.id } });
    if (!comment) return NextResponse.json({ error: "Comment not found" }, { status: 404 });

    // فقط صاحب التعليق يمكنه الحذف
    if (comment.authorId !== decoded.userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    await prisma.comment.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Comment deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
