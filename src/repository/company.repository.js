import {get, post} from '@/utils/httpHelper';

async function registerCompanyInfo(params) {
  const url = `/xuexin/anon/company/register`;
  const body = await post(url, params);
  return body.data;
}

async function getActiveCompanyList(params) {
  const url = `/xuexin/security/admin/company/findActiveList/${params.currentPage}/${params.pageSize}`;
  const body = await get(url);
  return body.data;
}

async function saveCompanyDetail(params) {
  const url = `/xuexin/security/admin/company/save`;
  const body = await post(url, params);
  return body.data;
}

async function searchCompanyList(params) {
  const url = `/xuexin/security/admin/company/findByConditions`;
  const body = await post(url, params);
  return body.data;
}

async function deleteRecords(params) {
  const url = `/xuexin/security/admin/company/deleteRecords`;
  const body = await post(url, params);
  return body.data;
}

async function paymentAPI(param) {
  const url = `/xuexin/security/company/alipay/payment`;
  const body = await post(url, param);
  return body.data;
}

export {
  registerCompanyInfo,
  getActiveCompanyList,
  saveCompanyDetail,
  searchCompanyList,
  deleteRecords,
  paymentAPI
};
