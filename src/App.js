import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import MoviePage from "./pages/MovieDetails";
import Login from "./pages/Login"; // ✅ Make sure this path matches your actual file location

function App() {
  return (
    <ThemeProvider>
      <MovieProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} /> {/* ✅ Login route added */}
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MoviePage />} />
          </Routes>
        </BrowserRouter>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;
