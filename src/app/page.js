"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const router = useRouter();

  const [heroList, setHeroList] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  const [top10, setTop10] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [anime, setAnime] = useState([]);

  // SEARCH STATE
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetchHeroList();
    fetchTop10();
    fetchTrending();
    fetchPopularMovies();
    fetchPopularTv();
    fetchAnime();
  }, []);

  // HERO LIST
  const fetchHeroList = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );
    setHeroList(res.data.results.slice(0, 8));
  };

  // HERO ROTATION
  useEffect(() => {
    if (heroList.length === 0) return;

    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroList.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [heroList]);

  const fetchTop10 = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
    );
    setTop10(res.data.results.slice(0, 10));
  };

  const fetchTrending = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
    );
    setTrending(res.data.results);
  };

  const fetchPopularMovies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    setPopularMovies(res.data.results);
  };

  const fetchPopularTv = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
    );
    setPopularTv(res.data.results);
  };

  const fetchAnime = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16`
    );
    setAnime(res.data.results);
  };

  const goToDetails = (type, id) => {
    router.push(`/${type}/${id}`);
  };

  // 🔍 SEARCH FUNCTION
  const searchTMDB = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setResults(null);
      return;
    }

    const movieRes = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );

    const tvRes = await axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${query}`
    );

    const animeResults = tvRes.data.results.filter((t) =>
      t.genre_ids.includes(16)
    );

    setResults({
      movies: movieRes.data.results,
      tv: tvRes.data.results,
      anime: animeResults,
    });
  };

  // ROWS
  const Row = ({ title, data, type }) => {
    const scrollRef = useRef(null);

    const scrollLeft = () =>
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });

    const scrollRight = () =>
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

    return (
      <div className="mb-10 relative">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
        >
          {data.map((item, index) => (
            <div
              key={item.id}
              onClick={() =>
                goToDetails(item.media_type || type, item.id)
              }
              className="min-w-[180px] cursor-pointer relative"
            >
              {title.includes("Top 10") && (
                <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-7xl font-extrabold text-gray-300 opacity-40">
                  {index + 1}
                </span>
              )}

              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                className="rounded-xl w-[180px] h-[260px] object-cover shadow-lg hover:scale-105 duration-200"
              />
              <p className="text-sm mt-2 font-medium text-gray-200">
                {item.title || item.name}
              </p>
            </div>
          ))}
        </div>

        {/* SCROLL BUTTONS */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black px-3 py-2 rounded-full hidden md:flex"
        >
          ←
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black px-3 py-2 rounded-full hidden md:flex"
        >
          →
        </button>
      </div>
    );
  };

  const heroMovie = heroList[heroIndex];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* 🔥 HEADER WITH SEARCH BAR */}
      <header className="px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-wide">NeoWatch</h1>

        <form onSubmit={searchTMDB} className="flex">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 rounded-l bg-gray-800 border border-gray-700 w-56"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="bg-yellow-500 text-black px-4 rounded-r font-bold">
            🔍
          </button>
        </form>
      </header>

      {/* HERO */}
      {heroMovie && (
        <div
          className="relative w-full h-[70vh] rounded-xl overflow-hidden mb-12"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent flex flex-col justify-end p-10 max-w-xl">
            <h1 className="text-5xl font-bold mb-4">{heroMovie.title}</h1>
            <p className="text-gray-300 text-lg mb-6 line-clamp-3">
              {heroMovie.overview}
            </p>

            <div className="flex gap-4">
              <button
                className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-300"
                onClick={() => goToDetails("movie", heroMovie.id)}
              >
                ▶ Play
              </button>
              <button
                className="border border-yellow-400 px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 hover:text-black"
                onClick={() => goToDetails("movie", heroMovie.id)}
              >
                ℹ️ See More
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH RESULTS (IF ANY) */}
      {results && (
        <>
          <Row title={`Movie Results for "${query}"`} data={results.movies} type="movie" />
          <Row title={`TV Results for "${query}"`} data={results.tv} type="tv" />
          <Row title={`Anime Results for "${query}"`} data={results.anime} type="tv" />
        </>
      )}

      {/* DEFAULT HOME ROWS (ONLY IF NO SEARCH) */}
      {!results && (
        <>
          <Row title="TOP 10 TODAY" data={top10} type="movie" />
          <Row title="Trending Today" data={trending} type="movie" />
          <Row title="Popular Movies" data={popularMovies} type="movie" />
          <Row title="Popular TV" data={popularTv} type="tv" />
          <Row title="Anime" data={anime} type="tv" />
        </>
      )}

      <Footer />
    </div>
  );
}
