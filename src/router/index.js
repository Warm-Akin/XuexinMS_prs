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
import CompanyRegister from '@/pages/CompanyRegister'
import Payment from '@/pages/Payment'
import CompanyBasic from '@/pages/CompanyBasic'
import ShowResume from '@/pages/ShowResume'
import CompanyPayment from '@/pages/CompanyPayment'
import CompanyPassword from '@/pages/CompanyPassword'
import StudentCourseScoreDetail from '@/pages/StudentCourseScoreDetail'

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
  },
  {
    path: '/register',
    name: 'Register',
    component: CompanyRegister
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  },
  {
    path: '/companyBasic',
    name: 'CompanyBasic',
    component: CompanyBasic
  },
  {
    path: '/showResume',
    name: 'ShowResume',
    component: ShowResume
  },
  {
    path: '/companyPayment',
    name: 'CompanyPayment',
    component: CompanyPayment
  },
  {
    path: '/companyPassword',
    name: 'CompanyPassword',
    component: CompanyPassword
  },
  {
    path: '/studentCourseScoreDetail',
    name: 'StudentCourseScoreDetail',
    component: StudentCourseScoreDetail
  }
];

const router = new Router({ routes });

export default router;
