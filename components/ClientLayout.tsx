"use client";

import React from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { PostsProvider } from "@/context/PostsContext";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

function InnerLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 dark:text-gray-300">
        <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      {user && <Sidebar />}
      <div className={user ? "ml-64 transition-all" : ""}>
        {user && <Navbar />}
        <PostsProvider>{children}</PostsProvider>
      </div>
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <InnerLayout>{children}</InnerLayout>
    </AuthProvider>
  );
}
