export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://neo-watch-chi.vercel.app/sitemap.xml",
  };
}