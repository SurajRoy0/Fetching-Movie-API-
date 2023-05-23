import React, { useState, useEffect } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryInterval, setRetryInterval] = useState(null);

  const fetchMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films');
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      const transformedMovies = data.results.map((movie) => ({
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date,
      }));
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
      setRetryInterval(setTimeout(fetchMovies, 5000));
    }
    setIsLoading(false);
  };

  const cancelRetry = () => {
    clearTimeout(retryInterval);
  };

  useEffect(() => {
    fetchMovies();

    return () => {
      clearTimeout(retryInterval);
    };
  }, []);

  let content = <p>No Movies Found</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = (
      <div>
        <p>{error}</p>
        <button onClick={fetchMovies}>Retry</button>
        <button onClick={cancelRetry}>Cancel Retry</button>
      </div>
    );
  }
  if (isLoading) {
    content = <p>Please Wait...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
