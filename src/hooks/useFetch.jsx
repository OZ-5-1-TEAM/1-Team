// useFetch.jsx
import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';

function useFetch(url, dummyData = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(dummyData); // 초기값으로 더미데이터 설정
  const [isError, setIsError] = useState();

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(url);
      setData(response.data);
    } catch (error) {
      setIsError(error);
      // 에러 발생시 더미데이터 사용
      if (dummyData) {
        setData(dummyData);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const refetch = () => {
    getData();
  };

  return { data, isLoading, isError, refetch };
}

export default useFetch;
