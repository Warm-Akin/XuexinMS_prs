import { getAllTeacherInfo, getPageTeacherInfo, getTeachersByConditions, insertTeacherInfo, removeTeacherList } from '@/repository/teacher.repository';

  async function getTeacherInfo () {
    const data = await getAllTeacherInfo();
    return data || [];
  }

  async function getTeacherInfoPage (params) {
    const data = await getPageTeacherInfo(params);
    return data || [];
  }

async function findTeachersByConditions (params) {
  const data = await getTeachersByConditions(params);
  return data || [];
}

async function saveTeacherInfo (params) {
  const data = await insertTeacherInfo(params);
  return data || [];
}

async function removeTeachers (params) {
  const data = await removeTeacherList(params);
  return data || [];
}

export {
  getTeacherInfo,
  getTeacherInfoPage,
  findTeachersByConditions,
  saveTeacherInfo,
  removeTeachers
};
