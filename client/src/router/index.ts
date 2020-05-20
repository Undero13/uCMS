import {createRouter, createWebHistory, Router} from 'vue-router';
import { AuthService } from '../services/AuthService'
import Home from "../views/Home.view.vue";
import Login from "../views/Login.view.vue";

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
];

export const router: Router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (AuthService.isLogged()) {
      next();
    } else {
      next({ path: '/login' });
    }
  }
  next();
})

