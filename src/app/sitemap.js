export default function sitemap() {
  const base = "https://neo-watch-chi.vercel.app";

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/movie`, lastModified: new Date() },
    { url: `${base}/tv`, lastModified: new Date() },
    { url: `${base}/anime`, lastModified: new Date() },

    // IMPORTANT: point to segmented sitemaps
    {
      url: `${base}/sitemap-movies.xml`,
      lastModified: new Date(),
    },
    {
      url: `${base}/sitemap-tv.xml`,
      lastModified: new Date(),
    },
    {
      url: `${base}/sitemap-anime.xml`,
      lastModified: new Date(),
    },
  ];
}
