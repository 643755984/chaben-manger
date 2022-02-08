import request from '../utils/request'

// 修改密码
export const updatePassword = data => {
    return request({
        url: '/user/update/password',
        method: 'post',
        data
    })
}

export const getUserInfo = () => {
    return request({
        url: '/user/info',
        method: 'get'
    })
}