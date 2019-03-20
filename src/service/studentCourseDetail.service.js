import { getStuCourseDetailPage } from '@/repository/studentCourseDetail.repository';

async function getStudentCourseDetailPage (params) {
  const data = await getStuCourseDetailPage(params);
  return data || [];
}

export {
  getStudentCourseDetailPage
};
