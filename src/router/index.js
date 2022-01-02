import {createRouter, createWebHashHistory} from "vue-router";
import { adaptRouter, adaptSidebar } from '@/utils/adaptRouter'
// import cloneDeep from 'lodash/cloneDeep'

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
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            },
            {
                path: "school",
                name: "school",
                meta: {
                    title: '学校管理'
                },
                children: [
                    {
                        path: 'list',
                        name: 'list',
                        meta: {
                            title: '学校列表'
                        },
                        component: () => import ( /* webpackChunkName: "schoolList" */ "../views/school/list/schoolList.vue")
                    },
                    {
                        path: 'add',
                        name: 'add',
                        meta: {
                            title: '添加学校',
                            hidden: true
                        },
                        component: () => import ( /* webpackChunkName: "schoolAdd" */ "../views/school/add/addSchool.vue")
                    }
                ]
            },
            // {
            //     path: "/school/list",
            //     name: "school",
            //     meta: {
            //         title: '学校模块'
            //     },
            //     component: () => import ( /* webpackChunkName: "school" */ "../views/school/list/schoolList.vue")
            // },
            {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表'
                },
                component: () => import ( /* webpackChunkName: "charts" */ "../views/BaseCharts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/BaseForm.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            }, {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '鼓励作者'
                },
                component: () => import ( /* webpackChunkName: "donate" */ "../views/Donate.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import ( /* webpackChunkName: "permission" */ "../views/Permission.vue")
            }, {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '国际化语言'
                },
                component: () => import ( /* webpackChunkName: "i18n" */ "../views/I18n.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件'
                },
                component: () => import ( /* webpackChunkName: "upload" */ "../views/Upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标'
                },
                component: () => import ( /* webpackChunkName: "icon" */ "../views/Icon.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import (/* webpackChunkName: "404" */ '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import (/* webpackChunkName: "403" */ '../views/403.vue')
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/User.vue')
            }, {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/Editor.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
];


// routes = changeRoutes(routes[1].children, [], '', '')
// console.log(changeRoutes(routes[1].children, [], '', ''))
// routes[1].children = changeRoutes(routes[1].children, [], '', '')
// console.log('rou--->', routes)
let vueRouter = adaptRouter(routes)
let slideBar = adaptSidebar(routes)
// console.log('vur--->', vueRouter)

const router = createRouter({
    history: createWebHashHistory(),
    routes: vueRouter
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
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


// function adaptVurRouter(routes) {
//     routes = cloneDeep(routes)
//     routes[1].children = changeRoutes(routes[1].children, [], '', '')
//     return routes
// }

// function changeRoutes(oldRoute, newRoutes, path, name) {
//     for(let i=0;i<oldRoute.length;i++) {
//         if(!oldRoute[i].children) {
//             if(path) oldRoute[i].path = path + `/${oldRoute[i].path}`
//             if(name) oldRoute[i].name = name + `-${oldRoute[i].name}`
//             newRoutes.push(oldRoute[i])
//         }else {
//             changeRoutes(oldRoute[i].children, newRoutes, path + `/${oldRoute[i].path}`, name + `${oldRoute[i].name}`)
//         }
//     }
//     return newRoutes
// }

export { router, slideBar };