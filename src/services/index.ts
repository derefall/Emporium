import axios from "axios";

console.log('variavel de ambiente 2', process.env.REACT_APP_AUTH_HOST)

const api = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
});

const apiAuth = axios.create({
    baseURL: process.env.REACT_APP_AUTH_HOST,
});

export { api, apiAuth };