import axios from 'axios';

const quranApi = axios.create({
  baseURL: 'https://equran.id/api/v2',
  timeout: 10000,
});

export default quranApi;