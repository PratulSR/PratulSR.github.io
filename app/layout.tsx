import type { Metadata } from "next";
import "./global.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "PRDb - Pratul Singh Raghava | Software Engineer",
  description: "The Pratul Database. Founding Engineer & Product Lead who loves ABCD - Anything Backend Cloud & Data. First Class Honours from University of Sydney.",
  keywords: ["Software Engineer", "Sydney", "AWS", "AI", "Cloud", "Full Stack", "Backend", "Data", "Pratul Singh Raghava"],
  authors: [{ name: "Pratul Singh Raghava" }],
  creator: "Pratul Singh Raghava",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://hellopratul.com",
    siteName: "PRDb",
    title: "PRDb - Pratul Singh Raghava",
    description: "Founding Engineer & Product Lead who loves ABCD - Anything Backend Cloud & Data",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRDb - Pratul Singh Raghava",
    description: "Founding Engineer & Product Lead who loves ABCD - Anything Backend Cloud & Data",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

