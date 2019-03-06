import { get, post } from '@/utils/httpHelper';

async function saveStudentResume (params) {
  const url = `/xuexin/student/resume/save`;
  const body = await post(url, params);
  return body.data;
}


export {
  saveStudentResume
};
