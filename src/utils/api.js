import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch trending movies
export const fetchTrendingMovies = (page = 1) =>
  axios.get(`${BASE_URL}/trending/movie/day`, {
    params: { api_key: API_KEY, page }
  });

// Search movies
export const searchMovies = (query, page = 1) =>
  axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query, page }
  });

// Fetch movie details with appended videos and credits
export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
      append_to_response: "videos,credits"
    }
  });
  return response.data;
};
