import axios from "axios";
import Link from "next/link";
import Image from "next/image";

export default async function MovieDetail({ params }) {
  const { id } = params;
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  // Fetch movie details
  const movieResponse = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );

  const movie = movieResponse.data;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center">{movie.title}</h1>

      {/* Smaller Image */}
      <div className="flex justify-center mt-4">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}   // Small image width
          height={450}  // Maintain ratio
          className="rounded-lg"
        />
      </div>

      <p className="mt-4 text-gray-800">{movie.overview}</p>
      <p className="mt-2 font-semibold">Rating: {movie.vote_average}</p>

      <div className="mt-4 text-center">
        <Link href={`/watch/${id}`}>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Watch Now
          </button>
        </Link>
      </div>
    </div>
  );
}
