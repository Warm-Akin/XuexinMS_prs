import { post, get } from '@/utils/httpHelper';
import Cookies from "js-cookie";

async function checkLogin (params) {
  const url = `/xuexin/login`;
  const body = await post(url, params);
  debugger;
  return body.data;
}

async function updateAdminPassword (params) {
  const url = `/xuexin/security/admin/user/updatePassword`;
  const body = await post(url, params);
  return body.data;
}

async function login2 (params) {
  let result = {};
  await post(`/xuexin/login`, params).then(function (data) {
    if (data) {
      result = data;
      console.log('data', data)
      // save token info in cookie
      let token = result.data.data.accessToken['rawToken'];
      let refreshToken = result.data.data.refreshToken['rawToken'];
      let userName = result.data.data.accessToken['claims']['sub'];
      let userRole = result.data.data.accessToken['claims']['scopes'][0];
      Cookies.set("JWT-TOKEN", 'Bearer ' + token);
      Cookies.set("JWT-REFRESH-TOKEN", 'Bearer ' + refreshToken);
      Cookies.set("USER_NAME", userName);
      Cookies.set("USER_ROLE", userRole);
    }
  }).catch(error => {
    console.log('error', error);
  })
  return result;
}

async function getUserListPage (params) {
  const url = `/xuexin/security/admin/user/findActiveUserList/${params.currentPage}/${params.pageSize}`;
  const body = await get(url);
  return body.data;
}

async function callSaveUserInfo (params, organizationName) {
  const url = `/xuexin/security/admin/user/save/${organizationName}`;
  const body = await post(url, params);
  return body.data;
}

export {
  checkLogin,
  login2,
  updateAdminPassword,
  getUserListPage,
  callSaveUserInfo
};
