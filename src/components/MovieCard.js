import React from 'react';
import './../styles/MovieCard.css';

function MovieCard({ movie, imageApiUrl }) {
  return (
    <div className="movie-card">
      <img
        src={`${imageApiUrl}${movie['poster-image']}`}
        alt={movie.name}
        loading="lazy"
        onError={(e) => {
          e.target.src = `${imageApiUrl}placeholder.jpg`; // Fallback image
        }}
      />
      <p>{movie.name}</p>
    </div>
  );
}

export default MovieCard;
