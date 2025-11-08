"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function LandingPage() {
  const { user } = useAuth();
  const router = useRouter();

  // ✅ لو المستخدم مسجل دخول، يحوله تلقائيًا للصفحة الرئيسية
  useEffect(() => {
    if (user) router.push("/home");
  }, [user, router]);

  if (user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex flex-col items-center justify-between">
      {/* ===== Hero Section ===== */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Welcome to <span className="text-white">Dynamic Social</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            The next-generation platform to create, share, and explore engaging posts with real-time collaboration and AI-powered insights.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              className="px-6 py-3 text-lg bg-purple-600 hover:bg-purple-700 transition-all rounded-xl shadow-lg"
              onClick={() => router.push("/register")}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              className="px-6 py-3 text-lg border-gray-600 text-gray-200 hover:bg-gray-800 rounded-xl transition-all"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ===== Feature Cards ===== */}
      <section className="grid md:grid-cols-2 gap-8 max-w-6xl w-full px-6 py-16">
        {[
          {
            title: "Connect & Share",
            color: "text-purple-400",
            img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000",
            desc: "Build your community, share creative ideas, and inspire others in a place made for modern creators.",
          },
          {
            title: "Create & Explore",
            color: "text-pink-400",
            img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000",
            desc: "Dive into a world of innovation — from interactive posts to advanced analytics that keep you ahead.",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="bg-gray-900/60 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all backdrop-blur-lg"
          >
            <img
              src={card.img}
              alt={card.title}
              className="rounded-xl mb-4 object-cover h-56 w-full"
            />
            <h2 className={`text-2xl font-bold mb-2 ${card.color}`}>
              {card.title}
            </h2>
            <p className="text-gray-300">{card.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* ===== Values Section ===== */}
      <section className="w-full px-6 py-20 bg-gradient-to-b from-gray-900/60 to-black text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4 text-white">
            Why Choose Dynamic Social?
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            Because you deserve a smarter, faster, and more inspiring way to connect.  
            Whether you're an influencer, a startup, or just someone who loves creativity — we’ve got you covered.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🚀",
                title: "Fast & Dynamic",
                desc: "Experience blazing performance with seamless navigation and real-time updates.",
                color: "text-purple-300",
              },
              {
                icon: "💡",
                title: "Smart Design",
                desc: "Enjoy a sleek, modern interface designed to make your experience intuitive and elegant.",
                color: "text-pink-300",
              },
              {
                icon: "🌍",
                title: "Global Community",
                desc: "Join creators and thinkers from all around the world in one powerful digital space.",
                color: "text-blue-300",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gray-800/40 rounded-xl hover:bg-gray-800 transition-all"
              >
                <h3 className={`text-xl font-semibold mb-2 ${value.color}`}>
                  {value.icon} {value.title}
                </h3>
                <p className="text-gray-400 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== Footer Section ===== */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full border-t border-gray-800 py-8 flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-950 to-gray-900"
      >
        <motion.p
          className="text-sm md:text-base font-medium opacity-90 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="block mb-1 text-gray-400">Designed & Developed by</span>
          <motion.span
            className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-extrabold text-2xl tracking-widest"
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            KAMAL
          </motion.span>
          <span className="text-gray-400 font-light block mt-1">
            — Frontend Developer
          </span>
        </motion.p>

        <motion.div
          className="flex gap-4 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="https://github.com/KamalABO"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors"
          >
            <i className="ri-github-fill text-xl"></i>
          </a>
          <a
            href="https://wa.me/201017232631"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors"
          >
            <i className="ri-whatsapp-fill text-xl"></i>
          </a>
        </motion.div>

        <motion.p
          className="mt-4 text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          © {new Date().getFullYear()} All Rights Reserved.
        </motion.p>
      </motion.footer>
    </div>
  );
}
