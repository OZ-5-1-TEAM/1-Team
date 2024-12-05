// src/api/axiosInstance.js
import axios from 'axios';

let isRefreshing = false;
let refreshSubscribers = [];

// 환경 변수에서 읽기
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const REFRESH_TOKEN = import.meta.env.VITE_REFRESH_TOKEN;

const onRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

const api = axios.create({
  baseURL: BASE_URL, // 서버 URL
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

// 요청 인터셉터
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token') || ACCESS_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const storedRefreshToken =
            localStorage.getItem('refresh_token') || REFRESH_TOKEN;
          const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
            refresh_token: storedRefreshToken,
          });
          localStorage.setItem('access_token', data.access);
          isRefreshing = false;
          onRefreshed(data.access);
        } catch (err) {
          isRefreshing = false;
          localStorage.clear(); // 인증 실패 시 토큰 제거
          window.location.href = '/login';
          return Promise.reject(err);
        }
      }
      return new Promise((resolve) => {
        addRefreshSubscriber((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });
    }
    return Promise.reject(error);
  }
);
export default api;

// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3001/api/v1', // Express 서버 URL
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem('access_token')}`, // 초기 토큰 설정
//   },
// });

// // 요청 인터셉터
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('access_token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // 응답 인터셉터
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response && error.response.status === 401) {
//       console.log('토큰 만료 처리 로직은 현재 비활성화 상태입니다.');
//       return Promise.reject(error);
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
