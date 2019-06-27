export default {
    path: '/mine',
    component: () => import('@/views/mine'),
    children: [
        {
            path: 'center',
            component: () => import('@/views/mine/center.vue')
        },
        {
            path: 'login',
            component: () => import('@/components/login')
        },
        {
            path: 'register',
            component: () => import('@/components/Register')
        },
        {
            path: 'findPassword',
            component: () => import('@/components/FindPassword')
        },
        {
            path: '/mine',
            redirect: 'center'
        }
    ]
}