"use client";

import { useEffect, useState, useTransition } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function MovieDetail({ params }) {
  const { id } = params;
  const router = useRouter();
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // React transition state (replaces navigating)
  const [isPending, startTransition] = useTransition();

  // Fetch movie details
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((res) => setMovie(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  // Transition handler
  const goToWatch = () => {
    startTransition(() => {
      router.push(`/watch/${id}`);
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* Smooth transition spinner */}
      {isPending && <LoadingSpinner />}

      <h1 className="text-2xl font-bold text-center">{movie.title}</h1>

      <div className="flex justify-center mt-4">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded-lg"
        />
      </div>

      <p className="mt-4 text-gray-800">{movie.overview}</p>
      <p className="mt-2 font-semibold">Rating: {movie.vote_average}</p>

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
