import {get, post} from '@/utils/httpHelper';

async function registerCompanyInfo(params) {
  const url = `/xuexin/company/register`;
  const body = await post(url, params);
  return body.data;
}

export {
  registerCompanyInfo
};
