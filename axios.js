import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost/api', // Remplacez cette URL par celle de ton API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;