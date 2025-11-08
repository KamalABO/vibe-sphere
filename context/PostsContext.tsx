"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Post = {
  id: string;
  content: string;
  imageUrl?: string;
  author: { id: string; name: string; avatarUrl?: string };
  createdAt: string;
};

type PostsContextType = {
  posts: Post[];
  fetchPosts: () => Promise<void>;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);

  async function fetchPosts() {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostsContext.Provider value={{ posts, fetchPosts }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) throw new Error("usePosts must be used within PostsProvider");
  return context;
}
