import { getAll, saveStudent, getAllActiveStudents, getActiveStudentsByConditions, getStudentByStuNo, updateStudentInfo,
  getResumeByStuNo, updateStudentPassword } from '@/repository/student.repository';

async function getStudentList (params) {
  const data = await getAll(params);
  return data || [];
}

async function saveStudentInfo (params) {
  const data = await saveStudent(params);
  return data || [];
}

async function findAllActiveStudents () {
  const data = await getAllActiveStudents();
  return data || [];
}

async function findStudentByConditions (params) {
  const data = await getActiveStudentsByConditions(params);
  return data || [];
}

async function getStudentInfo (studentNo) {
  const data = await getStudentByStuNo(studentNo);
  return data || [];
}

async function updatePersonalInfo (student) {
  const data = await updateStudentInfo(student);
  return data || [];
}

async function getUserResumeInfo (studentNo) {
  const data = await getResumeByStuNo(studentNo);
  return data || [];
}

async function updateStudentPwd (param) {
  const data = await updateStudentPassword(param);
  return data || [];
}

export {
  getStudentList,
  saveStudentInfo,
  findAllActiveStudents,
  findStudentByConditions,
  getStudentInfo,
  updatePersonalInfo,
  getUserResumeInfo,
  updateStudentPwd
};
