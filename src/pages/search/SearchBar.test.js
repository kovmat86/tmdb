import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from "./SearchBar";

test("Search by the given text", () => {
  const mockCallback = jest.fn((arg) => arg );
  render(<SearchBar
    onSearch={mockCallback}
  />);

  fireEvent.change(screen.getByTestId('search-text'), { target: {value: 'Fight Club'}});
  fireEvent.click(screen.getByText(/^Search$/i));

  expect(mockCallback.mock.results[0].value).toBe('Fight Club');
});
