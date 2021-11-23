import axios from 'axios';
// import { deviceLanguage } from '../utils/i18n';
// import { showFlashAlert } from '../utils';
import config from '../config';
// import store from '../store';

// import { Navigation } from 'react-native-navigation';
// import { AUTH_LOGOUT, AUTH_REFRESH_SUCCESS, FLASH_ALERT_TYPE_ERROR } from '../constants';

// Import actions.
// import * as authActions from '../actions/authActions';
// import perf from '@react-native-firebase/perf';

// Config axios defaults.
const AxiosInstance = axios.create({
  baseURL: config.baseUrl,
  timeout: 60000,
});


// AxiosInstance.interceptors.request.use(function (config) {
//     const state = store.getState();
//     const newConf = { ...config };

//     newConf.headers.common['Content-Type'] = 'application/json';
//     newConf.headers.common['Accept'] = 'application/json';
    
//     // if (state.auth.token) {
//     //   newConf.headers.common.Authorization = `Bearer ${state.auth.token}`;
//     // }

//     return newConf;
// });

// AxiosInstance.interceptors.response.use(function (response) {
//   // try {
//   //   const { httpMetric } = response.config.metadata;
//   //   httpMetric.setHttpResponseCode(response.status);
//   //   httpMetric.setResponseContentType(response.headers['content-type']);
//   //   await httpMetric.stop();
//   // } 
//   // finally {
//     return response;
//   // }
// // }, 
// // async function (error) {
// //   if (error?.response?.status === 401) {
// //     const state = store.getState();

// //     var data = {
// //       ExpiredToken: state.auth.token,
// //       RefreshToken: state.auth.data.refreshToken,
// //       RequestType: 'Mobile'
// //     }

// //     authActions.refreshTokenOnSessionExpire(data).then((response) => {

// //       if (response) {
// //         store.dispatch({
// //           type: AUTH_REFRESH_SUCCESS,
// //           payload: response.data,
// //         });
// //       } else {
// //         Navigation.popTo(state.navigationTracker.homeScreenCompId);
// //         Navigation.dismissAllModals();
// //         store.dispatch({
// //           type: AUTH_LOGOUT,
// //         });
// //         alert('Session timed out. Please login again to continue!')
// //       }
// //     });
// //   } else if (error?.response?.status === 403) {
// //     // Timeout added to cause slight delay to bring Access Denied banner on top of API failure banner
// //     setTimeout(() => {
// //       showFlashAlert(FLASH_ALERT_TYPE_ERROR, 'Access Denied', "You don't have permission to proceed with this step");
// //     }, 100);
// //   } else if (error?.response?.status === 408 || error?.code === 'ECONNABORTED') {
// //     console.log(`A time happend on url ${error.config.url}`);
// //   }
// //   return Promise.reject(error);
// });

export default AxiosInstance;
