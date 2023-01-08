import React, { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { searchMovies, searchSimilarMovies } from '../../api/tmdbApi'
import { getSummary, getImdbLink } from '../../api/wikipediaApi'
import { Details } from './Details';
import { SearchResults } from './SearchResults';
import { SearchBar } from './SearchBar';

const convertMoviesToRows = (movies) => movies.map(({ id, name, score, genres }) => ({
  id,
  name,
  score,
  genres: genres.map(({ name }) => name).join(', '),
}));

export function Search() {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const [rows, setRows] = useState([]);
  const [details, setDetails] = useState('Please select a movie!');
  const [wikipediaLink, setWikipediaLink] = useState(null);
  const [imdbLink, setImdbLink] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSearch = async (searchText) => {
    setIsLoading(true);
    const result = await searchMovies(searchText);
    const movies = result.data.data.searchMovies;

    setRows(convertMoviesToRows(movies));
    setIsLoading(false);
  };

  const onMovieSelect = async ({ id, title }) => {
    setIsLoading(true);
    let summaryResult;
    try {
      summaryResult = await getSummary(title);
    } catch {
      setDetails(`Page "${title}" not found on Wikipedia!`);
      setWikipediaLink(null);
      setImdbLink(null);
      setIsLoading(false);
      return;
    }

    setId(id);
    setTitle(title);
    const { data } = summaryResult;
    const { extract, content_urls } = data;
    setDetails(extract);
    setWikipediaLink(content_urls?.desktop?.page);

    const imdbLink = await getImdbLink(title);
    setImdbLink(imdbLink);
    setIsLoading(false);
  }

  const onSwitchToRelatedMovies = async () => {
    if (!id) {
      return;
    }

    setIsLoading(true);
    const result = await searchSimilarMovies(id);
    const relatedMovies = result.data.data.movie.similar;

    setRows(convertMoviesToRows(relatedMovies));
    setIsLoading(false);
  }

  return (
    <div className="page">
      <SearchBar
        onSearch={onSearch}
      />
      <div className="spinner">
        { isLoading && <CircularProgress/> }
      </div>
      <Box
        sx={{
          display: 'inline-flex',
          gap: '20px',
          width: '100%'
        }}
      >
        <SearchResults
          rows={rows}
          onMovieSelect={onMovieSelect}
        />
        <Details
          className='details'
          details={details}
          wikipediaLink={wikipediaLink}
          imdbLink={imdbLink}
          onSwitchToRelatedMovies={onSwitchToRelatedMovies}
          title={title}
        />
      </Box>
    </div>
  )
}
