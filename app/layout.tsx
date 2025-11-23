import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import ParticleBackground from "@/components/ui/ParticleBackground";

export const metadata: Metadata = {
  title: "Vishal Nagvadiya | Senior Java Developer",
  description: "Full Stack Java Developer with 5+ years of experience in Spring Boot, Microservices, and Cloud Technologies. Specializing in scalable enterprise applications.",
  keywords: ["Java Developer", "Spring Boot", "Microservices", "Full Stack", "Cloud", "AWS", "React", "Kafka"],
  authors: [{ name: "Vishal Nagvadiya" }],
  creator: "Vishal Nagvadiya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
