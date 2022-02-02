import {createRouter, createWebHashHistory} from "vue-router"
import { adaptRouter, adaptSidebar } from '@/utils/adaptRouter'

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: "/",
        name: "Home",
        component: () => import ( /* webpackChunkName: "home" */ "../views/Home.vue"),
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页',
                    icon: 'HomeFilled'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/dashborad/Dashboard.vue")
            },
            {
                path: "school",
                name: "school",
                meta: {
                    title: '院校管理',
                    icon: 'School'
                },
                children: [
                    {
                        path: 'list',
                        name: 'schoolList',
                        meta: {
                            title: '院校管理'
                        },
                        component: () => import ( /* webpackChunkName: "schoolList" */ "../views/school/list/schoolList.vue")
                    },
                    {
                        path: 'add',
                        name: 'schoolAdd',
                        meta: {
                            title: '添加院校',
                            hidden: true
                        },
                        component: () => import ( /* webpackChunkName: "schoolAdd" */ "../views/school/add/addSchool.vue")
                    },
                    {
                        path: 'edit/:schoolId',
                        name: 'schoolEdit',
                        meta: {
                            title: '编辑院校',
                            hidden: true
                        },
                        component: () => import ( /* webpackChunkName: "schoolAdd" */ "../views/school/add/addSchool.vue")
                    },
                    {
                        path: 'detail/:schoolId',
                        name: 'schoolDetail',
                        meta: {
                            title: '院校详情',
                            hidden: true
                        },
                        component: () => import ( /* webpackChunkName: "schoolDetail" */ "../views/school/detail/schoolDetail.vue")
                    },
                    {
                        path: 'grade',
                        name: 'schoolGrade',
                        meta: {
                            title: '院校分数',
                            hidden: true
                        },
                        component: () => import ( /* webpackChunkName: "schoolDetail" */ "../views/school/grade/schoolGrade.vue")
                    }
                ]
            },
            {
                path: "major",
                name: "major",
                meta: {
                    title: '专业管理',
                    icon: 'Document'
                },
                children: [
                    {
                        path: 'list',
                        name: 'majorList',
                        meta: {
                            title: '专业管理'
                        },
                        component: () => import ( /* webpackChunkName: "schoolList" */ "../views/major/list/majorList.vue")
                    },
                    {
                        path: 'type',
                        name: 'majorType',
                        meta: {
                            title: '专业类型管理'
                        },
                        component: () => import ( /* webpackChunkName: "schoolList" */ "../views/major/type/majorType.vue")
                    }
                ]
            },
            // {
            //     path: "/charts",
            //     name: "basecharts",
            //     meta: {
            //         title: '图表'
            //     },
            //     component: () => import ( /* webpackChunkName: "charts" */ "../views/BaseCharts.vue")
            // },{
            //     path: "/permission",
            //     name: "permission",
            //     meta: {
            //         title: '权限管理',
            //         permission: true
            //     },
            //     component: () => import ( /* webpackChunkName: "permission" */ "../views/Permission.vue")
            // }, {
            //     path: '/404',
            //     name: '404',
            //     meta: {
            //         title: '找不到页面'
            //     },
            //     component: () => import (/* webpackChunkName: "404" */ '../views/404.vue')
            // }, {
            //     path: '/403',
            //     name: '403',
            //     meta: {
            //         title: '没有权限'
            //     },
            //     component: () => import (/* webpackChunkName: "403" */ '../views/403.vue')
            // }, 
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心',
                    hidden: true
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/user/User.vue')
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    },
    {
        path: "/test",
        name: "Test",
        meta: {
            title: 'test'
        },
        component: () => import ( /* webpackChunkName: "test" */ "../views/test.vue")
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        meta: {
            title: '找不到页面'
        },
        component: () => import (/* webpackChunkName: "404" */ '../views/404.vue')
    },
];



let vueRouter = adaptRouter(routes)
let slideBar = adaptSidebar(routes)

const router = createRouter({
    history: createWebHashHistory(),
    routes: vueRouter
})

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('userInfo');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});


export { 
    router, 
    slideBar
}
