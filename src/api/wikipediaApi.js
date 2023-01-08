import axios from 'axios';

const WIKIPEDIA_REST_URL = 'https://en.wikipedia.org/api/rest_v1/page';

export const getSummary = async (title) => {
  return axios.get(`${WIKIPEDIA_REST_URL}/summary/${title}`);
};

export const getImdbLink = async (title) => {
  try {
    const htmlPage = await axios.get(`${WIKIPEDIA_REST_URL}/html/${title}`);
    if (!htmlPage || !htmlPage.data) return null;

    const matches = htmlPage.data.match(/https:\/\/www\.imdb\.com\/title\/\w*/);

    return matches[0];
  } catch {
    return null;
  }
};
