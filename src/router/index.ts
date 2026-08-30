import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from '@/features/auth/stores/auth'
import AppLayout from "@/components/layout/AppLayout.vue";
import LoginView from "@/features/auth/views/LoginView.vue";
import RegisterView from "@/features/auth/views/RegisterView.vue";
import ProfileView from "@/features/auth/views/ProfileView.vue";
import HomeView from "@/features/home/views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: HomeView,
                },
                {
                    path: '/login',
                    name: 'login',
                    component: LoginView,
                    meta: {
                        guestOnly: true
                    }
                },
                {
                    path: '/register',
                    name: 'register',
                    component: RegisterView,
                    meta: {
                        guestOnly: true
                    }
                },
                {
                    path: '/profile',
                    name: 'profile',
                    component: ProfileView,
                    meta: {
                        authRequired: true
                    }
                }
            ]
        },

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