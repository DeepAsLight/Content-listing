import React, { useRef, useCallback } from 'react';
import MovieCard from './MovieCard';
import './../styles/Grid.css';

function Grid({ movies, loadMore, imageApiUrl }) {
  const observer = useRef();

  // Lazy Load Functionality
  const lastMovieElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore(); // Trigger load more when user scrolls near the last movie
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMore]
  );

  return (
    <div className="grid">
      {movies.map((movie, index) => {
        if (movies.length === index + 1) {
          return (
            <div ref={lastMovieElementRef} key={index}>
              <MovieCard movie={movie} imageApiUrl={imageApiUrl} />
            </div>
          );
        } else {
          return (
            <MovieCard key={index} movie={movie} imageApiUrl={imageApiUrl} />
          );
        }
      })}
    </div>
  );
}

export default Grid;