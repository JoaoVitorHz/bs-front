import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

function GetToken(){
    if (typeof localStorage !== 'undefined') 
        return localStorage.getItem('userToken');
}

// Intercepta as requisições para adicionar o token
api.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${GetToken()}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
