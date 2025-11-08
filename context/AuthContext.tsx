"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🧠 تحميل المستخدم من localStorage أو الكوكيز
  useEffect(() => {
    const savedUser = localStorage.getItem("vibe_user");
    const token = Cookies.get("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    } else {
      localStorage.removeItem("vibe_user");
      Cookies.remove("token");
    }

    setLoading(false);
  }, []);

  // 🧩 تسجيل دخول (محاكاة API)
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // ⚡ login fake user
      if (email === "admin@test.com" && password === "123456") {
        const fakeUser = {
          id: "1",
          name: "Admin User",
          email,
          avatarUrl: "/avatars/1.png",
        };
        localStorage.setItem("vibe_user", JSON.stringify(fakeUser));
        Cookies.set("token", "fake-jwt-token", { expires: 7 });
        setUser(fakeUser);
        router.push("/feed");
      } else {
        throw new Error("❌ Email or password is incorrect!");
      }
    } catch (err) {
      alert("❌ Email or password is incorrect!");
    } finally {
      setLoading(false);
    }
  };

  // 🧩 تسجيل جديد (محاكاة فقط)
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const existingUser = localStorage.getItem("vibe_user");
      if (existingUser) {
        alert("⚠️ You’re already registered and logged in!");
        setLoading(false);
        return;
      }

      const fakeUser = {
        id: Date.now().toString(),
        name,
        email,
        avatarUrl: "/avatars/default.png",
      };

      localStorage.setItem("vibe_user", JSON.stringify(fakeUser));
      Cookies.set("token", "fake-jwt-token", { expires: 7 });
      setUser(fakeUser);
      router.push("/feed");
    } catch (err) {
      alert("❌ Failed to register!");
    } finally {
      setLoading(false);
    }
  };

  // 🧩 تسجيل خروج
  const logout = () => {
    localStorage.removeItem("vibe_user");
    Cookies.remove("token");
    setUser(null);
    router.push("/landing");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 dark:text-gray-300">
        <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
