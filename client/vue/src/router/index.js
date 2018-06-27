/* 分块定义异步组件 使用 AMD 风格的 require
 * const Home = resolve => require(['./pages/Home.vue'], resolve)
 *
 * 定义路由
 * const routes = [
 *     { path: '/', component: resolve => require(['./pages/Home.vue'], resolve) }
 * ]
 */

// 页面路径(相对 ./pages)
let config = [
    '/home/index',                    // 首页

    '/demo/index',                    // demo首页
    '/demo/todo',                     // todo

    '/login/index',                   // 登录
]

let config1 = [
    '/article/index',                  // 文章管理
    '/picture/index',                  // 图片管理
    '/classify/index',                 // 分类管理
    '/video/index',                    // 视频管理
    '/user/index',                     // 管理员列表
]

// 定义路由
const routes = [], home_routes = [], user_routes = [];

// 解析路由配置，添加进routes
config.forEach((value, index, arr) => {
    routes.push({
        path: value.replace(/(\/index|home\/index)$/g, ''),
        component: resolve => require(
            [ '../pages' + value.replace(/\/(\:|\?)[A-z]+$/g, '') + '.vue' ],
            resolve
        )
    })
})

// 解析官网页面路由配置，添加进routes
config1.forEach((value, index, arr) => {
    user_routes.push({
        path: value.replace(/(\/index|home\/index)$/g, ''),
        component: resolve => require(
            [ '../pages' + value.replace(/\/(\:|\?)[A-z]+$/g, '') + '.vue' ],
            resolve
        )
    })
})

// 后台管理相关路由
routes.push({
    path: '/',
    component: resolve => require(
        ['../components/LayoutLoggedIn.vue'],
        resolve
    ),
    children: user_routes
})

// 404 页面
routes.push({
    path: '*',
    component: resolve => require(['../pages/404.vue'], resolve)
})

export default routes
