import axios from 'axios';
import router from '@/router'
import Cookies from "js-cookie";
import { Message } from 'element-ui'

axios.defaults.withCredentials = true;
axios.defaults.retry = 2; // maximun time
axios.defaults.retryDelay = 1000; // (ms)

// add request interceptors
axios.interceptors.request.use(config => {

  let jwtToken = Cookies.get('JWT-TOKEN');
  if (jwtToken) {
    config.headers.common['Authentication-Token'] = jwtToken
  }
  return config;
}, error => {
  console.log('error')
  // console.log(error)
  // handle request error
  return Promise.reject(error);
});

// http response interceptor
axios.interceptors.response.use(
  response => {
    checkCode(response);
    // NProgress.done();
    return response;
  },
  error => {
    checkStatus(error);
    return Promise.reject(error);
  });

/**
* handing http network status(network error)
*/
function checkStatus (error) {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 未认证
        // if (error.response.data.msg === 'token Expired') {
        if (error.response.data.msg === 'token Expired') {
          router.push({name: 'Login'});
          Message.error('登录已过期，请重新登录')
          location.reload();
        } else if (error.data.msg !== '') {
          router.push({name: 'Login'});
          Message.error(error.response.data.msg);
        } else {
          router.push({name: 'Login'});
        }
          /*
          *
          // refresh token
          var originalError = error;
          var originalRequest = error.config;
          var newConfig = JSON.parse(JSON.stringify(originalRequest))
          refresh(newConfig);
          location.reload();

          //   .then(response => {
          //   console.log("refresh response", response)
          //   originalError.config.headers['Authentication-Token'] = Cookies.get('JWT-TOKEN-HEADER');
          //   axiosRetryInterceptor(originalError).then(function () {
          //     location.reload()
          //   })
          // });
          // refresh(newConfig).then(function (data) {
          //   // re-send request with new token
          //   if (data) {
          //     originalError.config.headers['Authentication-Token'] = Cookies.get('JWT-TOKEN-HEADER');
          //     console.log('refresh', data)
          //     // axiosRetryInterceptor(originalError).then(function () {
          //     //   location.reload()
          //     // })
          //   }
          // });
        } else {
          router.push({name: 'Login'});
          this.$message.error(error.response.data.msg)
        }
        */
        break;
      case 403:
        // 无权限禁止访问
        router.push({name: 'page404'});
        break;
      case 404:
        // 无资源匹配
        router.push({name: 'page404'});
        break;
      default: // HANDLE OTHER ERROR
        router.push('/error');
        break;
    }

  }
}
//
/**
* handing service code (custom/service exception)
*/
function checkCode (response) {
  if (response.data.code === 'ERROR') {
    // Handing service exception
    console.log('error', response.data)
    router.push({ name: 'Error', params: { errorMsg: response.data.msg }})
    // router.push('/error');
  } else if (response.data.code === 'REFRESH') {
    Cookies.set('JWT-TOKEN-HEADER', 'Bearer ' + response.data.data['rawToken'])
  }
  return response;
}

// function axiosRetryInterceptor (error) {
//   var config = error.config;
//   if (!config || !config.retry) return;
//   config.__retryCount = config.__retryCount || 0;
//   if (config.__retryCount >= config.retry) {
//     // Reject with the error
//     return Promise.reject(error);
//   }
//   config.__retryCount += 1;
//   // Create new promise to handle exponential backoff
//   var backoff = new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve();
//     }, config.retryDelay || 1);
//   });
//   // Return the promise in which recalls axios to retry the request
//   return backoff.then(function () {
//     return axios.request(config);
//   });
// }
//
// request new token using refresh token
// function refresh (config) {
//   // let refreshToken = Cookies.get('JWT-TOKEN-REFRESH');
//   let refreshToken = Cookies.get('JWT-REFRESH-TOKEN');
//   config._retry = true;
//   config.url = `/xuexin/refreshToken`;
//   config.headers['Authentication-RefreshToken'] = refreshToken;
//   return axios.interceptors.request.use(config);
//   // return axios.request(config);
// }

function get(url, params) {
  return axios.get(url, {
    params: {
      t: new Date().getTime(),
      ...params
    }
  });
}

function post(url, params) {
  return axios.request({
    url: url,
    method: 'POST',
    data: params
  });
}

export {
  get,
  post
};
