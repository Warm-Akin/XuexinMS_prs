import { checkLogin, login2 } from '@/repository/user.repository';

async function checkLoginService (params) {
  // const data = await checkLogin(params);
  const data = await login2(params);
  return data || [];
}

export {
  checkLoginService
};
