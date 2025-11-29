export default async function WatchSeries({ params }) {
  const { id, season = 1, episode = 1 } = params; 
  // id = TMDB TV ID
  // season and episode can be passed through dynamic routing

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`,
    { cache: "no-store" }
  );

  if (!response.ok) throw new Error("Series not found");

  const series = await response.json();

  const iframeSrc = `https://www.vidking.net/embed/tv/${id}/${season}/${episode}?color=9146ff&nextEpisode=true&episodeSelector=true`;

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">{series.name}</h1>

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

