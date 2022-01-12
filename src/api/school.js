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

// 删除院校专业
export const deleteSchoolMajor = id => {
    return request({
        url: `/schoolmajor/${id}`,
        method: 'delete'
    })
}

// 院校专业添加分数
export const addGrade = data => {
    return request({
        url: '/schoolgrade',
        method: 'post',
        data
    })
}

// 获取院校分数列表
export const getGradeList = query => {
    return request({
        url: '/schoolgrade',
        method: 'get',
        params: query
    })
}