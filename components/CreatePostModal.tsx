"use client";

import { useState } from "react";

type Props = {
  onPostCreated?: () => void; // نقدر نعمل refresh للـ feed بعد إنشاء منشور
};

export default function CreatePostModal({ onPostCreated }: Props) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!content && !file) return;

    setLoading(true);

    try {
      let imageUrl: string | undefined;

      // رفع الصورة أو الفيديو للـ Cloudinary
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "vibe_sphere"); // preset من Cloudinary

        const res = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        imageUrl = data.secure_url;
      }

      // إنشاء المنشور في backend
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          authorId: "USER_ID_HERE", // استبدل بالـ auth context
          imageUrl,
        }),
      });

      if (!res.ok) throw new Error("Failed to create post");

      setContent("");
      setFile(null);
      if (onPostCreated) onPostCreated();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-md space-y-2">
      <textarea
        className="w-full p-2 rounded-md bg-gray-700 text-white"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
}
