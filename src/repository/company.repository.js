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

async function updateInfoAfterPayment(param) {
  const url = `/xuexin/security/company/updateLimitation`;
  const body = await post(url, param);
  return body.data;
}

async function getCompanyInfoBySoleNo(param) {
  const url = `/xuexin/security/company/findBySoleCode/${param}`;
  const body = await get(url);
  return body.data;
}

async function updateCompanySelfInfo(param) {
  const url = `/xuexin/security/company/updateInformation`;
  const body = await post(url, param);
  return body.data;
}

async function updateCompanyPwdInfo(param) {
  const url = `/xuexin/security/company/updatePassword`;
  const body = await post(url, param);
  return body.data;
}

async function checkCompanyUserRole(param) {
  const url = `/xuexin/security/company/checkRole/${param}`;
  const body = await get(url);
  return body.data;
}


export {
  registerCompanyInfo,
  getActiveCompanyList,
  saveCompanyDetail,
  searchCompanyList,
  deleteRecords,
  paymentAPI,
  updateInfoAfterPayment,
  getCompanyInfoBySoleNo,
  updateCompanySelfInfo,
  updateCompanyPwdInfo,
  checkCompanyUserRole
};
