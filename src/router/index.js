import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/Login'
import StudentMaintenance from '@/pages/StudentMaintenance'
import TeacherMaintenance from '@/pages/TeacherMaintenance'
import CourseMaintenance from '@/pages/CourseMaintenance'
import Menu from '@/components/ResumeMenu'
import PersonalMaintenance from '@/pages/PersonalMaintenance'
import ResumeStepOne from '@/pages/ResumeStepOne'
import ResumeStepTwo from '@/pages/ResumeStepTwo'
import ResumeStepThree from '@/pages/ResumeStepThree'

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
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/personal',
    name: 'PersonalMaintenance',
    component: PersonalMaintenance
  },
  {
    path: '/resumeStepOne',
    name: 'ResumeStepOne',
    component: ResumeStepOne
  },
  {
    path: '/resumeStepTwo',
    name: 'ResumeStepTwo',
    component: ResumeStepTwo
  },
  {
    path: '/resumeStepThree',
    name: 'ResumeStepThree',
    component: ResumeStepThree
  }

];

const router = new Router({ routes });

export default router;
