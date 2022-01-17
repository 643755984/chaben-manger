import request from '../utils/request';

export const addMajor = data => {
    return request({
        url: '/major',
        method: 'post',
        data
    })
}


export const getMajorList = query => {
    return request({
        url: '/major',
        method: 'get',
        params: query
    })
}

export const deleteMajor = id => {
    return request({
        url: `/major/${id}`,
        method: 'delete'
    })
}

export const getMajorTypeList = query => {
    return request({
        url: '/majortype',
        method: 'get',
        params: query
    })
}