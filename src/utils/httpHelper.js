import axios from 'axios';
import router from '@/router'
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;
axios.defaults.retry = 2; // maximun time
axios.defaults.retryDelay = 1000; // (ms)
// axios.defaults.baseURL = process.env.API_BASEURL;

// add request interceptors
axios.interceptors.request.use(config => {
  // NProgress.start() // progress bar start
  // Unified processing of request header information (header..)
  let jwtToken = Cookies.get('JWT-TOKEN');
  if (jwtToken) {
    config.headers.common['Authentication-Token'] = jwtToken
  }
  return config;
}, error => {
  console.log('error')
  console.log(error)
  // handle request error
  return Promise.reject(error);
});

// // http response interceptor
// axios.interceptors.response.use(
//   response => {
//     checkCode(response);
//     // NProgress.done();
//     return response;
//   },
//   error => {
//     checkStatus(error);
//     // NProgress.done();
//     return Promise.reject(error);
//   });
// //
// /**
// * handing http network status(network error)
// */
// function checkStatus (error) {
//   if (error.response) {
//     switch (error.response.status) {
//       case 401:
//         if (error.response.data.errorMessage === 'tokenExpired') {
//           // refresh token
//           var originalError = error;
//           var originalRequest = error.config;
//           var newConfig = JSON.parse(JSON.stringify(originalRequest))
//           refresh(newConfig).then(function (data) {
//             // re-send request with new token
//             if (data) {
//               originalError.config.headers['Authentication-Token'] = CookiesHelper.get('JWT-TOKEN-HEADER');
//               axiosRetryInterceptor(originalError).then(function () {
//                 location.reload()
//               })
//             }
//           });
//         } else {
//           router.push({name: 'Login'});
//           this.$message.error(error.response.data.errorMessage)
//         }
//         break;
//       case 403:
//         router.push({name: 'page404'});
//         break;
//       case 404:
//         router.push({name: 'page404'});
//         break;
//       // case 408:
//       //   axiosRetryInterceptor(error); // request timeout
//       //   break;
//       default: // HANDLE OTHER ERROR
//         router.push('/error');
//         break;
//     }
//     // return Promise.reject(error.response.data)
//   }
// }
//
// /**
// * handing service code (custom/service exception)
// */
// function checkCode (response) {
//   if (response.data.code === 'ERROR') {
//     // Handing service exception
//     router.push('/error');
//   } else if (response.data.code === 'REFRESH') {
//     Cookies.set('JWT-TOKEN-HEADER', 'Bearer ' + response.data.data['rawToken'])
//   }
//   return response;
// }
//
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
// // request new token using refresh token
// function refresh (config) {
//   let refreshToken = Cookies.get('JWT-TOKEN-REFRESH');
//   config._retry = true
//   config.url = `/refreshToken`
//   config.headers['Authentication-RefreshToken'] = refreshToken
//   return axios.request(config);
// }

/**
 * export get/post/put for http request
 */
// module.exports = {
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

//
//   deleteMethod (url, params) {
//     return axios({
//       url: url,
//       method: 'delete',
//       data: params
//     });
//   },
//
//   put (url, params) {
//     return axios({
//       url: url,
//       method: 'PUT',
//       data: params
//     });
//   }
// };

export {
  get,
  post
};
