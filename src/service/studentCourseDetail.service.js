import { getStuCourseDetailPage, saveStudentCourseScoreDetail, queryStudentCourseScoreDetail, getAllStuCourseDetail, removeStudentCourseDetailList } from '@/repository/studentCourseDetail.repository';

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

async function removeStudentCourseDetails (params) {
  const data = await removeStudentCourseDetailList(params);
  return data || [];
}

export {
  getStudentCourseDetailPage,
  saveCourseScoreDetail,
  queryForDetailList,
  getAllActiveDetails,
  removeStudentCourseDetails
};
