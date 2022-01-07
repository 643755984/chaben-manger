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
        url: '/school/list',
        method: 'get',
        params: query
    })
}
