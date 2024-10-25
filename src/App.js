import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Grid from './components/Grid';
import Spinner from './components/Spinner';
import './App.css';

const BASE_API_URL = 'https://test.create.diagnal.com/data/';
const IMAGE_API_URL = 'https://test.create.diagnal.com/images/';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState(null);

  // Fetch data from API
  const fetchMovies = async (page) => {
    try {
      setLoading(true);  // Set loading to true when starting to fetch
      const response = await axios.get(`${BASE_API_URL}page${page}.json`, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
        },
      });      
      
      if (response.status === 200) {
        const newMovies = response.data.page["content-items"].content;
        setMovies(prevMovies => [...prevMovies, ...newMovies]);
        if (newMovies.length === 0) setHasMore(false); // No more pages to load
      } else {
        console.error('Failed to fetch page:', page, 'Status:', response.status);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError(error.message);
      setHasMore(false);  // Stop further loading if error occurs
    } finally {
      setLoading(false);  // Set loading to false when done
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  // Load more data when reaching the bottom
  const loadMore = () => {
    if (hasMore && !loading && !error) setPage(prevPage => prevPage + 1);
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // Filter movies based on search query
  const filteredMovies = movies.filter(movie =>
    movie.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="app">
      {loading}
      {error && <div className="error">Error: {error}</div>}
      <Header onSearch={handleSearch} />
      <Grid movies={filteredMovies} loadMore={loadMore} imageApiUrl={IMAGE_API_URL} />
      {loading && <Spinner />}  {/* Show the spinner while loading */}
    </div>
  );
}

export default App;