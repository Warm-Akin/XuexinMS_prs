import { registerCompanyInfo, getActiveCompanyList, saveCompanyDetail,
  searchCompanyList, deleteRecords, paymentAPI, updateInfoAfterPayment ,
  getCompanyInfoBySoleNo, updateCompanySelfInfo, updateCompanyPwdInfo,
  checkCompanyUserRole} from '@/repository/company.repository';

async function registerCompany (params) {
  const data = await registerCompanyInfo(params);
  return data || [];
}

async function getActiveCompanyInfo (params) {
  const data = await getActiveCompanyList(params);
  return data || [];
}

async function saveCompanyInfo (params) {
  const data = await saveCompanyDetail(params);
  return data || [];
}

async function findCompanyByConditions (params) {
  const data = await searchCompanyList(params);
  return data || [];
}

async function removeRecords (params) {
  const data = await deleteRecords(params);
  return data || [];
}

async function getPaymentAPI (params) {
  const data = await paymentAPI(params);
  return data || [];
}

async function updateCompanyAfterPayment (params) {
  const data = await updateInfoAfterPayment(params);
  return data || [];
}

async function getCompanyInfo (params) {
  const data = await getCompanyInfoBySoleNo(params);
  return data || [];
}

async function updateCompanyInfo (params) {
  const data = await updateCompanySelfInfo(params);
  return data || [];
}

async function updateCompanyPwd (params) {
  const data = await updateCompanyPwdInfo(params);
  return data || [];
}

async function checkCompanyUser (params) {
  const data = await checkCompanyUserRole(params);
  return data || [];
}

export {
  registerCompany,
  getActiveCompanyInfo,
  saveCompanyInfo,
  findCompanyByConditions,
  removeRecords,
  getPaymentAPI,
  updateCompanyAfterPayment,
  getCompanyInfo,
  updateCompanyInfo,
  updateCompanyPwd,
  checkCompanyUser
};
