import React, { useState } from 'react';
import { Box } from '@mui/material';
import { searchMovies, searchSimilarMovies } from '../../api/tmdbApi'
import { getSummary, getImdbLink } from '../../api/wikipediaApi'
import { Details } from './Details';
import { SearchResults } from './SearchResults';
import { SearchBar } from './SearchBar';

export function Search() {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const [rows, setRows] = useState([]);
  const [details, setDetails] = useState('Please select a movie!');
  const [wikipediaLink, setWikipediaLink] = useState(null);
  const [imdbLink, setImdbLink] = useState(null);

  const onSearch = async (searchText) => {
    console.log(`searchText: ${searchText}`);

    const result = await searchMovies(searchText);
    const movies = result.data.data.searchMovies;

    setRows(movies.map(({ id, name, score, genres }) => ({
      id,
      name,
      score,
      genres: genres.map(({ name }) => name).join(', '),
    })));
  };

  const onMovieSelect = async ({ id, title }) => {
    let summaryResult;
    try {
      summaryResult = await getSummary(title);
    } catch {
      setDetails(`Page "${title}" not found on Wikipedia!`);
      setWikipediaLink(null);
      setImdbLink(null);
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
  }

  const onSwitchToRelatedMovies = async () => {
    console.log(`Show related movies for ${title} / ${id}`);
    if (!id) {
      return;
    }

    const result = await searchSimilarMovies(id);
    const relatedMovies = result.data.data.movie.similar;

    console.log(relatedMovies);

    setRows(relatedMovies.map(({ id, name, score, genres }) => ({
      id,
      name,
      score,
      genres: genres.map(({ name }) => name).join(', '),
    })));
  }

  return (
    <div>
      <SearchBar
        onSearch={onSearch}
      />
      <Box
        sx={{
          display: 'inline-flex',
        }}
      >
        <SearchResults
          rows={rows}
          onMovieSelect={onMovieSelect}
        />
        <Details
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
