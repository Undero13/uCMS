import { createRouter, createWebHistory, Router } from "vue-router";
import CookieService from "@/services/CookieService/CookieService.service";
import Home from "@/views/Home/Home.view.vue";
import Login from "@/views/Login/Login.view.vue";
import OperatorList from "@/views/OperatorList/OperatorList.view.vue";
import OperatorAccount from "@/views/OperatorAccount/OperatorAccount.view.vue";

const routes = [
  {
    path: "/",
    component: Home,
    name: "home",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    component: Login,
    name: "login",
  },
  {
    path: "/operator-list",
    query: {
      limit: 10,
      skip: 0,
    },
    component: OperatorList,
    name: "operatorList",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/operator-account",
    component: OperatorAccount,
    name: "OperatorAccount",
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
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (CookieService.isLogged()) {
      next();
    } else {
      next({ path: "/login" });
    }
  }
  next();
});

export default router;
