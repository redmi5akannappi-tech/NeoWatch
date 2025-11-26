"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [movies, setMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const [anime, setAnime] = useState([]);

  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchPopularMovies();
    fetchPopularTv();
    fetchAnime();
  }, []);

  // Fetch Movies
  const fetchPopularMovies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    setMovies(res.data.results);
  };

  // Fetch Popular TV
  const fetchPopularTv = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
    );
    setTvSeries(res.data.results);
  };

  // Fetch Anime (genre 16)
  const fetchAnime = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16`
    );
    setAnime(res.data.results);
  };

  // Search
  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) return fetchPopularMovies();

    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );
    setMovies(res.data.results);
  };

  const goToDetails = (type, id) => {
    setLoading(true);
    router.push(`/${type}/${id}`);
  };

  const Row = ({ title, data, type }) => (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-thin">
        {data.map((item) => (
          <div
            key={item.id}
            className="min-w-[150px] cursor-pointer"
            onClick={() => goToDetails(type, item.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
              alt={item.title || item.name}
              className="rounded-lg w-[150px] h-[225px] object-cover"
            />
            <p className="text-center mt-1 text-sm font-medium">
              {item.title || item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4">

      {loading && <LoadingSpinner />}

      <h1 className="text-2xl font-bold text-center mb-4">Movie Explorer</h1>

      {/* Search */}
      <form onSubmit={searchMovies} className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded-l w-64"
        />
        <button className="bg-blue-600 text-white px-4 rounded-r">Search</button>
      </form>

      {/* Rows */}
      <Row title="🔥 Popular Movies" data={movies} type="movie" />
      <Row title="📺 Popular TV Series" data={tvSeries} type="tv" />
      <Row title="🎌 Anime" data={anime} type="tv" />

    </div>
  );
}
