import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: "MentorLagbe — Find Your Ideal Tutor",
  description: "Smart tuition & mentorship platform for students and tutors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="mentor">
      <body className={`${fraunces.variable} ${jakarta.variable} font-sans antialiased`}>
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}