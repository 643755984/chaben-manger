import request from '../utils/request'

export const addSchool = data => {
    return request({
        url: '/school',
        method: 'post',
        data
    })
}

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

export const addMajorOnSchool = data => {
    return request({
        url: '/schoolmajor',
        method: 'post',
        data
    })
}

export const getSchoolMajorList = query => {
    return request({
        url: '/schoolmajor',
        method: 'get',
        params: query
    })
}

export const deleteSchoolMajor = id => {
    return request({
        url: `/schoolmajor/${id}`,
        method: 'delete'
    })
}