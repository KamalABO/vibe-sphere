// app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import ClientLayout from "@/components/ClientLayout";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "VibeSphere",
  description: "Connect, share, and explore creative vibes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen">
                
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />

          
          {/* ClientLayout هو اللي يحتوي كل الـ client-only logic */}
          <ClientLayout>{children}</ClientLayout>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
