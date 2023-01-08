import React, { useRef } from "react";
import { Box, Button, InputLabel, TextField } from '@mui/material';

export function SearchBar({ onSearch }) {
  const textFieldRef = useRef();

  return (
    <>
      <h1>Search in The Movie Database</h1>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <InputLabel>Search criteria</InputLabel>
        <TextField inputRef={textFieldRef} />
        <Button variant="contained" type="button" onClick={() => onSearch(textFieldRef.current.value)}>
          Search
        </Button>
      </Box>
    </>
  );
}
