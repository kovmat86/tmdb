import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField } from '@mui/material';

export function SearchBar({ onSearch }) {
  const textFieldRef = useRef();

  return (
    <>
      <h1>Search in The Movie Database</h1>
      <Box
        sx={{
          display: "flex",
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        <TextField
          inputProps={{ "data-testid": "search-text" }}
          inputRef={textFieldRef}
          size="small"
          onKeyPress={event => {
            if (event.key === 'Enter') {
              onSearch(textFieldRef.current.value);
            }
          }}
        />
        <Button
          variant="contained"
          type="button"
          onClick={() => onSearch(textFieldRef.current.value)}
        >
          Search
        </Button>
      </Box>
    </>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
