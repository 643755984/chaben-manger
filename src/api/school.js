import request from '../utils/request';

export const addSchool = data => {
    return request({
        url: '/school',
        method: 'post',
        data
    });
};

export const schoolList = query => {
    return request({
        url: '/school',
        method: 'get',
        params: query
    })
}

export const schoolDetail = id => {
    return request({
        url: `/school/${id}`,
        method: 'get'
    })
}