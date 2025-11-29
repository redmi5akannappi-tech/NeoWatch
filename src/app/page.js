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

  useEffect(() => {
    fetchHeroList();
    fetchTop10();
    fetchTrending();
    fetchPopularMovies();
    fetchPopularTv();
    fetchAnime();
  }, []);

  // 🎥 HERO MOVIE LIST (pull from trending)
  const fetchHeroList = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );
    setHeroList(res.data.results.slice(0, 8)); // first 8 movies for rotation
  };

  // 🔁 Auto-change hero banner
  useEffect(() => {
    if (heroList.length === 0) return;

    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroList.length);
    }, 7000); // 7 seconds

    return () => clearInterval(interval);
  }, [heroList]);

  // Fetch Top 10
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

  // 🎞️ ROW COMPONENT with left/right scroll buttons
  const Row = ({ title, data, type }) => {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };
    const scrollRight = () => {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
      <div className="mb-10 relative">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>

        {/* Scrollable container */}
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
              {/* Top 10 ranks only for top row */}
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

        {/* LEFT SCROLL BUTTON */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full hidden md:flex"
        >
          ←
        </button>

        {/* RIGHT SCROLL BUTTON */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full hidden md:flex"
        >
          →
        </button>
      </div>
    );
  };

  // CURRENT HERO MOVIE
  const heroMovie = heroList[heroIndex];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* BRANDING */}
      <header className="px-6 py-4 text-3xl font-extrabold tracking-wide">
        NeoWatch
      </header>

      {/* HERO BANNER */}
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
            <h1 className="text-5xl font-bold mb-4">
              {heroMovie.title}
            </h1>

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

      {/* ROWS */}
      <Row title="TOP 10 TODAY" data={top10} type="movie" />
      <Row title="Trending Today" data={trending} type="movie" />
      <Row title="Popular Movies" data={popularMovies} type="movie" />
      <Row title="Popular TV" data={popularTv} type="tv" />
      <Row title="Anime" data={anime} type="tv" />

      <Footer />
    </div>
  );
}
