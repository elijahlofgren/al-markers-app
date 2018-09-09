import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import MarkerMap from '@/components/MarkerMap/MarkerMap';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/map',
      name: 'MarkerMap',
      component: MarkerMap,
      props: true
    },
  ],
});
