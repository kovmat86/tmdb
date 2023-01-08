import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export function SearchResults({ rows, onMovieSelect }) {
  return (
    <Box sx={{
      display: 'block',
      width: '100%'
    }}>
      <h2>Search Results</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Genre(s)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Button
                    variant="text"
                    onClick={() => { onMovieSelect({ id: row.id, title: row.name }); }}
                    onKeyPress={event => {
                      console.log('onKeyPress');
                      console.log(event);
                      if (event.key === 'Enter') {
                        onMovieSelect({ id: row.id, title: row.name });
                      }
                    }}
                  >
                    {row.name}
                  </Button>
                </TableCell>
                <TableCell>{row.score}</TableCell>
                <TableCell>{row.genres}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
