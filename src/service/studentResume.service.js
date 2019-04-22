import { saveStudentResume, downloadStudentResume, getAllResumeInfo, removeResumeInfo, findResumeListByConditions, getAllResumeInfoByAdmin } from '@/repository/studentResume.repository';

async function saveResumeInfo (params) {
  const data = await saveStudentResume(params);
  return data || [];
}

async function downloadResumePdf (params) {
  const data = await downloadStudentResume(params);
  return data || [];
}

async function getResumeInfo (params) {
  const data = await getAllResumeInfo(params);
  return data || [];
}

async function removeResumeRecords (params) {
  const data = await removeResumeInfo(params);
  return data || [];
}

async function findResumeByConditions (params) {
  const data = await findResumeListByConditions(params);
  return data || [];
}

async function getResumeInfoByAdmin (params) {
  const data = await getAllResumeInfoByAdmin(params);
  return data || [];
}

export {
  saveResumeInfo,
  downloadResumePdf,
  getResumeInfo,
  removeResumeRecords,
  findResumeByConditions,
  getResumeInfoByAdmin
};
