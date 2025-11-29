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

      {/* ⚠️ BRAVE BROWSER AD-FREE NOTICE */}
      {/* ⚠️ BRAVE BROWSER AD-FREE NOTICE */}
      <div className="mt-6 w-full max-w-3xl bg-gradient-to-r from-orange-500 to-purple-600 text-white p-4 rounded-xl shadow-lg flex items-center gap-4 animate-pulse">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Brave_icon_red_and_white.svg/240px-Brave_icon_red_and_white.svg.png"
          alt="Brave Browser Logo"
          className="w-12 h-12"
        />
        <p className="text-lg font-semibold">
          🚀 For an <span className="font-bold underline">ad-free</span> watching experience, 
          we highly recommend using the <span className="font-bold">Brave Browser</span>!
        </p>
      </div>

    </div>
  );
}

