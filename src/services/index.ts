import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
});

const apiAuth = axios.create({
    baseURL: process.env.REACT_APP_AUTH_HOST,
});

const apiBucket = axios.create({
    baseURL: '',
});

export { api, apiAuth, apiBucket };