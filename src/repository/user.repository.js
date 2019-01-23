import { post } from '@/utils/httpHelper';

async function checkLogin (params) {
  const url = `/xuexin/user/login`;
  const body = await post(url, params);
  return body.data;
}

export {
  checkLogin
};
