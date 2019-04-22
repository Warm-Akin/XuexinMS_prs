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
import page404 from '@/pages/404'
import CompanyMaintenance from '@/pages/CompanyMaintenance'
import ResumeMaintenance from '@/pages/ResumeMaintenance'
import AdminPassword from '@/pages/AdminPassword'
import ResumeTemplateMaintenance from '@/pages/ResumeTemplateMaintenance'
import StudentPassword from '@/pages/StudentPassword'
import PaymentSuccess from '@/pages/PaymentSuccess'
import OrganizationMaintenance from '@/pages/OrganizationMaintenance'
import ResumePdfMaintenance from '@/pages/ResumePdfMaintenance'

Vue.use(Router)

const routes = [
  {
    path: '/error',
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
    path: '/studentPassword',
    name: 'StudentPassword',
    component: StudentPassword
  },
  {
    path: '/studentCourseScoreDetail',
    name: 'StudentCourseScoreDetail',
    component: StudentCourseScoreDetail
  },
  {
    path: '/404',
    name: 'page404',
    component: page404
  },
  {
    path: '/companyMaintenance',
    name: 'CompanyMaintenance',
    component: CompanyMaintenance
  },
  {
    path: '/resumeMaintenance',
    name: 'ResumeMaintenance',
    component: ResumeMaintenance
  },
  {
    path: '/resetPassword',
    name: 'AdminPassword',
    component: AdminPassword
  },
  {
    path: '/resumeTemplateMaintenance',
    name: 'ResumeTemplateMaintenance',
    component: ResumeTemplateMaintenance
  },
  {
    path: '/paymentSuccess',
    name: 'PaymentSuccess',
    component: PaymentSuccess
  },
  {
    path: '/organizationMaintenance',
    name: 'OrganizationMaintenance',
    component: OrganizationMaintenance
  },
  {
    path: '/resumePdfMaintenance',
    name: 'ResumePdfMaintenance',
    component: ResumePdfMaintenance
  }
];

const router = new Router({mode: 'history', routes}); // Remove # before url

router.beforeEach((to, from, next) => {
  // will redirect to login page with wrong URL
  if (to.matched.length === 0) { // No match to routing
    from.name ? next({ name: from.name }) : next('/login');
  } else {
    next();
  }
});

// const router = new Router({ routes });

export default router;
