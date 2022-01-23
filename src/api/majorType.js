import request from '../utils/request';

export const addMajorType = data => {
    return request({
        url: '/majortype/create',
        method: 'post',
        data
    })
}


export const getMajorTypeList = query => {
    return request({
        url: '/majortype/list',
        method: 'get',
        params: query
    })
}

export const deleteMajorType = id => {
    return request({
        url: '/majortype/delete',
        method: 'post',
        data: { id }
    })
}

