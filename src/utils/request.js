import axios from 'axios'
import { ElMessage } from "element-plus"

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        let token = JSON.parse(localStorage.getItem('token'))
        if(token !== null) {
            config.headers['authorization'] = `${token}`
        }
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
        const { response } = error
        if(response) {
            // 请求以发出，但不在2xx以内
            errorHandle(response.status, response.data)
        }
    }
);

const errorHandle = (status, other) => {
    switch (status) {
        case 401:
            ElMessage.error('请重新登录')   
            router.push({name: 'Login'})
            break
        case 404:
            ElMessage.error('请求资源不存在')
            break
        default:
            ElMessage.error(other.data)
    }
}

export default service;
