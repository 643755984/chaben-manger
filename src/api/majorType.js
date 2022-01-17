import request from '../utils/request';

export const addMajorType = data => {
    return request({
        url: '/majortype',
        method: 'post',
        data
    })
}


export const getMajorTypeList = query => {
    return request({
        url: '/majortype',
        method: 'get',
        params: query
    })
}

export const deleteMajorType = id => {
    return request({
        url: `/majortype/${id}`,
        method: 'delete'
    })
}

