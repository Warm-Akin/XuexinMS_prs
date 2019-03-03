import { getAll, saveStudent, getAllActiveStudents, getActiveStudentsByConditions, getStudentByStuNo } from '@/repository/student.repository';

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

export {
  getStudentList,
  saveStudentInfo,
  findAllActiveStudents,
  findStudentByConditions,
  getStudentInfo
};
