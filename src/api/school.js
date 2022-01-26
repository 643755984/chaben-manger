import request from '../utils/request'

export const addSchool = data => {
    return request({
        url: '/school/create',
        method: 'post',
        data
    })
}

// 获取院校列表
export const getSchoolList = query => {
    return request({
        url: '/school/list',
        method: 'get',
        params: query
    })
}

// 修改院校
export const updateSchool = data => {
    return request({
        url: '/school/edit',
        method: 'post',
        data
    })
}

// 删除院校
export const deleteSchool = id => {
    return request({
        url: `/school/delete`,
        method: 'post',
        data: { schoolId: id}
    })
}

export const getSchoolInfo = id => {
    return request({
        url: '/school/detail',
        method: 'get',
        params: { id }
    })
}

export const addMajorOnSchool = data => {
    return request({
        url: '/schoolmajor/create',
        method: 'post',
        data
    })
}

export const getSchoolMajorList = query => {
    return request({
        url: '/schoolmajor/list',
        method: 'get',
        params: query
    })
}

// 删除院校专业
export const deleteSchoolMajor = id => {
    return request({
        url: '/schoolmajor/delete',
        method: 'post',
        data: { id }
    })
}

// 院校专业添加分数
export const addGrade = data => {
    return request({
        url: '/grade/create',
        method: 'post',
        data
    })
}

// 获取院校分数列表
export const getGradeList = query => {
    return request({
        url: '/grade/list',
        method: 'get',
        params: query
    })
}

// 获取院校分数
export const getGradeByOne = id => {
    return request({
        url: '/grade/detail',
        method: 'get',
        params: { id }
    })
}

// 更新院校分数
export const updateGrade = data => {
    return request({
        url: '/grade/edit',
        method: 'post',
        data
    })
}

// 发布公告
export const addNotice = data => {
    return request({
        url: '/notice/create',
        method: 'post',
        data
    })
}

// 获取公告列表
export const getNoticeList = query => {
    return request({
        url: '/notice/list',
        method: 'get',
        params: query
    })
}