import { get, post } from '@/utils/httpHelper';

  async function getAllTeacherInfo () {
    const url = `/xuexin/admin/teacher/findAll`;
    const body = await get(url);
    return body.data;
  }

  async function getPageTeacherInfo (params) {
    const url = `/xuexin/admin/teacher/findAll/${params.currentPage}/${params.pageSize}`;
    const body = await get(url);
    return body.data;
  }

// async function saveStudent (params) {
//   const url = `/xuexin/student/save`;
//   const body = await post(url, params);
//   return body.data;
// }
//
// async function getAllActiveStudents () {
//   const url = `/xuexin/student/findAll`;
//   const body = await get(url);
//   return body.data;
// }
//
async function getTeachersByConditions (params) {
  const url = `/xuexin/admin/teacher/findByConditions`;
  const body = await post(url, params);
  return body.data;
}

export {
  getAllTeacherInfo,
  getPageTeacherInfo,
  getTeachersByConditions
};
