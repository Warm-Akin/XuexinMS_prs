import { checkLogin, login2, updateAdminPassword } from '@/repository/user.repository';

async function checkLoginService (params) {
  // const data = await checkLogin(params);
  const data = await login2(params);
  return data || [];
}

async function updateAdminPwd (params) {
  const data = await updateAdminPassword(params);
  return data || [];
}


export {
  checkLoginService,
  updateAdminPwd
};
