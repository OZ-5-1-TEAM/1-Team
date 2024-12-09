import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';

function useFetch(url, dummyData) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(dummyData);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // URL이 없는 경우 더미 데이터로만 초기화
    if (!url) {
      setData(dummyData);
      setIsLoading(false);
      return;
    }

    // 더미 데이터가 설정되었을 경우 초기 렌더링에서만 사용
    if (dummyData && data === null) {
      setData(dummyData);
      setIsLoading(false);
      return;
    }

    // 실제 API 호출
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setIsError(true);
        console.error('API 요청 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]); // 의존성 배열에서 dummyData를 제거

  return { data, isLoading, isError };
}

export default useFetch;
