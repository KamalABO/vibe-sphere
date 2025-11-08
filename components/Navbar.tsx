"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LogOut, User } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type UserData = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);

  // 🧠 تحديث المستخدم من localStorage أو تغيّر البيانات في الوقت الفعلي
  const syncUser = () => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("user");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  // ⏳ تحميل أولي + تحديث عند تغيّر البيانات أو في تبويب آخر
  useEffect(() => {
    syncUser();

    const interval = setInterval(syncUser, 1000); // تحديث تلقائي كل ثانية
    const listener = () => syncUser(); // استماع لتغيّر localStorage
    window.addEventListener("storage", listener);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", listener);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md shadow-sm"
    >
      <div className="flex items-center justify-between px-6 py-3 max-w-6xl mx-auto">
        {/* Logo / Title */}
        <Link
          href="/feed"
          className="text-xl font-semibold tracking-tight hover:text-primary transition-colors"
        >
          VibeSphere
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <ThemeSwitcher />

          {user ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              {/* User Info */}
              <div className="flex items-center gap-2">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border border-border shadow-sm"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center border border-border">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
                <span className="text-sm font-medium text-foreground">
                  {user.name}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors shadow-sm"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <Link
                href="/login"
                className="text-sm font-medium text-primary hover:underline"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium text-primary hover:underline"
              >
                Register
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
