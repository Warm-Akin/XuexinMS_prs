import { post } from '@/utils/httpHelper';

async function checkLogin (params) {
  const url = `/xuexin/user/login`;
  const body = await post(url, params);
  debugger;
  return body.data;
}

async function login2 (params) {
  let result = {};
  await post(`/xuexin/user/login`, params).then(function (data) {
    if (data) {
      result = data;
      console.log('data', data)
      // save token info in cookie
    }
  }).catch(error => {
    console.log('error', error);
  })
  return result;
}

export {
  checkLogin,
  login2
};
