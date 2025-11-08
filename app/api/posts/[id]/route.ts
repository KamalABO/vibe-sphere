import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { checkAuth } from "@/app/api/utils/auth";
import { validateContent } from "@/app/api/utils/validate";
import { uploadFile } from "@/app/api/utils/cloudinary";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: {
        author: { select: { id: true, name: true, avatarUrl: true } },
        comments: true,
        likes: true,
      },
    });
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const decoded = await checkAuth(req);
  if ("error" in decoded) return decoded;

  try {
    const { content, imagePath } = await req.json();
    if (!validateContent(content))
      return NextResponse.json({ error: "Content required" }, { status: 400 });

    let imageUrl: string | undefined;
    if (imagePath) {
      imageUrl = await uploadFile(imagePath, "posts");
    }

    const updated = await prisma.post.update({
      where: { id: params.id },
      data: { content, imageUrl },
    });

    return NextResponse.json({ message: "Post updated", post: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const decoded = await checkAuth(req);
  if ("error" in decoded) return decoded;

  try {
    await prisma.post.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
