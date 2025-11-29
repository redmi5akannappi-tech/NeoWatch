import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NeoWatch - Watch Free Movies, Anime & TV Shows",
  description:
    "Watch anime series, movies and TV shows for free. NeoWatch offers popular movies, trending anime and latest episodes with fast streaming and no signup.",
  keywords: [
    "free anime",
    "watch anime online",
    "free movies",
    "free tv series",
    "anime streaming",
    "movie streaming",
    "watch for free",
  ],
  metadataBase: new URL("https://neo-watch-chi.vercel.app"),
  openGraph: {
    title: "NeoWatch - Free Movies & Anime Streaming",
    description:
      "Stream movies, anime and TV series online for free. High-quality and fast streaming without signup.",
    url: "https://neo-watch-chi.vercel.app",
    siteName: "NeoWatch",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
      </body>
    </html>
  );
}



