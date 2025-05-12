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
    <div className={`min-h-screen transition duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* New Attractive Header */}
      <div className={`relative ${darkMode ? "bg-gray-800" : "bg-gradient-to-r from-blue-600 to-purple-600"} text-white shadow-lg`}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left side - Welcome message */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">Welcome, {username}!</h1>
              <p className="text-lg opacity-90">Discover and explore amazing movies</p>
            </div>

            {/* Right side - Navigation buttons */}
            <div className="flex items-center gap-4">
              <Link
                to="/favorites"
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
              >
                <span className="text-xl">❤️</span>
                <span>My Favorites</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-all duration-300"
              >
                Logout
              </button>
              <button
                onClick={toggleTheme}
                className={`${
                  darkMode 
                    ? "bg-white/10 hover:bg-white/20" 
                    : "bg-black/10 hover:bg-black/20"
                } text-white px-4 py-3 rounded-full transition-all duration-300`}
              >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </button>
            </div>
          </div>
        </div>

        {/* Decorative wave effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className={`w-full h-12 ${darkMode ? "text-gray-900" : "text-gray-100"}`}
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1150,100 1350,0 1440,50 L1440,100 L0,100 Z"
            />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <SearchBar onSearch={(query) => handleSearch(query, 1)} />

        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        {movies.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold mb-6">Search Results</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            {loading && <p className="text-center mt-4 text-gray-500">Loading more movies...</p>}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6">Trending Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {trending.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}

        {movies.length > 0 && (
          <div className="mt-6">
            <button
              onClick={handleBackToHome}
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300"
            >
              Back to Trending Movies
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
