"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePosts } from "@/context/PostsContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function CreatePostPage() {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { fetchPosts } = usePosts();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() && !file) {
      toast.error("الرجاء كتابة نص أو رفع ملف");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ لو في ملف، نرفعه لـ Cloudinary
      let imageUrl = null;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          { method: "POST", body: formData }
        );
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.secure_url;
      }

const token = localStorage.getItem("token"); // أو من useAuth()

const res = await fetch("/api/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    content,
    imagePath: imageUrl,
  }),
});


      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل إنشاء المنشور");

      toast.success("✅ تم إنشاء المنشور بنجاح!");
      setContent("");
      setFile(null);
      await fetchPosts();
      router.push("/feed");
    } catch (error: any) {
      console.error(error);
      toast.error("حدث خطأ أثناء رفع المنشور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-xl mx-auto mt-10 p-6 rounded-2xl shadow-md bg-white dark:bg-neutral-900"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">✏️ إنشاء منشور جديد</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          placeholder="اكتب ما يدور في بالك..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border rounded-lg p-3 min-h-[120px] text-sm resize-none dark:bg-neutral-800 dark:border-neutral-700"
        />

        <Input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
        />

        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          {loading ? "جاري النشر..." : "نشر"}
        </Button>
      </form>
    </motion.div>
  );
}
