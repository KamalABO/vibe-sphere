
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { PostsProvider } from "@/context/PostsContext";

export const metadata = {
  title: "VibeSphere",
  description: "A lightweight social app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ThemeProviderWrapper>
          <PostsProvider>
            <div className="flex flex-col md:flex-row min-h-screen">
              {/* <Sidebar /> */}
              <main className="flex-1 p-4">
                {/* <Navbar /> */}
                <section>{children}</section>
              </main>
            </div>
          </PostsProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
