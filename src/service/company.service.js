import { registerCompanyInfo, getActiveCompanyList } from '@/repository/company.repository';

async function registerCompany (params) {
  const data = await registerCompanyInfo(params);
  return data || [];
}

async function getActiveCompanyInfo (params) {
  const data = await getActiveCompanyList(params);
  return data || [];
}

export {
  registerCompany,
  getActiveCompanyInfo
};
