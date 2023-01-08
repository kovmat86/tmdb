import React from 'react';
import { Button, Box, Link } from '@mui/material';

export function Details({ title, details, wikipediaLink, imdbLink, onSwitchToRelatedMovies }) {
  return (
    <Box sx={{ display: 'block' }}>
      <h2>Movie Details</h2>
      <h3>{title}</h3>
      <p>{details}</p>
      { wikipediaLink && <Link href={wikipediaLink} target="_blank">Wikipedia link</Link> } <br/>
      { imdbLink && <Link href={imdbLink} target="_blank">IMDB link</Link> } <br/>
      { title &&
        <Button variant="contained" type="button" onClick={() => onSwitchToRelatedMovies()}>
          Related Movies
        </Button>
      }
    </Box>
  )
}
