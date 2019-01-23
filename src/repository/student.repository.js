import { get, post } from '@/utils/httpHelper';

async function getAll (params) {
  const url = `/xuexin/student/findAll/${params.currentPage}/${params.pageSize}`;
  const body = await get(url);
  return body.data;
}

async function saveStudent (params) {
  const url = `/xuexin/student/save`;
  const body = await post(url, params);
  return body.data;
}

async function getAllActiveStudents () {
  const url = `/xuexin/student/findAll`;
  const body = await get(url);
  return body.data;
}

async function getActiveStudentsByConditions (params) {
  const url = `/xuexin/student/findByConditions`;
  const body = await post(url, params);
  return body.data;
}

export {
  getAll,
  saveStudent,
  getAllActiveStudents,
  getActiveStudentsByConditions
};
