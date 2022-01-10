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

export const getSchoolInfo = id => {
    return request({
        url: `/school/${id}`,
        method: 'get'
    })
}

export const getMajorList = query => {
    return request({
        url: '/major',
        method: 'get',
        params: query
    })
} 