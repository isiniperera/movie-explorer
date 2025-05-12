import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import MoviePage from "./pages/MovieDetails";
import Login from "./pages/Login";
import Favorites from "./pages/Favourites";

const App = () => {
  return (
    <ThemeProvider>
      <MovieProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </BrowserRouter>
      </MovieProvider>
    </ThemeProvider>
  );
};

export default App;