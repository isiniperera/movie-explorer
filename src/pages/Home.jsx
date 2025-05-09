import { useEffect, useState } from 'react';
import { getCurrentUser, logout } from '../services/auth.js';
import { useNavigate } from 'react-router-dom';
import { fetchTrendingMovies, searchMovies } from '../utils/api.js';
import { Link } from 'react-router-dom';

export default function Home() {
  const [username, setUsername] = useState(getCurrentUser());
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate('/login');
    } else {
      fetchTrending();
    }
  }, [username]);

  const fetchTrending = async () => {
    try {
      const response = await fetchTrendingMovies();
      setTrending(response.data.results);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const handleLogout = () => {
    logout();
    setUsername(null);
    navigate('/login');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      const response = await searchMovies(searchTerm);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const MovieCard = ({ movie }) => (
    <Link to={`/movie/${movie.id}`} className="hover:scale-105 transform transition">
      <div className="bg-white rounded shadow p-2">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="rounded mb-2 w-full"
        />
        <h3 className="text-md font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-600">{movie.release_date?.split('-')[0]}</p>
        <p className="text-sm text-yellow-600">⭐ {movie.vote_average}</p>
      </div>
    </Link>
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {username}!
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a movie..."
          className="w-full md:w-1/2 p-2 rounded border border-gray-300 focus:outline-none"
        />
      </form>

      {movies.length > 0 ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Trending Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {trending.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
