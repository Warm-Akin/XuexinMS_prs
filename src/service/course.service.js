import { getAllCourseInfo, getPageCourseInfo, getCoursesByConditions, insertCourseInfo, removeCourseList } from '@/repository/course.repository';

  async function initCourseInfo () {
    const data = await getAllCourseInfo();
    return data || [];
  }

  async function getCourseInfoPage (params) {
    const data = await getPageCourseInfo(params);
    return data || [];
  }

async function findCoursesByConditions (params) {
  const data = await getCoursesByConditions(params);
  return data || [];
}

async function saveCourseInfo (params) {
  const data = await insertCourseInfo(params);
  return data || [];
}

async function removeCourses (params) {
  const data = await removeCourseList(params);
  return data || [];
}

export {
  initCourseInfo,
  getCourseInfoPage,
  findCoursesByConditions,
  saveCourseInfo,
  removeCourses
};
