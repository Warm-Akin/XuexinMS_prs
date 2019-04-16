import { registerCompanyInfo, getActiveCompanyList, saveCompanyDetail,
  searchCompanyList, deleteRecords, paymentAPI, updateInfoAfterPayment } from '@/repository/company.repository';

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

export {
  registerCompany,
  getActiveCompanyInfo,
  saveCompanyInfo,
  findCompanyByConditions,
  removeRecords,
  getPaymentAPI,
  updateCompanyAfterPayment
};
