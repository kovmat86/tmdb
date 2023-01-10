import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchResults } from "./SearchResults";

const rows = [{
    id: 102,
    name: 'Terminator 2',
    score: '8.1',
    genres: 'sci-fi, action',
  },
  {
    id: 105,
    name: 'Titanic',
    score: '7.8',
    genres: 'drama, romance',
  }
];

test("Search results page populated with movies", () => {
  const onMovieSelectMock = jest.fn((arg) => arg);
  render(<SearchResults
    rows={rows}
    onMovieSelect={onMovieSelectMock}
  />);

  expect(screen.getByText('Terminator 2')).toBeInTheDocument();
  expect(screen.getByText('8.1')).toBeInTheDocument();
  expect(screen.getByText('sci-fi, action')).toBeInTheDocument();
  expect(screen.getByText('Titanic')).toBeInTheDocument();
  expect(screen.getByText('7.8')).toBeInTheDocument();
  expect(screen.getByText('drama, romance')).toBeInTheDocument();
});

test("Clicking on title fetches details", () => {
  const onMovieSelectMock = jest.fn((arg) => arg );
  render(<SearchResults
    rows={rows}
    onMovieSelect={onMovieSelectMock}
  />);

  fireEvent.click(screen.getByText(/Terminator 2/));
  expect(onMovieSelectMock.mock.results[0].value).toStrictEqual({
    id: 102,
    title: 'Terminator 2'
  });
});
