import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MR. STRANGER — 3D Cyber & Creative Developer Portfolio",
  description: "High-end cinematic 3D portfolio of MR. STRANGER — Developer, CSE Student, and Cybersecurity Enthusiast. Built with Next.js, React Three Fiber & Framer Motion.",
  keywords: ["MR STRANGER", "Developer Portfolio", "Cybersecurity", "Next.js 3D", "Three.js", "Full Stack Developer", "Khulna Bangladesh"],
  authors: [{ name: "MR. STRANGER" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
