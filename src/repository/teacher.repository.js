import { get, post } from '@/utils/httpHelper';

  async function getAllTeacherInfo () {
    const url = `/xuexin/security/admin/teacher/findAll`;
    const body = await get(url);
    return body.data;
  }

  async function getPageTeacherInfo (params) {
    const url = `/xuexin/security/admin/teacher/findAll/${params.currentPage}/${params.pageSize}`;
    const body = await get(url);
    return body.data;
  }

async function insertTeacherInfo (params) {
  const url = `/xuexin/security/admin/teacher/save`;
  const body = await post(url, params);
  return body.data;
}
//
// async function getAllActiveStudents () {
//   const url = `/xuexin/security/student/findAll`;
//   const body = await get(url);
//   return body.data;
// }
//
async function getTeachersByConditions (params) {
  const url = `/xuexin/security/admin/teacher/findByConditions`;
  const body = await post(url, params);
  return body.data;
}

async function removeTeacherList (params) {
  const url = `/xuexin/security/admin/teacher/removeTeachers`;
  const body = await post(url, params);
  return body.data;
}

export {
  getAllTeacherInfo,
  getPageTeacherInfo,
  getTeachersByConditions,
  insertTeacherInfo,
  removeTeacherList
};
