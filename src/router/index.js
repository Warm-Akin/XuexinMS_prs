import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/Login'
import TestPage from '@/pages/TestPage'
import StudentMaintenance from '@/pages/StudentMaintenance'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // {
  //   path: '/testPage',
  //   name: 'TestPage',
  //   component: TestPage
  // },
  {
    path: '/studentMaintenance',
    name: 'StudentMaintenance',
    component: StudentMaintenance
  }
];

const router = new Router({ routes });

export default router;
