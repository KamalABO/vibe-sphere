"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function AddPostModal({ onPostCreated }: { onPostCreated: () => void }) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!content) return toast.error("Post content is required");
    setLoading(true);

    try {
      let imageUrl = "";

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed");

        imageUrl = uploadData.url;
      }

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, imageUrl, authorId: "USER_ID_HERE" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create post");

      toast.success("Post created!");
      setContent("");
      setFile(null);
      onPostCreated();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-lg">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 rounded-md bg-gray-700 text-white mb-2"
      />
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full text-white mb-2"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
}
