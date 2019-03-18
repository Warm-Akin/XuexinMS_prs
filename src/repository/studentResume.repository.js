import { get, post } from '@/utils/httpHelper';

async function saveStudentResume (params) {
  const url = `/xuexin/student/resume/save`;
  const body = await post(url, params);
  return body.data;
}

async function downloadStudentResume (params) {
  const url = `/xuexin/student/resume/export/${params}`;
  const body = await get(url);
  return body.data;
}

async function getAllResumeInfo (params) {
  const url = `/xuexin/company/resume/findAll/${params.currentPage}/${params.pageSize}`;
  const body = await get(url);
  return body.data;
}


export {
  saveStudentResume,
  downloadStudentResume,
  getAllResumeInfo
};
