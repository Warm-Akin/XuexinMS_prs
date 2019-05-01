import { checkLogin, login2, updateAdminPassword, getUserListPage, callSaveUserInfo } from '@/repository/user.repository';

async function checkLoginService (params) {
  // const data = await checkLogin(params);
  const data = await login2(params);
  return data || [];
}

async function updateAdminPwd (params) {
  const data = await updateAdminPassword(params);
  return data || [];
}

async function getUserInfoPage (params) {
  const data = await getUserListPage(params);
  return data || [];
}

async function saveUserInfo (param, organizationName) {
  const data = await callSaveUserInfo(param, organizationName);
  return data || [];
}

export {
  checkLoginService,
  updateAdminPwd,
  getUserInfoPage,
  saveUserInfo
};
