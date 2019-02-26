import { get, post } from '@/utils/httpHelper';

  async function getAllCourseInfo () {
    const url = `/xuexin/admin/course/findAll`;
    const body = await get(url);
    return body.data;
  }

  async function getPageCourseInfo (params) {
    const url = `/xuexin/admin/course/findAll/${params.currentPage}/${params.pageSize}`;
    const body = await get(url);
    return body.data;
  }

async function insertCourseInfo (params) {
  const url = `/xuexin/admin/course/save`;
  const body = await post(url, params);
  return body.data;
}

async function getCoursesByConditions (params) {
  const url = `/xuexin/admin/course/findByConditions`;
  const body = await post(url, params);
  return body.data;
}

export {
  getAllCourseInfo,
  getPageCourseInfo,
  getCoursesByConditions,
  insertCourseInfo
};
