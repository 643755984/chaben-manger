import request from '../utils/request';

export const addMajor = data => {
    return request({
        url: '/major',
        method: 'post',
        data
    })
}


export const majorList = query => {
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

