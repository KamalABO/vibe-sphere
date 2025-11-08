"use client";
import { useEffect, useState } from "react";
import  PostCard  from "@/components/PostCard";

interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  author: { id: string; name: string; avatarUrl?: string };
  createdAt: string;
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  if (!posts) {
    // نعطي skeleton أثناء التحميل
    return <div className="max-w-2xl mx-auto p-4 space-y-6 animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-gray-900 rounded-2xl shadow-md p-4 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-700" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-600 rounded w-1/2" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-700 rounded w-5/6" />
            <div className="h-48 bg-gray-800 rounded-lg mt-2" />
          </div>
        </div>
      ))}
    </div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
