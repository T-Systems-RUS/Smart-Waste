import Vue from 'vue';
import Router from 'vue-router';
import DeviceGroups from '../components/root/DeviceGroups.vue';
import Login from '../components/root/Login.vue';
import store from '../store';
import {CHECK_AUTH} from '../store/modules/auth/action-types';

Vue.use(Router);

export enum OpenRoutes {
  Login = 'Login'
}

export enum ProtectedRoutes {
  DeviceGroups = 'DeviceGroups'
}

export const router = new Router({
  routes: [
    {
      path: '/login',
      name: OpenRoutes.Login,
      component: Login,
      beforeEnter(_to, _from, next) {
        store.dispatch(CHECK_AUTH)
          .then(authenticated => {
            if (authenticated) {
              next({name: ProtectedRoutes.DeviceGroups});
            } else {
              next();
            }
          });
      }
    },
    {
      path: '/device-groups',
      name: ProtectedRoutes.DeviceGroups,
      component: DeviceGroups,
      beforeEnter(_to, _from, next) {
        store.dispatch(CHECK_AUTH)
          .then(authenticated => {
            if (authenticated) {
              next();
            } else {
              next({name: OpenRoutes.Login});
            }
          });
      }
    }
  ]
});
