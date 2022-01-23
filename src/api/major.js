import request from '../utils/request';

export const addMajor = data => {
    return request({
        url: '/major/create',
        method: 'post',
        data
    })
}

export const getMajorList = query => {
    return request({
        url: '/major/list',
        method: 'get',
        params: query
    })
}

export const deleteMajor = id => {
    return request({
        url: '/major/delete',
        method: 'post',
        data: { id }
    })
}

export const getMajorTypeList = query => {
    return request({
        url: '/majortype/list',
        method: 'get',
        params: query
    })
}