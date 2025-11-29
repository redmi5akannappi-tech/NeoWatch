export default async function WatchMovie({ params }) {
  const { id } = params;  // <-- This IS the TMDB movie ID

  const API_KEY = process.env.TMDB_API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
    { cache: "no-store" }
  );

  if (!response.ok) throw new Error("Movie not found");

  const movie = await response.json();

  const iframeSrc = `https://www.vidking.net/embed/movie/${id}?color=9146ff&autoPlay=true`;

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>

      <div className="w-full max-w-4xl">
        <iframe
          src={iframeSrc}
          width="100%"
          height="600"
          allowFullScreen
          className="rounded-lg"
        />
      </div>
    </div>
  );
}


