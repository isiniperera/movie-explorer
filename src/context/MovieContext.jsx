import { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [query, setQuery] = useState(localStorage.getItem("lastQuery") || "");
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("lastQuery", query);
  }, [query]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (movieId) => {
    setFavorites(favorites.filter((fav) => fav.id !== movieId));
  };

  return (
    <MovieContext.Provider 
      value={{ 
        query, 
        setQuery, 
        favorites, 
        setFavorites,
        addToFavorites,
        removeFromFavorites 
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};