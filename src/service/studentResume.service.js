import { saveStudentResume, downloadStudentResume, getAllResumeInfo } from '@/repository/studentResume.repository';

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

export {
  saveResumeInfo,
  downloadResumePdf,
  getResumeInfo
};
