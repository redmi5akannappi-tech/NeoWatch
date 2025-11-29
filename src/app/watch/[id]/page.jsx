export default async function WatchMovie({ params }) {
  const { id } = params;

  const API_KEY = process.env.TMDB_API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=external_ids`,
    { cache: "no-store" }
  );

  if (!response.ok) throw new Error("Movie not found");

  const movie = await response.json();
  const imdbId = movie.external_ids?.imdb_id;

  // fallback if imdbId doesn't exist
  const iframeSrc = imdbId
    ? `https://www.vidking.net/embed/movie/${imdbId}/1/8?color=9146ff`
    : null;

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>

      <div className="w-full max-w-4xl">
        {iframeSrc ? (
          <iframe
            src={iframeSrc}
            width="100%"
            height="600"
            allowFullScreen
            className="rounded-lg"
          />
        ) : (
          <p className="text-red-500">
            No IMDB ID available — cannot load stream.
          </p>
        )}
      </div>
    </div>
  );
}


