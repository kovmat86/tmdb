import React from "react";
import { Button, Box, Link } from "@mui/material";

export function Details({
  title,
  details,
  wikipediaLink,
  imdbLink,
  onSwitchToRelatedMovies,
}) {
  return (
    <Box sx={{ display: "block", width: "100%" }}>
      <h2>Movie Details</h2>
      <h3>{title}</h3>
      <p className="details">{details}</p>
      <Box sx={{ display: "inline-flex", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "left",
            textAlign: "center",
            flexDirection: "column"
          }}
        >
          {wikipediaLink && (
            <Link href={wikipediaLink} target="_blank">
              Wikipedia link
            </Link>
          )}
          {imdbLink && (
            <Link href={imdbLink} target="_blank">
              IMDB link
            </Link>
          )}
        </Box>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "left" }}>
          {title && (
            <Button
              variant="contained"
              type="button"
              onClick={() => onSwitchToRelatedMovies()}
            >
              Related Movies
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
