import type { Metadata } from "next";
import "./global.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "PRDb - Pratul Singh Raghava | Software Engineer & Product Lead",
  description: "The Pratul Database. Software Engineer & Product Lead who loves ABCD - Anything Backend Cloud & Data. First Class Honours from University of Sydney.",
  keywords: ["Software Engineer", "Product Lead", "Sydney", "AWS", "AI", "Cloud", "Full Stack", "Backend", "Data", "Pratul Singh Raghava"],
  authors: [{ name: "Pratul Singh Raghava" }],
  creator: "Pratul Singh Raghava",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://hellopratul.com",
    siteName: "PRDb",
    title: "PRDb - Pratul Singh Raghava",
    description: "Software Engineer & Product Lead who loves ABCD - Anything Backend Cloud & Data",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRDb - Pratul Singh Raghava",
    description: "Software Engineer & Product Lead who loves ABCD - Anything Backend Cloud & Data",
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

