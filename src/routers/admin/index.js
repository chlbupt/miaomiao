export default {
    path: '/admin',
    component: () => import('@/views/admin'),
    children: [
        {
            path: 'users',
            component: () => import('@/views/admin/users')
        },
        {
            path: 'movie',
            component: () => import('@/views/admin/movie')
        },
        {
            path: 'cinema',
            component: () => import('@/views/admin/cinema')
        },
        {
            path: '/admin',
            redirect: 'users'
        }
    ]
}