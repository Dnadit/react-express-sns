import axios from 'axios';

let url = '';
if (process.env.NODE_ENV === 'production') {
    url = 'http://localhost:80';
} else {
    url = 'http://localhost:8080';
};

const api = axios.create({
    baseURL: url
});

export default api;