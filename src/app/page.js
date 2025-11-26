"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/LoadingSpinner";
import Footer from "@/components/Footer";

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [movies, setMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const [anime, setAnime] = useState([]);

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  // SEARCH
    const searchMovies = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    // Search movies
    const movieRes = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );

    // Search TV + Anime
    const tvRes = await axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${query}`
    );

    const allTv = tvRes.data.results;

    // Anime = TV shows with genre 16
    const animeResults = allTv.filter((item) =>
      item.genre_ids.includes(16)
    );

    setSearchResults({
      movies: movieRes.data.results,
      tv: allTv,
      anime: animeResults,
    });
  };


  const goToDetails = (type, id) => {
    setLoading(true);
    router.push(`/${type}/${id}`);
  };

  // Horizontal Row Component
    const Row = ({ title, data, type }) => {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
      <div className="mb-6 relative">
        <h2 className="text-xl font-bold mb-2">{title}</h2>

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide scroll-smooth"
        >
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

        {/* LEFT BUTTON */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 
          text-white p-3 rounded-full hidden md:flex"
        >
          ←
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 
          text-white p-3 rounded-full hidden md:flex"
        >
          →
        </button>
      </div>
    );
  };


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
        <button className="bg-blue-600 text-white px-4 rounded-r">
          Search
        </button>
      </form>

      {/* SEARCH RESULTS ROW */}
      {/* SHOW SEARCH ROWS IF SEARCH RESULTS EXIST */}
    {searchResults.movies && (
      <>
        <Row
          title={`🎬 Movie Results for "${query}"`}
          data={searchResults.movies}
          type="movie"
        />

        <Row
          title={`📺 TV Series Results for "${query}"`}
          data={searchResults.tv}
          type="tv"
        />

        <Row
          title={`🎌 Anime Results for "${query}"`}
          data={searchResults.anime}
          type="anime"
        />
      </>
    )}


      {/* Default Rows (Hidden during search) */}
      {searchResults.length === 0 && (
        <>
          <Row title="🔥 Popular Movies" data={movies} type="movie" />
          <Row title="📺 Popular TV Series" data={tvSeries} type="tv" />
          <Row title="🎌 Anime" data={anime} type="tv" />
        </>
      )}

      {/* Footer at the bottom ONLY once */}
      <Footer />
    </div>
  );
}
