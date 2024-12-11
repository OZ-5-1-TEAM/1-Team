import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';

function useFetch(url, dummyData) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(dummyData);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(url);
      setData(response.data);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      console.error('API 요청 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!url) {
      setData(dummyData);
      setIsLoading(false);
      return;
    }

    if (dummyData && data === null) {
      setData(dummyData);
      setIsLoading(false);
      return;
    }

    fetchData();
  }, [url]);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, isError, refetch };
}

export default useFetch;
