import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export function Details({ details, wikipediaLink, imdbLink }) {
  return (
    <Box sx={{ display: 'block' }}>
      <h2>Movie Details</h2>
      <p>{details}</p>
      { wikipediaLink && <Link href={wikipediaLink} target="_blank">Wikipedia link</Link> }<br />
      { imdbLink && <Link href={imdbLink} target="_blank">IMDB link</Link> }
    </Box>
  )
}
