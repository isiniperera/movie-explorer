import { useEffect, useState, useContext } from 'react';
import { getCurrentUser, logout } from '../services/auth.js';
import { useNavigate, Link } from 'react-router-dom';
import { fetchTrendingMovies, searchMovies } from '../utils/api.js';
import SearchBar from '../components/SearchBar';
import { ThemeContext } from '../context/ThemeContext.jsx';

export default function Home() {
  const [username, setUsername] = useState(getCurrentUser());
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(ThemeContext);

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
      setMovies([]);
      setSearchQuery('');
      setPage(1);
      setHasMore(true);
      setError(null);
    } catch (err) {
      setError('Failed to load trending movies. Please try again later.');
    }
  };

  const handleLogout = () => {
    logout();
    setUsername(null);
    navigate('/login');
  };

  const handleSearch = async (query, pageNum = 1) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await searchMovies(query, pageNum);
      const results = response.data.results;

      if (pageNum === 1) {
        setMovies(results);
      } else {
        setMovies((prev) => [...prev, ...results]);
      }

      setSearchQuery(query);
      setPage(pageNum);
      setHasMore(results.length > 0);
    } catch (err) {
      setError('Something went wrong while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    setMovies([]);
    setSearchQuery('');
    setPage(1);
    fetchTrending();
  };

  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (bottomReached && !loading && hasMore && searchQuery) {
        handleSearch(searchQuery, page + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, page, searchQuery]);

  const MovieCard = ({ movie }) => (
    <Link to={`/movie/${movie.id}`} className="hover:scale-105 transform transition">
      <div className={`rounded shadow p-2 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="rounded mb-2 w-full"
        />
        <h3 className="text-md font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-400">{movie.release_date?.split('-')[0]}</p>
        <p className="text-sm text-yellow-400">⭐ {movie.vote_average}</p>
      </div>
    </Link>
  );

  return (
    <div className={`p-6 min-h-screen transition duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {username}!</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
          <button
            onClick={toggleTheme}
            className="bg-gray-300 dark:bg-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600 text-black dark:text-white transition-all duration-300"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      <SearchBar onSearch={(query) => handleSearch(query, 1)} />

      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}

      {movies.length > 0 ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          {loading && <p className="text-center mt-4 text-gray-500">Loading more movies...</p>}
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

      {movies.length > 0 && (
        <div className="mt-4">
          <button
            onClick={handleBackToHome}
            className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded"
          >
            Back to Trending Movies
          </button>
        </div>
      )}
    </div>
  );
}
