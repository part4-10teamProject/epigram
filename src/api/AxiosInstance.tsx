import axios from 'axios';

const BASE_URL = 'https://fe-project-epigram-api.vercel.app/6-10';

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
