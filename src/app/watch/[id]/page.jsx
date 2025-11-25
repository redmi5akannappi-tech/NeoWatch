"use client";
import axios from "axios";

export default async function WatchMovie({ params }) {
  const { id } = params;
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=external_ids`,
    { next: { revalidate: 60 } }
  );

  const movie = await response.json();

  const imdbId = movie.external_ids?.imdb_id;

  const embedUrl = `https://vidsrc.icu/embed/movie/${imdbId}`;

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>

      <div className="w-full max-w-4xl">
        <iframe
          className="w-full h-[500px] border-none rounded-lg"
          allowFullScreen
          scrolling="no"
          src={embedUrl}
        />
      </div>
    </div>
  );
}
