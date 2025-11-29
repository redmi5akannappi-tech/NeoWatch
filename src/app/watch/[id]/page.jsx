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

      {/* ⚠️ BRAVE BROWSER AD-FREE NOTICE */}
      <div className="mt-6 w-full max-w-3xl bg-gradient-to-r from-orange-500 to-purple-600 text-white p-4 rounded-xl shadow-lg flex items-center gap-4 animate-pulse">
        <img
          src="https://brave.com/static-assets/images/brave-logo-sans-text.svg"
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


