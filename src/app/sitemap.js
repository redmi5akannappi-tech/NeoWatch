export default async function sitemap() {
  const baseUrl = "https://neo-watch-chi.vercel.app";
  const API_KEY = process.env.TMDB_API_KEY; // FIX BELOW

  // Fetch popular movies
  const movieRes = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const movieData = await movieRes.json();

  // Fetch popular TV
  const tvRes = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const tvData = await tvRes.json();

  // Fetch anime
  const animeRes = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16`,
    { next: { revalidate: 3600 } }
  );
  const animeData = await animeRes.json();

  // Generate URLs
  const movieUrls = movieData?.results?.map((m) => ({
    url: `${baseUrl}/movie/${m.id}`,
    lastModified: new Date(),
  })) || [];

  const tvUrls = tvData?.results?.map((t) => ({
    url: `${baseUrl}/tv/${t.id}`,
    lastModified: new Date(),
  })) || [];

  const animeUrls = animeData?.results?.map((a) => ({
    url: `${baseUrl}/anime/${a.id}`,
    lastModified: new Date(),
  })) || [];

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/movie`, lastModified: new Date() },
    { url: `${baseUrl}/tv`, lastModified: new Date() },
    { url: `${baseUrl}/anime`, lastModified: new Date() },
    ...movieUrls,
    ...tvUrls,
    ...animeUrls,
  ];
}
