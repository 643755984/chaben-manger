import request from '../utils/request'

export const userLogin = data => {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}