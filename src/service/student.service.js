import { getAll, saveStudent, getAllActiveStudents, getActiveStudentsByConditions } from '@/repository/student.repository';

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

async function findStdentsByConditions (params) {
  const data = await getActiveStudentsByConditions(params);
  return data || [];
}

export {
  getStudentList,
  saveStudentInfo,
  findAllActiveStudents,
  findStdentsByConditions
};
