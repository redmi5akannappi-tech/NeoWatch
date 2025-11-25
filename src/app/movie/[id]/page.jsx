"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../../components/LoadingSpinner"; // adjust this path if needed

export default function MovieDetail({ params }) {
  const router = useRouter();
  const { id } = params;
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [navigating, setNavigating] = useState(false);

  // Fetch movie details client-side
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((res) => setMovie(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  // Show full-screen loader during navigation
  const goToWatch = () => {
    setNavigating(true);
    router.push(`/watch/${id}`);
  };

  // Show loading while fetching movie
  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {navigating && <LoadingSpinner />}

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
