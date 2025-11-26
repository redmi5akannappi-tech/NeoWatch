"use client";

import { useEffect, useState, useTransition } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function AnimeDetail({ params }) {
  const { id } = params;
  const router = useRouter();
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`)
      .then((res) => setAnime(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  const goToWatch = () => {
    startTransition(() => {
      router.push(`/watch/anime/${id}`);
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {isPending && <LoadingSpinner />}

      <h1 className="text-2xl font-bold text-center">{anime.name}</h1>

      <div className="flex justify-center mt-4">
        <Image
          src={`https://image.tmdb.org/t/p/w500${anime.poster_path}`}
          alt={anime.name}
          width={300}
          height={450}
          className="rounded-lg"
        />
      </div>

      <p className="mt-4">{anime.overview}</p>
      <p className="mt-2 font-semibold">Rating: {anime.vote_average}</p>

      <div className="mt-4 text-center">
        <button
          onClick={goToWatch}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Watch Now
        </button>
      </div>
    </div>
  );
}
