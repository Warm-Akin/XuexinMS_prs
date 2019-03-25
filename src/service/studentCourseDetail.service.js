import { getStuCourseDetailPage, saveStudentCourseScoreDetail } from '@/repository/studentCourseDetail.repository';

async function getStudentCourseDetailPage (params) {
  const data = await getStuCourseDetailPage(params);
  return data || [];
}

async function saveCourseScoreDetail (params) {
  const data = await saveStudentCourseScoreDetail(params);
  return data || [];
}

export {
  getStudentCourseDetailPage,
  saveCourseScoreDetail
};
