import axios from 'axios';

const TMDB_WRAPPER_URL = 'https://tmdb.sandbox.zoosh.ie/dev/graphql';

export const searchByText = async (text) => {
  const data = { query: `query SearchMovies { searchMovies(query: "${text}") { id name score genres { name } } }` };

  return axios.post(TMDB_WRAPPER_URL, data);
};
