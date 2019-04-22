import { get, post } from '@/utils/httpHelper';

async function saveStudentResume (params) {
  const url = `/xuexin/security/student/resume/save`;
  const body = await post(url, params);
  return body.data;
}

async function downloadStudentResume (params) {
  const url = `/xuexin/security/student/resume/export/${params}`;
  const body = await get(url);
  return body.data;
}

async function getAllResumeInfo (params) {
  const url = `/xuexin/security/company/resume/findAll/${params.currentPage}/${params.pageSize}`;
  const body = await get(url);
  return body.data;
}

async function getAllResumeInfoByAdmin (params) {
  const url = `/xuexin/security/admin/resume/findAll/${params.currentPage}/${params.pageSize}`;
  const body = await get(url);
  return body.data;
}

async function removeResumeInfo (params) {
  const url = `/xuexin/security/admin/resume/delete`;
  const body = await post(url, params);
  return body.data;
}

async function findResumeListByConditions (params) {
  const url = `/xuexin/admin/resume/findByConditions`;
  const body = await post(url, params);
  return body.data;
}

export {
  saveStudentResume,
  downloadStudentResume,
  getAllResumeInfo,
  removeResumeInfo,
  findResumeListByConditions,
  getAllResumeInfoByAdmin
};
