import axios from 'axios'
import { ElMessage } from "element-plus"

const service = axios.create({
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
        if(response.status === 200) {
            if(response.data.code !== 200) ElMessage.error(response.data.data)
            return response.data
        }
        Promise.reject()
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
