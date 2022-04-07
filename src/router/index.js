import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import setupView from "../views/OwnerSetupView.vue"
import ownerlogin from "../views/ownerSignIn.vue"
import userlogin from "../views/userSignIn.vue"
import uerSignUp from "../views/uerSignUp.vue"
import owner from "../views/OwnerView.vue"
import mypage from "../views/MyPageView.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/ownersignin",
    name: "ownersignin",
    component: ownerlogin,
  },
  {
    path: "/usersignin",
    name: "usersignin",
    component: userlogin,
  },
  {
    path: "/setup",
    name: "setup",
    component: setupView,
  },
  {
    path: "/userSignUp",
    name: "usersignup",
    component: uerSignUp,
  },
  {
    path: "/owner",
    name: "owner",
    component: owner,
  },
  {
    path: "/mypage",
    name: "mapage",
    component: mypage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
