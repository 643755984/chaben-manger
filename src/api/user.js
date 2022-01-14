import request from '../utils/request'

// 修改密码
export const updatePassword = data => {
    return request({
        url: '/update/password',
        method: 'post',
        data
    })
}