import request from '../utils/request'

// 修改密码
export const updatePassword = data => {
    return request({
        url: '/user/update/password',
        method: 'post',
        data
    })
}