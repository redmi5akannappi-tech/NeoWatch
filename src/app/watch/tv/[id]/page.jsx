export default async function WatchSeries({ params }) {
  const { id } = params;

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&append_to_response=external_ids`,
    { cache: "no-store" }
  );

  if (!response.ok) throw new Error("Series not found");

  const series = await response.json();
  const imdbId = series.external_ids?.imdb_id;

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">{series.name}</h1>

      <div className="w-full max-w-4xl">
        <iframe
          className="w-full h-[500px] border-none rounded-lg"
          scrolling="no"
          allowFullScreen
          src={`https://vidsrc.icu/embed/tv/${imdbId}`}
        />
      </div>
    </div>
  );
}
