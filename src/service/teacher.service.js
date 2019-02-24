import { getAllTeacherInfo, getPageTeacherInfo, getTeachersByConditions, insertTeacherInfo } from '@/repository/teacher.repository';

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

export {
  getTeacherInfo,
  getTeacherInfoPage,
  findTeachersByConditions,
  saveTeacherInfo
};
