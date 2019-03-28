import {get, post} from '@/utils/httpHelper';

async function registerCompanyInfo(params) {
  const url = `/xuexin/anonymous/company/register`;
  const body = await post(url, params);
  return body.data;
}

async function getActiveCompanyList(params) {
  const url = `/xuexin/admin/company/findActiveList/${params.currentPage}/${params.pageSize}`;
  const body = await get(url);
  return body.data;
}

export {
  registerCompanyInfo,
  getActiveCompanyList
};
