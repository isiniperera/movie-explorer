import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import { fetchMovieDetails } from '../utils/api';

const MovieDetails = () => {
  const { id } = useParams();
  const { favorites, addToFavorites } = useContext(MovieContext);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    getDetails();
  }, [id]);

  const handleFavorite = () => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      alert('Movie is already in favorites');
      return;
    }
    addToFavorites(movie);
  };

  if (!movie) return <div className="p-4 text-center text-gray-600">Loading...</div>;

  const trailer = movie.videos?.results?.find(
    (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
  );

  return (
    <div className="p-4 max-w-4xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded shadow-md w-full md:w-1/3"
        />

        <div className="flex-1">
          <p className="mb-2"><strong>Release Date:</strong> {movie.release_date}</p>
          <p className="mb-2"><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
          <p className="mb-4"><strong>Overview:</strong> {movie.overview}</p>

          <p className="mb-4">
            <strong>Genres:</strong> {movie.genres?.map((g) => g.name).join(', ') || 'N/A'}
          </p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Top Cast</h2>
            <ul className="list-disc list-inside space-y-1">
              {movie.credits?.cast?.slice(0, 5).map((actor) => (
                <li key={actor.id}>
                  {actor.name} as <span className="italic">{actor.character}</span>
                </li>
              ))}
            </ul>
          </div>

          {trailer && (
            <div className="mt-4">
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-lg"
              >
                🎬 Watch Trailer
              </a>
            </div>
          )}

          <button
            onClick={handleFavorite}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
