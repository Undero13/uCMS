import { createRouter, createWebHistory, Router } from 'vue-router';
import CookieService from '@/services/CookieService/CookieService.service';
import Home from "@/views/Home/Home.view.vue";
import Login from "@/views/Login/Login.view.vue";
import OperatorList from "@/views/OperatorList/OperatorList.view.vue";

const routes = [
    {
      path: '/',
      component: Home,
      name: 'home',
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      component: Login,
      name: 'login',
    },
    {
      path: '/operator-list',
      component: OperatorList,
      name: 'operatorList',
      meta: {
        requiresAuth: true,
      },
    },
];

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (CookieService.isLogged()) {
      next();
    } else {
      next({ path: '/login' });
    }
  }
  next();
});

export default router;
