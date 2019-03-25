import { get, post } from '@/utils/httpHelper';

async function getStuCourseDetailPage (params) {
  const url = `/xuexin/admin/studentCourseDetail/findAll/${params.currentPage}/${params.pageSize}`;
  const body = await get(url);
  return body.data;
}

async function saveStudentCourseScoreDetail (params) {
  const url = `/xuexin/admin/studentCourseDetail/save`;
  const body = await post(url, params);
  return body.data;
}

export {
  getStuCourseDetailPage,
  saveStudentCourseScoreDetail
}
