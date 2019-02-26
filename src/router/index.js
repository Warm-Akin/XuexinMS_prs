import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/Login'
import StudentMaintenance from '@/pages/StudentMaintenance'
import TeacherMaintenance from '@/pages/TeacherMaintenance'
import CourseMaintenance from '@/pages/CourseMaintenance'

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
  {
    path: '/studentMaintenance',
    name: 'StudentMaintenance',
    component: StudentMaintenance
  },
  {
    path: '/teacherMaintenance',
    name: 'TeacherMaintenance',
    component: TeacherMaintenance
  },
  {
    path: '/courseMaintenance',
    name: 'CourseMaintenance',
    component: CourseMaintenance
  }
];

const router = new Router({ routes });

export default router;
