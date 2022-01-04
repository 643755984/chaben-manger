import request from '../utils/request';

export const addSchool = data => {
    return request({
        url: '/school',
        method: 'post',
        data
    });
};
