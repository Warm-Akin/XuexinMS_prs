import { get, post } from '@/utils/httpHelper';

async function getAll (params) {
  const url = `/xuexin/security/admin/student/findAll/${params.currentPage}/${params.pageSize}`;
  const body = await get(url);
  return body.data;
}

async function saveStudent (params) {
  const url = `/xuexin/security/admin/student/save`;
  const body = await post(url, params);
  return body.data;
}

async function getAllActiveStudents () {
  const url = `/xuexin/security/admin/student/findAll`;
  const body = await get(url);
  return body.data;
}

async function getActiveStudentsByConditions (params) {
  const url = `/xuexin/security/admin/student/findByConditions`;
  const body = await post(url, params);
  return body.data;
}

async function getStudentByStuNo (params) {
  const url = `/xuexin/security/student/findByStudentNo/${params}`;
  const body = await get(url);
  return body.data;
}

async function updateStudentInfo (params) {
  const url = `/xuexin/security/student/update`;
  const body = await post(url, params);
  return body.data;
}

async function getResumeByStuNo (params) {
  const url = `/xuexin/security/student/resume/findResumeByStudentNo/${params}`;
  const body = await get(url);
  return body.data;
}

async function updateStudentPassword (params) {
  const url = `/xuexin/security/student/updatePassword`;
  const body = await post(url, params);
  return body.data;
}

export {
  getAll,
  saveStudent,
  getAllActiveStudents,
  getActiveStudentsByConditions,
  getStudentByStuNo,
  updateStudentInfo,
  getResumeByStuNo,
  updateStudentPassword
};
