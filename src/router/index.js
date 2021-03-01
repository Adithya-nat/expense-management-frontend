import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Analytics.vue")
      // children: [
      //   // Note we provide the above parent route name on the default child tab
      //   // route to ensure this tab is rendered by default when using named routes
      //   { path: 'monthly', component: Monthly, name: 'monthly' }
      // ]
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signup.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  // {
  //   path: "/home/:id",
  //   name: "HomePage",
  //   beforeEnter: beforeLogin(),
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/HomePage.vue")
  // },
  {
    path: "/home",
    name: "HomePage",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes: routes
});

export default router;
