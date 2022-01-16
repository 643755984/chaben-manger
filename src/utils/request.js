import axios from 'axios';

const service = axios.create({
    // baseURL: import.meta.env.VITE_BASE_API + import.meta.env.VITE_BASE_URL,
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000
});


service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
