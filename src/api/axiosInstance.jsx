// src/api/axiosInstance.js
import axios from 'axios';

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // 서버 URL
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`, // 초기 토큰 설정
  },
});

// 요청 인터셉터
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
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
          const refreshToken = localStorage.getItem('refresh_token');
          const { data } = await axios.post(
            'http://localhost:3000/api/v1/auth/refresh', // Refresh 엔드포인트
            { refresh_token: refreshToken }
          );
          localStorage.setItem('access_token', data.access_token);
          isRefreshing = false;
          onRefreshed(data.access_token);
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
