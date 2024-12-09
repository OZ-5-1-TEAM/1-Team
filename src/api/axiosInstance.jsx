// src/api/axiosInstance.js
import axios from 'axios';

let isRefreshing = false;
let refreshSubscribers = [];

// 환경 변수에서 읽기
const BASE_URL = `http://43.201.242.157:8000/api`;

const onRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

const api = axios.create({
  baseURL: BASE_URL, // 서버 URL
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
          const storedRefreshToken = localStorage.getItem('refresh_token');
          const { data } = await axios.post(`${BASE_URL}/token/refresh/`, {
            refresh: storedRefreshToken,
          });
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
          isRefreshing = false;
          onRefreshed(data.access);
        } catch (err) {
          isRefreshing = false;
          localStorage.clear(); // 인증 실패 시 토큰 제거
          // window.location.href = '/login';
          return Promise.reject(err);
        }
      }
      return new Promise((resolve) => {
        addRefreshSubscriber((token) => {
          originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
          resolve(axios(originalRequest));
        });
      });
    }
    return Promise.reject(error);
  }
);
export default api;
