"use client";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const links = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Posts", icon: FileText, path: "/dashboard/posts" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  if (!user) return null; // حماية إضافية

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed left-0 top-0 h-screen w-64 bg-white/90 dark:bg-gray-950/95 backdrop-blur-sm border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between shadow-sm z-50"
    >
      {/* HEADER */}
      <div>
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent tracking-tight">
            Vibe Admin
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome, <span className="font-semibold">{user?.name.split(" ")[0]}</span>
          </p>
        </div>

        {/* LINKS */}
        <nav className="mt-4 space-y-1">
          {links.map(({ name, icon: Icon, path }) => {
            const active = pathname === path;
            return (
              <Link
                key={name}
                href={path}
                className={`flex items-center gap-3 px-6 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 dark:text-blue-400 border-r-4 border-purple-500"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                {name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
        {/* Theme toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-500 transition"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}

        {/* Logout */}
        <button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </motion.aside>
  );
}
