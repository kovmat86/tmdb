import React, { useRef } from 'react';
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
          inputRef={textFieldRef}
          size="small"
        />
        <Button variant="contained" type="button" onClick={() => onSearch(textFieldRef.current.value)}>
          Search
        </Button>
      </Box>
    </>
  );
}
