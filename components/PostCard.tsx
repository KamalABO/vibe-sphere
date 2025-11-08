"use client";

import { useState } from "react";
import { usePosts } from "@/context/PostsContext";

type Post = {
  id: string;
  content: string;
  imageUrl?: string;
  author: { id: string; name: string; avatarUrl?: string };
  createdAt: string;
};

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const { posts, setPosts } = usePosts();
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLike() {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/posts/[id]/like", {
        method: liked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: post.id, userId: "USER_ID_HERE" }),
      });

      if (!res.ok) throw new Error("Failed to toggle like");

      setLiked(!liked);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-800 rounded-2xl shadow-md p-4 mb-4 text-white">
      <div className="flex items-center mb-2">
        {post.author.avatarUrl && (
          <img src={post.author.avatarUrl} alt={post.author.name} className="w-10 h-10 rounded-full mr-2" />
        )}
        <span className="font-semibold">{post.author.name}</span>
        <span className="ml-auto text-sm text-gray-400">{new Date(post.createdAt).toLocaleString()}</span>
      </div>

      <p className="mb-2">{post.content}</p>

      {post.imageUrl && (
        <img src={post.imageUrl} alt="post media" className="rounded-lg max-h-96 w-full object-cover mb-2" />
      )}

      <div className="flex items-center space-x-4">
        <button onClick={handleLike} disabled={loading} className="px-2 py-1 bg-purple-600 rounded-md">
          {liked ? "❤️ Liked" : "🤍 Like"}
        </button>
        <span>{/* هنا ممكن نضيف عدد التعليقات */}</span>
      </div>
    </div>
  );
}
