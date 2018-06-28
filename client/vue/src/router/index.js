/* 分块定义异步组件 使用 AMD 风格的 require
 * const Home = resolve => require(['./pages/Home.vue'], resolve)
 *
 * 定义路由(相对 ./pages)
 * 
 * const routes = [
 *     { path: '/', component: resolve => require(['./pages/Home.vue'], resolve) }
 * ]
 */

// 官网相关路由
let home_config = [
    '/home/index',                    // 首页
    '/demo/index',                    // demo首页
    '/demo/todo',                     // todo
    '/component/index',               // 组件
    '/about/index',                   // 关于我
]

// 登录、注册
let config = [
    '/login/index',                   // 登录
    '/register/index',                // 注册
]

// 管理后台相关路由
let manage_config = [
    '/article/index',                 // 文章管理
    '/picture/index',                 // 图片管理
    '/classify/index',                // 分类管理
    '/video/index',                   // 视频管理
    '/user/index',                    // 管理员列表
]

// 定义路由
const relativePath = '';
const routes = [
    ...parseRoutes(config),
    {
        path: '/',
        component: resolve => require(
            ['../components/LayoutHome.vue'],
            resolve
        ),
        children: parseRoutes(home_config)
    },{
        path: '/',
        component: resolve => require(
            ['../components/LayoutManage.vue'],
            resolve
        ),
        children: parseRoutes(manage_config)
    },{
        path: '*',
        component: resolve => require(['../pages/404.vue'], resolve)
    }
]

// 工厂函数：解析路由配置，返回routes数组
function parseRoutes(config) {
    return [
        ...config.map((value, index) => {
            let array = value.split(',')
            const fileName = array[0].replace(/\/(\:|\?)[A-z]+$/g, '')

            return {
                path: relativePath + array[0].replace(/(\/index|home\/index)$/g, ''),
                component: resolve => require([`../pages${fileName}.vue`], resolve)
            }
        })
    ]
}

export default routes