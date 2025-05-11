### Movie Search App
This is a movie search app built with React, React Router, and Context API. The app allows users to search for movies, view trending movies, and see movie details. Users need to log in before accessing the app, and they can search for movies or navigate to specific movie details pages.

###  Features Implemented
## User Authentication:

Users need to log in with a username to access the movie search functionality.

After logging in, users can see the trending movies and search for movies by title.

## Search for Movies:

Users can search for movies by title, and the app will display search results.

After performing a search, users can click on the "Back to Home" button to return to the trending movie list.

## Trending Movies:

On the homepage, the app displays a list of trending movies fetched from the API.

Users can view movie details by clicking on any movie card.

## Movie Details Page:

When users click on a movie, they are redirected to a details page that shows more information about the selected movie.

### Project Setup
Prerequisites
Before setting up the project, ensure you have the following installed:

Node.js (v14 or higher)

npm (or yarn)

## Installation



git clone https://github.com/isiniperera/movie-search-app.git
Navigate to the project directory:


cd movie-search-app
Install the dependencies:


npm install
Running the Development Server
After installing the dependencies, you can run the development server:

npm start
This will start the app on http://localhost:3000, and you can view it in your browser.

API Usage
This app uses The Movie Database (TMDb) API to fetch movie data. Here's a breakdown of the API usage:

Trending Movies:

The app fetches the trending movies using the fetchTrendingMovies function, which makes a request to the TMDb API to get the most popular movies.

Search Movies:

Users can search for movies by title using the searchMovies function. This makes a query to the TMDb API and returns search results based on the user's input.

TMDb API Key
To use the TMDb API, you will need to create an account and get your own API key from TMDb's website. Once you have the key, store it in a .env file in the root directory of the project:


REACT_APP_TMDB_API_KEY=3ef5a5683952269e51ee0e83be848dc8


### API Endpoints
Trending Movies: /trending/movie/week

Search Movies: /search/movie

Project Structure

src/
  components/
    MovieCard.js        # Displays a movie card with basic details
    MovieDetails.js     # Displays detailed information about a selected movie
    SearchBar.js        # Search bar component for searching movies
  context/
    MovieContext.js     # Provides global state for the movie search functionality
    ThemeContext.js     # Provides theme-related context (e.g., dark mode)
  pages/
    Home.js             # Homepage with trending movies and search bar
    Login.js            # Login page where users enter their username
    MoviePage.js        # Movie details page
  services/
    auth.js             # Authentication utilities (e.g., user session management)
  utils/
    api.js              # Utility functions for interacting with TMDb API
  App.js                # Main entry point for routing and context providers
  index.js              # Renders the app
Deployment
The app is deployed live on Netlify 



