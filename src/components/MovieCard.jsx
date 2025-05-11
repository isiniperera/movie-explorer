// MovieCard.jsx
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => (
  <Link to={`/movie/${movie.id}`}>
    <div className="bg-white dark:bg-gray-800 p-2 rounded shadow">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded"
      />
      <h3 className="mt-2 text-sm font-bold">{movie.title}</h3>
      <p className="text-xs">{new Date(movie.release_date).getFullYear()}</p>
      <p className="text-xs">⭐ {movie.vote_average}</p>
    </div>
  </Link>
);
export default MovieCard;
