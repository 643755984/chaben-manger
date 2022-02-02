import request from '../utils/request';

export const uploadFile = formData => {
    return request({
        url: '/common/upload',
        method: 'post',
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    })
}


export const uploadImgInBase64 = formData => {
    return request({
        url: '/common/upload/base64',
        method: 'post',
        data: formData,
        // headers: { "Content-Type": "multipart/form-data" },
    })
}