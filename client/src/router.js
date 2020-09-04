import Vue from 'vue';
import Router from 'vue-router';


import TodoComponent from './components/TodoComponent.vue';
import AuthComponent from './components/AuthComponent.vue';


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/main',
      name: 'main',
      component: TodoComponent,
    },
    {
      path: '/registration',
      name: 'registration',
      component:() => AuthComponent,
      props: true,
    }
  ]
})

export default router;
