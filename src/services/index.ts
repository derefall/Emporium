import axios from "axios";

console.log('variavel de ambiente', process.env.REACT_APP_API_HOST)

const api = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
});

export default api;