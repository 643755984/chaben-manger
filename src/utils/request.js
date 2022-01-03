import axios from 'axios';

const baseService = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:7001' : ''
const baseUrl = process.env.NODE_ENV === 'development' ? '/api/v1' : '/api/v1'

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    baseURL: baseService + baseUrl,
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
