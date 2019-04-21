import { get, post } from '@/utils/httpHelper';

async function getStuCourseDetailPage (params) {
  const url = `/xuexin/security/admin/studentCourseDetail/findAll/${params.currentPage}/${params.pageSize}`;
  const body = await get(url);
  return body.data;
}

async function saveStudentCourseScoreDetail (params) {
  const url = `/xuexin/security/admin/studentCourseDetail/save`;
  const body = await post(url, params);
  return body.data;
}

async function queryStudentCourseScoreDetail (params) {
  const url = `/xuexin/security/admin/studentCourseDetail/findByConditions`;
  const body = await post(url, params);
  return body.data;
}

async function getAllStuCourseDetail () {
  const url = `/xuexin/security/admin/studentCourseDetail/findAll`;
  const body = await get(url);
  return body.data;
}

async function removeStudentCourseDetailList (params) {
  const url = `/xuexin/security/admin/studentCourseDetail/removeDetails`;
  const body = await post(url, params);
  return body.data;
}

export {
  getStuCourseDetailPage,
  saveStudentCourseScoreDetail,
  queryStudentCourseScoreDetail,
  getAllStuCourseDetail,
  removeStudentCourseDetailList
}
