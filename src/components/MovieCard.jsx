// src/components/MovieCard.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

const MovieCard = ({ movie }) => {
  const { favorites, removeFromFavorites } = useContext(MovieContext);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {movie.title}
        </h3>
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <span>{new Date(movie.release_date).getFullYear()}</span>
          <span className="flex items-center">
            ⭐ {movie.vote_average.toFixed(1)}
          </span>
        </div>
        {isFavorite && (
          <button
            onClick={() => removeFromFavorites(movie.id)}
            className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition-colors"
          >
            Remove from Favorites
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;