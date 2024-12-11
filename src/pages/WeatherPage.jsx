import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../components/Header';
import api from '../api/axiosInstance';
import Loading from '../components/Loading';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Box = styled.div`
  width: 100%;
  height: 130px;
  background-color: transparent;
  display: block;
`;

const MainPageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100vh;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 63px;
  position: relative;
  animation: ${fadeIn} 0.5s ease;

  @media (max-width: 480px) {
    padding: 10px;
    box-shadow: none;
  }
`;

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: calc(100vh - 200px);
  padding-top: 40px;
  box-sizing: border-box;
  text-align: center;
  user-select: none;
  position: relative;
`;

const WeatherIconContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 100%;
  max-height: 250px;
  background-color: #fffef8;
  border: 2px solid #ffe29f;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  margin-bottom: 20px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
  img {
    width: 70%;
    height: auto;
  }
`;

const WeatherCard = styled.div`
  background-color: #fffdf5;
  border: 2px solid #ffd591;
  border-radius: 15px;
  width: 100%;
  max-width: 320px;
  padding: 25px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  text-align: center;
  margin: 30px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;

const Temperature = styled.h2`
  font-size: 64px;
  font-weight: bold;
  color: #ff9900;
  margin: 0;
`;

const WeatherCondition = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #ff8c00;
  margin: 15px 0;
`;

const WeatherDetails = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #666;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  padding: 5px 10px;
  border-bottom: 1px solid #ddd;
`;

const Recommendation = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #ff7f50;
  background-color: #fffdf5;
  border-radius: 10px;
  padding: 15px;
  border: 2px #ffd591;
  margin: 10px 30px 30px 30px;
  border-style: solid;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;

const FixedImage = styled.img`
  position: absolute;
  bottom: 100px;
  right: 20px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const LoadingMessage = styled.p`
  font-size: 18px;
  color: #666666;
  font-style: italic;
`;

const WEATHER_CODES = {
  1000: { text: '맑음', icon: 'sunny.png' },
  1001: { text: '흐림', icon: 'cloudy.png' },
  1100: { text: '대체로 맑음', icon: 'partly_cloudy.png' },
  2000: { text: '안개', icon: 'fog.png' },
  2100: { text: '옅은 안개', icon: 'light_fog.png' },
  4000: { text: '이슬비', icon: 'drizzle.png' },
  4001: { text: '비', icon: 'rain.png' },
  4200: { text: '강한 비', icon: 'heavy_rain.png' },
};

const WeatherPage = () => {
  const [weather, setWeather] = useState({
    temperature: null,
    condition: '날씨 정보를 가져오는 중입니다...',
    wind: '',
    humidity: '',
    rainProbability: null,
    recommendation: '날씨 정보를 가져오는 중입니다...',
    icon: '/weather/default.png',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateWeatherData = (data) => {
    const weatherCode = WEATHER_CODES[data.weather_code] || {
      text: '알 수 없음',
      icon: 'default.png',
    };

    let recommendation = '';
    if (data.precipitation_probability > 70 || data.weather_code === 4200) {
      recommendation = '폭우가 내리고 있어 산책하기 적합하지 않은 날씨입니다.';
    } else if (data.weather_code === 4001) {
      recommendation = '비가 와서 산책을 피하는 것이 좋습니다.';
    } else if (data.temperature < 0) {
      recommendation = '기온이 매우 낮아 산책하기 적합하지 않습니다.';
    } else if (data.temperature > 35) {
      recommendation =
        '너무 더운 날씨입니다. 산책 시 충분히 수분을 섭취하세요.';
    } else {
      const recommendations = {
        1000: '맑고 따뜻한 날씨입니다. 산책하기 좋습니다.',
        1001: '흐린 날씨이지만 산책하기 무리는 없습니다.',
        1100: '약간의 구름이 있지만 산책하기 좋은 날씨입니다.',
        2000: '안개가 있으니 산책 시 주의하세요.',
        2100: '옅은 안개가 있으니 산책 시 주의하세요.',
        4000: '가벼운 이슬비가 내립니다. 우산을 챙기세요.',
      };
      recommendation =
        recommendations[data.weather_code] ||
        '날씨 정보를 기준으로 산책 여부를 판단하세요.';
    }

    setWeather({
      temperature: data.temperature,
      condition: weatherCode.text,
      wind: `${data.wind_speed} m/s`,
      humidity: `${data.humidity}%`,
      rainProbability: data.precipitation_probability,
      recommendation,
      icon: `/weather/${weatherCode.icon}`,
    });
  };

  const fetchWeatherData = async () => {
    try {
      setIsLoading(true);

      // GET 요청에 Authorization 헤더 추가
      const response = await api.get('/v1/weathers/current/');
      updateWeatherData(response.data);
    } catch (error) {
      console.error('날씨 정보를 가져오는데 실패했습니다:', error);

      if (error.response?.status === 401) {
        setError('인증 정보가 유효하지 않습니다. 다시 로그인해주세요.');
      } else {
        setError(
          error.response?.data?.error || '날씨 정보를 불러오는데 실패했습니다.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 60 * 60 * 1000); // 1시간 간격으로 데이터 갱신
    return () => clearInterval(interval);
  }, []);

  return (
    <MainPageWrapper>
      <Box />
      <Header title='WEATHER ☀️' />
      <ContentSection>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <LoadingMessage>{error}</LoadingMessage>
        ) : (
          <>
            <WeatherIconContainer>
              <img src={weather.icon} alt={weather.condition} />
            </WeatherIconContainer>
            <WeatherCard>
              <Temperature>{weather.temperature}°C</Temperature>
              <WeatherCondition>{weather.condition}</WeatherCondition>
              <WeatherDetails>
                <DetailItem>
                  <span>Wind:</span>
                  <span>{weather.wind}</span>
                </DetailItem>
                <DetailItem>
                  <span>Humidity:</span>
                  <span>{weather.humidity}</span>
                </DetailItem>
                <DetailItem>
                  <span>Rain Probability:</span>
                  <span>{weather.rainProbability}%</span>
                </DetailItem>
              </WeatherDetails>
            </WeatherCard>
            <Recommendation>{weather.recommendation}</Recommendation>
          </>
        )}
      </ContentSection>
      <FixedImage src='/favicon.ico' />
    </MainPageWrapper>
  );
};

export default WeatherPage;
