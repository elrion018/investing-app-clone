import Vue from 'vue';
import Router from 'vue-router';
import { Home, Login } from '../views'
Vue.use(Router);

export default () => {
  return new Router({
    mode: 'history',
    base: process.env.publicPath,

    routes: [
      {
        path: '/',
        name: 'Login',
        component: Login,
      },
      {
        path: '/home',
        name: 'Home',
        component: Home,
      },
    ],
  });
};
