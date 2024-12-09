import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// // 로컬 스토리지 초기화 코드
// localStorage.setItem('access_token', import.meta.env.VITE_ACCESS_TOKEN);
// localStorage.setItem('refresh_token', import.meta.env.VITE_REFRESH_TOKEN);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
