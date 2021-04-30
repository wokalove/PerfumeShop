import axios from 'axios';

const instance = axios.create({
    baseURL: '',
    timeout: 10000,

    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token') ?? '{}')?.token
        }`,
    },
});

export default instance;
