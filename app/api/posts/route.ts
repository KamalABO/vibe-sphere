import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { checkAuth } from "@/app/api/utils/auth";
import { validateContent } from "@/app/api/utils/validate";
import { uploadFile } from "@/app/api/utils/cloudinary";

// ----------------------------
// GET: كل المنشورات
// ----------------------------
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: { select: { id: true, name: true, avatarUrl: true } },
        comments: true,
        likes: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// ----------------------------
// POST: إنشاء منشور جديد
// ----------------------------
export async function POST(req: Request) {
  const decoded = await checkAuth(req);
  if ("error" in decoded) return decoded;

  try {
    const { content, imagePath } = await req.json();

    if (!validateContent(content))
      return NextResponse.json({ error: "Content is required" }, { status: 400 });

    let imageUrl: string | undefined;
    if (imagePath) {
      imageUrl = await uploadFile(imagePath, "posts");
    }

    const post = await prisma.post.create({
      data: {
        content,
        imageUrl,
        authorId: decoded.userId, // ✅ userId جاية من التوكن
      },
      include: { author: { select: { id: true, name: true, avatarUrl: true } } },
    });

    return NextResponse.json({ message: "Post created", post }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
