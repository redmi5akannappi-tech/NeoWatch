"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  // Fetch popular movies on load
  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    setMovies(res.data.results);
  };

  const searchMovies = async (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      fetchPopularMovies();
      return;
    }

    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );
    setMovies(res.data.results);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center p-2">Movie Search</h1>

      {/* 🔍 Search Bar */}
      <form onSubmit={searchMovies} className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded-l w-64"
        />
        <button className="bg-blue-600 text-white px-4 rounded-r">
          Search
        </button>
      </form>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`} className="block">
            <div className="border rounded-lg">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full"
              />
              <p className="p-2 text-center">{movie.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
