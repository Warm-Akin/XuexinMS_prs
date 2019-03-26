import { getStuCourseDetailPage, saveStudentCourseScoreDetail, queryStudentCourseScoreDetail, getAllStuCourseDetail } from '@/repository/studentCourseDetail.repository';

async function getStudentCourseDetailPage (params) {
  const data = await getStuCourseDetailPage(params);
  return data || [];
}

async function saveCourseScoreDetail (params) {
  const data = await saveStudentCourseScoreDetail(params);
  return data || [];
}

async function queryForDetailList (params) {
  const data = await queryStudentCourseScoreDetail(params);
  return data || [];
}

async function getAllActiveDetails () {
  const data = await getAllStuCourseDetail();
  return data || [];
}

export {
  getStudentCourseDetailPage,
  saveCourseScoreDetail,
  queryForDetailList,
  getAllActiveDetails
};
