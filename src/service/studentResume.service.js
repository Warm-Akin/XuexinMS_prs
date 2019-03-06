import { saveStudentResume } from '@/repository/studentResume.repository';

async function saveResumeInfo (params) {
  const data = await saveStudentResume(params);
  return data || [];
}

export {
  saveResumeInfo
};
