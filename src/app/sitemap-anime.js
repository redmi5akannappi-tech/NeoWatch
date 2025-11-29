export default async function sitemap() {
  const base = "https://neo-watch-chi.vercel.app";
  const API_KEY = process.env.TMDB_API_KEY;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`,
      { next: { revalidate: 7200 } }
    );

    const data = await res.json();

    return (data.results || []).map((m) => ({
      url: `${base}/movie/${m.id}`,
      lastModified: new Date(),
    }));
  } catch {
    return [];
  }
}
