import cloneDeep from 'lodash/cloneDeep'

function adaptRouter(routes) {
    routes = cloneDeep(routes)
    routes[1].children = changeRoutes(routes[1].children, [], '', '')
    return routes
}

function adaptSidebar(routes) {
    let arr = cloneDeep(routes[1].children)

    return changeSlidebar(arr, '')
}

function changeSlidebar(routes, path) {
    for(let i=0;i<routes.length;i++) {
        if(!routes[i].children) {
            if(routes[i].meta.hidden){
                routes.splice(i, 1)
            }else {
                if(path) routes[i].path = path + `/${routes[i].path}`
                // routes[i].path = path ? path + `/${routes[i].path}` : path
            }
        }else {
            changeSlidebar(routes[i].children, path + `/${routes[i].path}`)
        }
        
    }
    return routes
}

function changeRoutes(oldRoute, newRoutes, path, name) {
    for(let i=0;i<oldRoute.length;i++) {
        if(!oldRoute[i].children) {
            if(path) oldRoute[i].path = path + `/${oldRoute[i].path}`
            if(name) oldRoute[i].name = name + `-${oldRoute[i].name}`
            newRoutes.push(oldRoute[i])
        }else {
            changeRoutes(oldRoute[i].children, newRoutes, path + `/${oldRoute[i].path}`, name + `${oldRoute[i].name}`)
        }
    }
    return newRoutes
}

export { adaptRouter, adaptSidebar }
