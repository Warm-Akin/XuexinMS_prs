import { get, post } from '@/utils/httpHelper';

async function getAll (params) {
  const url = `/xuexin/admin/student/findAll/${params.currentPage}/${params.pageSize}`;
  const body = await get(url);
  return body.data;
}

async function saveStudent (params) {
  const url = `/xuexin/admin/student/save`;
  const body = await post(url, params);
  return body.data;
}

async function getAllActiveStudents () {
  const url = `/xuexin/admin/student/findAll`;
  const body = await get(url);
  return body.data;
}

async function getActiveStudentsByConditions (params) {
  const url = `/xuexin/admin/student/findByConditions`;
  const body = await post(url, params);
  return body.data;
}

async function getStudentByStuNo (params) {
  const url = `/xuexin/student/findByStudentNo/${params}`;
  const body = await get(url);
  return body.data;
}

async function updateStudentInfo (params) {
  const url = `/xuexin/student/update`;
  const body = await post(url, params);
  return body.data;
}

async function getResumeByStuNo (params) {
  const url = `/xuexin/student/resume/findResumeByStudentNo/${params}`;
  const body = await get(url);
  return body.data;
}

export {
  getAll,
  saveStudent,
  getAllActiveStudents,
  getActiveStudentsByConditions,
  getStudentByStuNo,
  updateStudentInfo,
  getResumeByStuNo
};
