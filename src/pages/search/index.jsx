import React, { useRef, useState } from 'react';
import { Box, Button, InputLabel, TextField } from '@mui/material';
import { searchByText } from '../../api/searchApi'
import { getSummary, getImdbLink } from '../../api/wikipediaApi'
import { Details } from './Details';
import { SearchResults } from './SearchResults';

export function Search() {
  const textFieldRef = useRef();
  const [rows, setRows] = useState([]);
  const [details, setDetails] = useState('Please select a movie!');
  const [wikipediaLink, setWikipediaLink] = useState(null);
  const [imdbLink, setImdbLink] = useState(null);

  const doSearch = async () => {
    const searchText = textFieldRef.current.value;
    console.log(`searchText: ${searchText}`);

    const result = await searchByText(searchText);
    const movies = result.data.data.searchMovies;

    setRows(movies.map(({ name, score, genres }) => ({
      name,
      score,
      genres: genres.map(({ name }) => name).join(', '),
    })));
  };

  const selectMovie = async (title) => {
    let summaryResult;
    try {
      summaryResult = await getSummary(title);
    } catch {
      setDetails(`Page "${title}" not found on Wikipedia!`);
      setWikipediaLink(null);
      setImdbLink(null);
      return;
    }

    const { data } = summaryResult;
    const { extract, content_urls } = data;
    setDetails(extract);
    setWikipediaLink(content_urls?.desktop?.page);

    const imdbLink = await getImdbLink(title);
    setImdbLink(imdbLink);
  }

  return (
    <div>
      <h1>Search in The Movie Database</h1>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <InputLabel>
          Search criteria
        </InputLabel>
        <TextField
          inputRef={textFieldRef}
        />
        <Button
          variant="contained"
          type="button"
          onClick={() => doSearch()}
        >
          Search
        </Button>
      </Box>
      <Box
        sx={{
          display: 'inline-flex',
        }}
      >
        <SearchResults
          rows={rows}
          onMovieSelect={selectMovie}
        />
        <Details
          details={details}
          wikipediaLink={wikipediaLink}
          imdbLink={imdbLink}
        />
      </Box>
    </div>
  )
}
