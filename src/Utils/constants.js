// TMDB API Configuration
// Rename this file to 'constants.js' and add your actual API credentials

// OpenAI API Key for GPT-based movie search
export const GPT_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// TMDB API options for fetch requests
// This object is used for all TMDB API calls
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
  }
};

export default options;

