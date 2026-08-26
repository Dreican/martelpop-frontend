import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from '@/features/auth/stores/auth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/features/home/views/Home.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/features/auth/views/LoginView.vue'),
            meta: {
                guestOnly: true
            }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/features/auth/views/RegisterView.vue'),
            meta: {
                guestOnly: true
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('@/features/auth/views/ProfileView.vue'),
            meta: {
                authRequired: true
            }
        }
    ]
})

router.beforeEach((to) => {
    const auth = useAuthStore()
    if (to.meta.authRequired && !auth.isAuthenticated) {
        return {
            name: 'login',
            query: { redirect: to.fullPath }
        }
    }

    if (to.meta.guestOnly && auth.isAuthenticated) {
        return { name: 'home' }
    }

})

export default router