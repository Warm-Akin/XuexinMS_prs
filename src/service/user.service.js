import { checkLogin } from '@/repository/user.repository';

async function checkLoginService (params) {
  const data = await checkLogin(params);
  return data || [];
}

export {
  checkLoginService
};
