"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const router = useRouter();

  const [heroMovie, setHeroMovie] = useState(null);
  const [top10, setTop10] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    fetchHeroMovie();
    fetchTop10();
    fetchTrending();
    fetchPopularMovies();
    fetchPopularTv();
    fetchAnime();
  }, []);

  // HERO MOVIE (Random upcoming or popular)
  const fetchHeroMovie = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
    );

    const randomMovie =
      res.data.results[Math.floor(Math.random() * res.data.results.length)];

    setHeroMovie(randomMovie);
  };

  // TOP 10
  const fetchTop10 = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
    );
    setTop10(res.data.results.slice(0, 10));
  };

  // TRENDING
  const fetchTrending = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
    );
    setTrending(res.data.results);
  };

  // POPULAR MOVIES
  const fetchPopularMovies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    setPopularMovies(res.data.results);
  };

  // POPULAR TV
  const fetchPopularTv = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
    );
    setPopularTv(res.data.results);
  };

  // ANIME
  const fetchAnime = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16`
    );
    setAnime(res.data.results);
  };

  const goToDetails = (type, id) => {
    router.push(`/${type}/${id}`);
  };

  // Row Component
  const Row = ({ title, data, type }) => {
    const scrollRef = useRef(null);

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
              onClick={() => goToDetails(item.media_type || type, item.id)}
              className="min-w-[180px] cursor-pointer relative"
            >
              {/* Top 10 numbers (only for Top 10 row) */}
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
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* NAVBAR / BRANDING */}
      <header className="px-6 py-4 text-3xl font-extrabold tracking-wide">
        NeoWatch
      </header>

      {/* HERO SECTION */}
      {heroMovie && (
        <div
          className="relative w-full h-[70vh] rounded-xl overflow-hidden mb-12"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent flex flex-col justify-end p-10 max-w-xl">

            <h1 className="text-5xl font-bold mb-4">{heroMovie.title}</h1>

            <div className="flex gap-3 mb-4">
              <span className="bg-white/10 px-3 py-1 rounded-full">
                ⭐ {(heroMovie.vote_average || 0).toFixed(1)}
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-full">
                {heroMovie.release_date?.split("-")[0]}
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-full">
                Movie
              </span>
            </div>

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

      {/* TOP 10 TODAY */}
      <Row title="TOP 10 CONTENT TODAY" data={top10} type="movie" />

      {/* TRENDING */}
      <Row title="Trending Today" data={trending} type="movie" />

      {/* POPULAR MOVIES */}
      <Row title="Popular Movies" data={popularMovies} type="movie" />

      {/* POPULAR TV */}
      <Row title="Popular TV Series" data={popularTv} type="tv" />

      {/* ANIME */}
      <Row title="Anime" data={anime} type="tv" />

      <Footer />
    </div>
  );
}
