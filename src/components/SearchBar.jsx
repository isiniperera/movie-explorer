import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";

const SearchBar = ({ onSearch }) => {
  const { setQuery } = useContext(MovieContext);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setQuery(input);
    onSearch(input);
    setHasSearched(true);
  };

  const handleBackHome = () => {
    setQuery("");
    setInput("");
    setHasSearched(false);
    navigate("/");
  };

  return (
    <div className="p-4 flex flex-col md:flex-row justify-center items-center gap-4">
      <form onSubmit={handleSubmit} className="w-full md:w-2/3">
        <input
          className="p-2 border rounded w-full text-black"
          placeholder="Search for a movie..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>

      {hasSearched && (
        <button
          onClick={handleBackHome}
          className="mt-2 md:mt-0 bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded"
        >
          Back to Home
        </button>
      )}
    </div>
  );
};

export default SearchBar;
