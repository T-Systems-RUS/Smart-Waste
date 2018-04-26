import Vue from 'vue';
import Router from 'vue-router';
import DeviceGroups from '../components/root/DeviceGroups.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: DeviceGroups
    }
  ]
});
