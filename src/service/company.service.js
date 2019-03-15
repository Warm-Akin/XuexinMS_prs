import { registerCompanyInfo } from '@/repository/company.repository';

async function registerCompany (params) {
  const data = await registerCompanyInfo(params);
  return data || [];
}

export {
  registerCompany
};
