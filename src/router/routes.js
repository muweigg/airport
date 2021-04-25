import Home from '@/views/Home';
import T2 from '@/views/T2';
import T3 from '@/views/T3';

export default [
  {
    path: '',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
    component: Home
  },
  {
    path: '/t2',
    name: 'T2',
    // component: () => import(/* webpackChunkName: "T2" */ '../views/T2.vue')
    component: T2
  },
  {
    path: '/t3',
    name: 'T3',
    // component: () => import(/* webpackChunkName: "T2" */ '../views/T2.vue')
    component: T3
  },
]